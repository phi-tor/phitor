import { DateTime } from 'luxon'
import {BaseModel, afterFind, column} from '@adonisjs/lucid/orm'

import User from "#models/user"

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

  /**
   * not in a column, because it's set after the find query for get or update (cf. Profile.setUsername())
   */
  declare username: string

  serializeExtras() {
    return {
      username: this.username
    }
  }

  @afterFind()
  static async setUsername(profile: Profile) {
    profile.username = (await User.find(profile.userId))!.username
  }
}
