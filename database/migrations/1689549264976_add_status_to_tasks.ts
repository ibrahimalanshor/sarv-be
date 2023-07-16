import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('status', ['todo', 'pending', 'in-progress', 'done']).defaultTo('todo')
    })
  }

  public async down () {
  }
}
