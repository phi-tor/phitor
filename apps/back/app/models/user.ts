import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import {BaseModel, column, hasMany, hasOne} from '@adonisjs/lucid/orm'
import type {HasMany, HasOne} from '@adonisjs/lucid/types/relations'
import {AccessToken, DbAccessTokensProvider} from "@adonisjs/auth/access_tokens"

import Document from "#models/document"
import Profile from "#models/profile"
import Badge from "#models/badge"
import Like from "#models/like"
import Follow from "#models/follow"

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username', 'email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare lang: string

  declare currentAccessToken?: AccessToken

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '10 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })

  @hasMany(() => Document, { serializeAs: 'documents' })
  declare documents: HasMany<typeof Document>

  @hasMany(() => Badge, { serializeAs: 'badges' })
  declare badges: HasMany<typeof Badge>

  @hasOne(() => Profile, { serializeAs: 'profile' })
  declare profile: HasOne<typeof Profile>

  @hasMany(() => Like, { serializeAs: 'likes' })
  declare likes: HasMany<typeof Like>

  @hasMany(() => Follow, { serializeAs: 'follows' })
  declare follows: HasMany<typeof Follow>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
