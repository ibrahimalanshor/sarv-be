import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, scope, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Task from './Task'

export default class TaskCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, { localKey: 'user_id' })
  public user: BelongsTo<typeof User>

  @hasMany(() => Task, { foreignKey: 'task_category_id', localKey: 'id' })
  public taskCategories: HasMany<typeof Task>

  public static visibleTo = scope((query, user: User) => {
    query.where('user_id', user.id)
  })
}
