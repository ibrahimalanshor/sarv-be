import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TaskCategory from 'App/Models/TaskCategory'
import User from 'App/Models/User'
import CreateTaskCategoryValidator from 'App/Validators/TaskCategory/CreateTaskCategoryValidator'

export default class TaskCategoriesController {
  public async index(ctx: HttpContextContract) {
    const { page, sort, filter } = ctx.request.qs()
    
    return ctx.response.ok(await TaskCategory.query()
      .withScopes((scopes) => scopes.visibleTo(ctx.auth.user as User))
      .if(filter.name, query => query.whereILike('name', `%${filter.name}%`))
      .orderBy(sort.column, sort.direction)
      .paginate(page.number, page.size))
  }

  public async store(ctx: HttpContextContract) {
    await ctx.request.validate(CreateTaskCategoryValidator)

    const taskCategory = await ctx.auth.user?.related('taskCategories')
      .create(ctx.request.body())

    return ctx.response.created(taskCategory)
  }

  public async show(ctx: HttpContextContract) {
    return ctx.response.ok(await TaskCategory.query()
      .withScopes(scopes => scopes.visibleTo(ctx.auth.user as User))
      .where('id', ctx.params.id)
      .firstOrFail())
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
