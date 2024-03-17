import { DateTime } from 'luxon'
import {BaseModel, afterFind, column, beforeCreate} from '@adonisjs/lucid/orm'

import User from "#models/user"
import Follow from "#models/follow"

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
   * not in columns, because they are set after the find query for get or update (cf. Profile.setExtraData())
   */
  declare username: string

  declare followers: number

  declare following: any[]

  serializeExtras() {
    return {
      username: this.username,
      followers: this.followers,
      following: this.following,
    }
  }

  @beforeCreate()
  static async setFullname(profile: Profile) {
    if(!profile.fullname) {
      profile.fullname = (await User.find(profile.userId))!.username
    }
  }

  @afterFind()
  static async setExtraData(profile: Profile) {
    const user = await User.query().where('id', profile.userId).preload('follows').first()

    profile.username = user!.username
    profile.followers = (await Follow.query().where('followed_id', profile.userId)).length

    profile.following = []
    let _following = user!.follows

    for (let i = 0; i < _following.length; i++) {
      // here we use .query() for avoid that we get the followed users' followed users (avoid recursive)
      profile.following.push(await Profile.query().where('user_id', _following[i].followedId))

      //profile.following[i] = await Profile.findBy('user_id', profile.following[i].followedId)
    }
    profile.following = profile.following[0]
  }
}
