import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('parent_id').unsigned().nullable()
      table.foreign('parent_id').references('tasks.id')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, table => {
      table.dropForeign('parent_id')
      table.dropChecks('parent_id')
    })
  }
}
