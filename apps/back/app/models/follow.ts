import { DateTime } from 'luxon'
import {BaseModel, column, hasOne} from '@adonisjs/lucid/orm'
import User from "#models/user";
import type {HasOne} from "@adonisjs/lucid/types/relations";

export default class Follow extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  /*
    logic to get followers/followed users for profile
    FOLLOWER profile: list of all users that they follow
    FOLLOWED profile: number of followers (const followers = await Follow.findBy('followed_id, id))
   */

  @column()
  declare followedId: number

  @column()
  declare src: string

  @hasOne(() => User, { serializeAs: 'follower' })
  declare follower: HasOne<typeof User>

  @hasOne(() => User, { serializeAs: 'followed' })
  declare followed: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
