import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, scope } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class TaskStatus extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public color: string

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, { localKey: 'user_id' })
  public user: BelongsTo<typeof User>

  public static visibleTo = scope((query, user: User) => {
    query.where('user_id', user.id)
  })
}
