import type { HttpContext } from '@adonisjs/core/http'
import Document from "#models/document"
import Like from "#models/like"
import {createDocumentValidator, updateDocumentValidator} from "#validators/document_validator"
import DocumentPolicy from "#policies/document_policy"
import LikePolicy from "#policies/like_policy"

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

  async get({ bouncer, response, params }: HttpContext){
    const doc = await Document.findOrFail(params['id'])

    // raise 404 error if document is private and the user is not the author of it
    if(await bouncer.with(DocumentPolicy).denies('read', doc)) {
      return response.notFound({msg: "document not found"})
    }

    return doc
  }

  /**
   * TODO: to optimize
   */
  async getBy({ bouncer, params }: HttpContext){
    const docs = await Document
      .query()
      .where(params['key'], params['value'])

    /**
     * for each doc selected, verify if it's public or if it's current user's document, otherwise suppress it from the
     * results
     */
    for (let i = 0; i < docs.length; i++) {
      let doc = docs[i]
      if(await bouncer.with(DocumentPolicy).denies('read', doc)) {
        docs.splice(i)
      }
    }

    return docs
  }

  async update({ bouncer, params, request, response }: HttpContext){
    const doc = await Document.findOrFail(params['id'])

    // a user tries to update a doc of another
    if(await bouncer.with(DocumentPolicy).denies('update', doc)) {
      return response.forbidden({msg: "You can't update another user's documents"})
    }

    const data = request.all()
    const payload = await updateDocumentValidator.validate(data)

    doc.merge(payload)
    await doc.save()

    return response.json(doc)
  }

  async delete({ bouncer, params, response }: HttpContext){
    const doc = await Document.findOrFail(params['id'])

    if(await bouncer.with(DocumentPolicy).denies('delete', doc)) {
      return response.forbidden({msg: "You can't delete another user's documents"})
    }

    await doc.delete()
    return response.status(200)
  }

  async like({ auth, bouncer, params, response }: HttpContext){
    const user = auth.getUserOrFail()
    const documentToLike = await Document.findOrFail(params['id'])
    const likedByUser = await Like.query().where('user_id', user.id).where('document_id', documentToLike.id).first()

    if(await bouncer.with(LikePolicy).denies('create', documentToLike, likedByUser !== undefined)) {
      return response.forbidden({msg: "You can't like your own documents OR You liked this document already."})
    }

    const newLike = await Like.create({
      userId: user.id,
      documentId: documentToLike.id
    })
    await newLike.save()

    return response.status(200).send({msg: "Document liked"})
  }

  async deleteLike({ auth, bouncer, params, response }: HttpContext){
    const user = auth.getUserOrFail()
    const likeToDelete = await Like.query()
      .where('user_id', user.id)
      .where('document_id', params['id'])
      .first()

    if(likeToDelete === undefined) return response.status(404).send({msg: "Like not found"})

    if(await bouncer.with(LikePolicy).denies('delete', likeToDelete!)) {
      return response.forbidden({msg: "You can't remove a like of another user."})
    }

    await likeToDelete!.delete()
    return response.status(200).send({msg: "Like removed"})
  }
}
