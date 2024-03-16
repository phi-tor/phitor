import type { HttpContext } from '@adonisjs/core/http'
import Document from "#models/document"
import Like from "#models/like"
import {createDocumentValidator, updateDocumentValidator} from "#validators/document_validator"

export default class DocumentsController {
  async create({ auth, request, response }: HttpContext){
    const data = request.all()
    const payload = await createDocumentValidator.validate(data)
    const user = auth.getUserOrFail()

    const newDoc = await Document.create({
      userId: user.id,
      title: payload.title,
      lang: payload.lang ? payload.lang : user.lang, // if user manually changed the lang, use the lang from the request
      description: payload.description,
      tags: payload.tags,
      content: payload.content,
      isPublic: payload.isPublic ? payload.isPublic : false
    })

    return response.json(newDoc)
  }

  async get({ auth, response, params }: HttpContext){
    const user = auth.getUserOrFail()
    const doc = await Document.findOrFail(params['id'])

    if(!doc.isPublic && doc.userId !== user.id) return response.status(401).send({msg: "this document isn't public"})

    return doc
  }

  /**
   * TODO: to optimize
   */
  async getBy({ auth, params }: HttpContext){
    const user = auth.getUserOrFail()
    const docs = await Document
      .query()
      .where(params['key'], params['value'])

    /**
     * for each doc selected, verify if it's public or if it's current user's document, otherwise suppress it from the
     * results
     */
    for (let i = 0; i < docs.length; i++) {
      let doc = docs[i]
      if(!doc.isPublic && doc.userId !== user.id) {
        docs.splice(i)
      }
    }

    return docs
  }

  async update({ auth, params, request, response }: HttpContext){
    const user = auth.getUserOrFail()
    const doc = await Document.findOrFail(params['id'])

    // a user tries to update a doc of another
    if(doc.userId !== user.id) return response.status(401)

    const data = request.all()
    const payload = await updateDocumentValidator.validate(data)

    doc.merge(payload)
    await doc.save()

    return response.json(doc)
  }

  async delete({ auth, params, response }: HttpContext){
    const user = auth.getUserOrFail()
    const doc = await Document.findOrFail(params['id'])

    if(doc.userId !== user.id) return response.status(401)

    await doc.delete()
    return response.status(200)
  }

  async like({ auth, params, response }: HttpContext){
    const user = auth.getUserOrFail()
    const documentToLike = await Document.findOrFail(params['id'])

    if(user.id === documentToLike.userId) return response.status(401).send({msg: "You can't like your documents"})

    const likedByUser = await Like.query().where('user_id', user.id).where('document_id', documentToLike.id)

    if(likedByUser[0] !== undefined) return response.status(401).send({msg: "You liked this document already."})

    const newLike = await Like.create({
      userId: user.id,
      documentId: documentToLike.id
    })
    await newLike.save()

    return response.status(200).send({msg: "Document liked"})
  }

  async deleteLike({ auth, params, response }: HttpContext){
    const user = auth.getUserOrFail()
    const likeToDelete = await Like.query()
      .where('user_id', user.id)
      .where('document_id', params['id'])
      .first()

    if(likeToDelete === undefined) return response.status(404).send({msg: "Like not found"})

    if(user.id !== likeToDelete!.userId) return response.status(401).send({msg: "You can't remove a like of another user."})

    await likeToDelete!.delete()
    return response.status(200).send({msg: "Like removed"})
  }
}
