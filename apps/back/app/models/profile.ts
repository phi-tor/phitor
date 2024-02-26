import { DateTime } from 'luxon'
import {BaseModel, column} from '@adonisjs/lucid/orm'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare fullname: string | null

  @column()
  declare bio: string | null

  @column()
  declare avatarUrl: string | null // temp

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
