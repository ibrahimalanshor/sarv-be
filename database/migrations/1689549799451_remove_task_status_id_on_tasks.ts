import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('task_status_id')
      table.dropColumn('task_status_id')
    })
  }

  public async down () {
  }
}
