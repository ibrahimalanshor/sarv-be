import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, beforeCreate, scope } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { getNow, plusDate } from 'App/Utils/date.util'

export default class ResetPassword extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public token: string

  @column()
  public user_id: number

  @column.dateTime()
  public expiresAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, { localKey: 'id', foreignKey: 'user_id' })
  public user: BelongsTo<typeof User>

  @beforeCreate()
  public static async addExpiresDate (resetPassword: ResetPassword) {
    if (!resetPassword.expiresAt) {
      resetPassword.expiresAt = plusDate(getNow(), { unit: 'hour', value: 5 })
    }
  }

  public static isExpired = scope((query, value: boolean) => {
    if (value) {
      query.where('expires_at', '<=', getNow().toSQL() as string)
    } else {
      query.where('expires_at', '>=', getNow().toSQL() as string)
    }
  })
}
