import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import {BaseModel, column, hasMany, hasOne} from '@adonisjs/lucid/orm'
import type {HasMany, HasOne} from '@adonisjs/lucid/types/relations'

import Document from "#models/document"
import Profile from "#models/profile";

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

  @hasMany(() => Document, { serializeAs: 'documents' })
  declare documents: HasMany<typeof Document>

  @hasOne(() => Profile, { serializeAs: 'profile' })
  declare profileId: HasOne<typeof Profile>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
