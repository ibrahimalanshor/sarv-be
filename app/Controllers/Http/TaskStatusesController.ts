import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { inject } from '@adonisjs/fold'
import { TaskStatusesRepository } from 'App/Repository/Modules/TaskStatusesRepository'
import CreateTaskStatusValidator from 'App/Validators/TaskStatus/CreateTaskStatusValidator'
import UpdateTaskStatusValidator from 'App/Validators/TaskStatus/UpdateTaskStatusValidator'

@inject()
export default class TaskStatusesController {
  constructor(public repository: TaskStatusesRepository) {}

  public async index(ctx: HttpContextContract) {
    const { page, sort, filter } = ctx.request.qs()
    
    return ctx.response.ok(await this.repository.getAll({ sort, page, filter, context: ctx }))
  }

  public async store(ctx: HttpContextContract) {
    await ctx.request.validate(CreateTaskStatusValidator)

    return ctx.response.created(await this.repository.store({
      values: {
        ...ctx.request.body(),
        user_id: ctx.auth.user?.id
      }
    }))
  }

  public async show(ctx: HttpContextContract) {
    return ctx.response.ok(await this.repository.getOne({
      filter: {
        id: ctx.request.param('id')
      },
      context: ctx
    }))
  }

  public async update(ctx: HttpContextContract) {
    await ctx.request.validate(UpdateTaskStatusValidator)

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
