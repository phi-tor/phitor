import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

/**
 * There's no controller for handling badges because they can only be given when there's a situation that permits it. If
 * we use a controller, users could try to use this api to give them the badges without do the action.
 *
 * So, we'll create manually the badge in the controllers, using BadgeService.
 */
export default class Badge extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare name: string

  @column()
  declare description: string

  /**
   * The badges are created by the devs, so there's no need to upload new images because they are already on the server.
   * You only must enter the path to the img
   */
  @column()
  declare imgUrl: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
