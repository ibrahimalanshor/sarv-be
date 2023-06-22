import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TaskCategory from 'App/Models/TaskCategory'
import User from 'App/Models/User'
import CreateTaskCategoryValidator from 'App/Validators/TaskCategory/CreateTaskCategoryValidator'
import UpdateTaskCategoryValidator from 'App/Validators/TaskCategory/UpdateTaskCategoryValidator'

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
      .where('id', ctx.request.param('id'))
      .firstOrFail())
  }

  public async update(ctx: HttpContextContract) {
    await ctx.request.validate(UpdateTaskCategoryValidator)

    const taskCategory = await TaskCategory.query()
      .withScopes(scopes => scopes.visibleTo(ctx.auth.user as User))
      .where('id', ctx.request.param('id'))
      .firstOrFail()
    
    await taskCategory.merge(ctx.request.body()).save()

    return ctx.response.ok(taskCategory)
  }

  public async destroy(ctx: HttpContextContract) {
    const taskCategory = await TaskCategory.query()
      .withScopes(scopes => scopes.visibleTo(ctx.auth.user as User))
      .where('id', ctx.request.param('id'))
      .firstOrFail()
    
    await taskCategory.delete()

    return ctx.response.ok(taskCategory)
  }
}
