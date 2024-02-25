import type { HttpContext } from '@adonisjs/core/http'
import Document from "#models/document";
import {createDocumentValidator, updateDocumentValidator} from "#validators/document_validator";

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
      content: payload.content
    })

    return response.json(newDoc)
  }

  async get({ params }: HttpContext){
    const id = params['id']
    return await Document.findOrFail(id)
  }

  async getBy({ params }: HttpContext){
    return await Document
      .query()
      .where(params['key'], params['value']);
  }

  async update({ auth, params, request, response }: HttpContext){
    const user = auth.getUserOrFail()
    const doc = await Document.findOrFail(params['id'])

    // a user tries to update a doc of another
    if(doc.userId !== user.id) return response.status(403)

    const data = request.all()
    const payload = await updateDocumentValidator.validate(data)

    // find a way to summarize this
    doc.title = payload.title ? payload.title : doc.title
    doc.lang = payload.lang ? payload.lang : doc.lang
    doc.description = payload.description ? payload.description : doc.description
    doc.tags = payload.tags ? payload.tags : doc.tags
    doc.content = payload.content ? payload.content : doc.content

    await doc.save()

    return response.json(doc)
  }

  async delete({ params, response }: HttpContext){
    const doc = await Document.findOrFail(params['id'])
    await doc.delete()
    return response.status(200)
  }
}
