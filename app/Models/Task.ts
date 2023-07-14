import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, scope } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import TaskCategory from './TaskCategory'
import TaskStatus from './TaskStatus'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime()
  public due_date: DateTime

  @column()
  public priority: string

  @column()
  public user_id: number

  @column()
  public task_category_id: number

  @column()
  public task_status_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, { localKey: 'user_id' })
  public user: BelongsTo<typeof User>

  @belongsTo(() => TaskCategory, { localKey: 'id', foreignKey: 'task_category_id' })
  public category: BelongsTo<typeof TaskCategory>

  @belongsTo(() => TaskStatus, { localKey: 'id', foreignKey: 'task_status_id' })
  public status: BelongsTo<typeof TaskStatus>

  public static visibleTo = scope((query, user: User) => {
    query.where('user_id', user.id)
  })

  public static isDue = scope((query, value: boolean) => {
    if (value) {
      query.where('due_date', '<', new Date)
    } else {
      query.where(query => {
        query.where('due_date', '>', new Date).orWhereNotNull('due_date')
      })
    }
  })
}
