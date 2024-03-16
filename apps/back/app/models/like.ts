import { DateTime } from 'luxon'
import {BaseModel, column, hasOne} from '@adonisjs/lucid/orm'
import type {HasOne} from "@adonisjs/lucid/types/relations"
import User from "#models/user"
import Document from "#models/document"

export default class Like extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare documentId: number

  @hasOne(() => User, { serializeAs: 'user' })
  declare user: HasOne<typeof User>

  @hasOne(() => Document, { serializeAs: 'document' })
  declare Document: HasOne<typeof Document>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
