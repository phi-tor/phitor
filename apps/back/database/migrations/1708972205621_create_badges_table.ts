import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'badges'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')


      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')

      table.string('name')
      table.string('description')
      table.string('img_url')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
