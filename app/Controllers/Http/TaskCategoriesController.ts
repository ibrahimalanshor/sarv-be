import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TaskCategory from 'App/Models/TaskCategory'

export default class TaskCategoriesController {
  public async index(ctx: HttpContextContract) {
    const { page } = ctx.request.qs()
    
    return ctx.response.ok(await TaskCategory.query().paginate(page, 10))
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
