import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'follows'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')

      table
        .integer('followed_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')

      /**
       * Contains the source of the follow, it could be 'profile' or 'document.{documentId}'. It will be only be
       * accessed by the followed user to know which of their content is loved.
       */
      table
        .string('src')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
