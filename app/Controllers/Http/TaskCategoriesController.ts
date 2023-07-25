import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TaskCategoriesRepository } from 'App/Repositories/Modules/TaskCategoriesRepository'
import CreateTaskCategoryValidator from 'App/Validators/TaskCategory/CreateTaskCategoryValidator'
import UpdateTaskCategoryValidator from 'App/Validators/TaskCategory/UpdateTaskCategoryValidator'
import { inject } from '@adonisjs/fold'

@inject()
export default class TaskCategoriesController {
  constructor(public repository: TaskCategoriesRepository) {}

  public async index(ctx: HttpContextContract) {
    const { page, sort, filter, include } = ctx.request.qs()
    
    return ctx.response.ok(await this.repository.getAll({ sort, page, filter, include, context: ctx }))
  }

  public async store(ctx: HttpContextContract) {
    await ctx.request.validate(CreateTaskCategoryValidator)

    return ctx.response.created(await this.repository.store({
      values: {
        ...ctx.request.body(),
        user_id: ctx.auth.user?.id
      }
    }))
  }

  public async show(ctx: HttpContextContract) {
    const { include } = ctx.request.qs()

    return ctx.response.ok(await this.repository.getOne({
      filter: {
        id: ctx.request.param('id')
      },
      include,
      context: ctx
    }))
  }

  public async update(ctx: HttpContextContract) {
    await ctx.request.validate(UpdateTaskCategoryValidator)

    return ctx.response.ok(await this.repository.updateOne({
      filter: { id: ctx.request.param('id') },
      values: ctx.request.body(),
      context: ctx
    }))
  }

  public async destroy(ctx: HttpContextContract) {
    return ctx.response.ok(await this.repository.deleteOne({
      filter: { id: ctx.request.param('id') },
      context: ctx
    }))
  }
}
