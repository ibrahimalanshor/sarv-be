import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, afterCreate, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import TaskCategory from './TaskCategory'
import TaskStatus from './TaskStatus'

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => TaskCategory, { foreignKey: 'user_id' })
  public taskCategories: HasMany<typeof TaskCategory>

  @hasMany(() => TaskStatus, { foreignKey: 'user_id' })
  public taskStatus: HasMany<typeof TaskStatus>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @afterCreate()
  public static async createTaskStatus (user: User) {
    await user.related('taskStatus').createMany([
      { name: 'Todo', color: 'light' },
      { name: 'In Progress', color: 'primary' },
      { name: 'Done', color: 'success' }
    ])
  }
}
