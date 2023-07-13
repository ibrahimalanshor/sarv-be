import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description').nullable()
      table.timestamp('due_date').nullable()
      table.enum('priority', ['low', 'medium', 'high']).nullable()
      table.integer('task_category_id').nullable().unsigned().references('task_categories.id').onDelete('CASCADE')
      table.integer('task_status_id').nullable().unsigned().references('task_statuses.id').onDelete('CASCADE')
      table.integer('user_id').notNullable().unsigned().references('users.id').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
