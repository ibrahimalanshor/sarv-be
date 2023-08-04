import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'task_statuses'

  public async up () {
    this.schema.dropTable(this.tableName)
  }

  public async down () {
  }
}
