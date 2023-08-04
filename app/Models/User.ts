import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany, computed, scope, beforeUpdate, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import Event from '@ioc:Adonis/Core/Event'
import TaskCategory from './TaskCategory'
import Config from '@ioc:Adonis/Core/Config'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column()
  public photo_src: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public verifiedAt: DateTime | null

  @hasMany(() => TaskCategory, { foreignKey: 'user_id' })
  public taskCategories: HasMany<typeof TaskCategory>

  @computed()
  public get is_verified() {
    return this.verifiedAt !== null
  }

  @computed()
  public get photo_url() {
    return `${Config.get('app.appUrl')}${this.photo_src}`
  }

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static async sendVerifyEmailOnCreate (user: User) {
    if (!user.verifiedAt) {
      Event.emit('send-verify-email:user', user)
    }
  }

  @beforeUpdate()
  public static async sendVerifyEmailOnUpdate (user: User) {
    if (user.$dirty.email) {
      user.verifiedAt = null

      Event.emit('send-verify-email:user', user)
    }
  }

  public static isVerified = scope((query, value: boolean) => {
    if (value) {
      query.whereNotNull('verified_at')
    } else {
      query.whereNull('verified_at')
    }
  })
}
