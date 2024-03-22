import { DateTime } from 'luxon'
import {afterFind, afterPaginate, BaseModel, column} from '@adonisjs/lucid/orm'
import Like from "#models/like"
import type {SimplePaginatorContract} from "@adonisjs/lucid/types/querybuilder"

export default class Document extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare title: string

  @column()
  declare lang: string

  @column()
  declare description: string | null

  @column()
  declare tags: string | null

  @column()
  declare content: string

  @column()
  declare isPublic: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  declare likes: Like[]

  serializeExtras(){
    return {
      likes: this.likes
    }
  }

  @afterFind()
  static async setLikes(document: Document) {
    document.likes = await Like.query().where('documentId', document.id)
  }

  @afterPaginate()
  static async afterPaginateHook(documents: SimplePaginatorContract<Document>){
    for(let document of documents) {
      await Document.setLikes(document)
    }
  }
}
