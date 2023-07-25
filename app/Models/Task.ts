import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, computed, hasMany, scope } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import TaskCategory from './TaskCategory'
import { endOfDate } from 'App/Utils/date.util'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public due_date: string

  @column()
  public priority: string

  @column()
  public status: string

  @column()
  public user_id: number

  @column()
  public task_category_id: number

  @column()
  public parent_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @computed()
  public get is_parent() {
    return this.parent_id === null
  }

  @belongsTo(() => User, { localKey: 'user_id' })
  public user: BelongsTo<typeof User>

  @belongsTo(() => TaskCategory, { localKey: 'id', foreignKey: 'task_category_id' })
  public category: BelongsTo<typeof TaskCategory>

  @belongsTo(() => Task, { localKey: 'id', foreignKey: 'parent_id' })
  public parent: BelongsTo<typeof Task>

  @hasMany(() => Task, { localKey: 'id', foreignKey: 'parent_id' })
  public children: HasMany<typeof Task>

  public static visibleTo = scope((query, user: User) => {
    query.where('user_id', user.id)
  })

  public static isDue = scope((query, value: boolean) => {
    if (value) {
      query.where('due_date', '<=', endOfDate(new Date().toISOString()).toString())
    } else {
      query.where(query => {
        query.where('due_date', '>=', endOfDate(new Date().toISOString()).toString()).orWhereNotNull('due_date')
      })
    }
  })

  public static isActive = scope((query, value: boolean) => {
    if (value) {
      query.whereNotIn('status', ['pending', 'done'])
    } else {
      query.whereIn('status', ['pending', 'done'])
    }
  })

  public static is_parent = scope((query, value: boolean) => {
    if (value) {
      query.whereNull('parent_id')
    } else {
      query.whereNotNull('parent_id')
    }
  })
}
