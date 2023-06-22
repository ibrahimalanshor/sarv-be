import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TaskCategory from 'App/Models/TaskCategory'
import CreateTaskCategoryValidator from 'App/Validators/TaskCategory/CreateTaskCategoryValidator'

export default class TaskCategoriesController {
  public async index(ctx: HttpContextContract) {
    const { page } = ctx.request.qs()
    
    return ctx.response.ok(await TaskCategory.query().paginate(page, 10))
  }

  public async store(ctx: HttpContextContract) {
    await ctx.request.validate(CreateTaskCategoryValidator)

    const taskCategory = await ctx.auth.user?.related('taskCategories')
      .create(ctx.request.body())

    return ctx.response.created(taskCategory)
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
