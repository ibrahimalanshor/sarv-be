import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { inject } from '@adonisjs/fold'
import { TasksRepository } from 'App/Repositories/Modules/TasksRepository'
import CreateTaskValidator from 'App/Validators/Task/CreateTaskValidator'
import UpdateTaskValidator from 'App/Validators/Task/UpdateTaskValidator'
import UpdateTaskStatusValidator from 'App/Validators/Task/UpdateTaskStatusValidator'

@inject()
export default class TasksController {
  constructor(public repository: TasksRepository) {}

  public async index(ctx: HttpContextContract) {
    const { page, sort, filter, include } = ctx.request.qs()
    
    return ctx.response.ok(await this.repository.getAll({ sort, page, filter, include, context: ctx }))
  }

  public async store(ctx: HttpContextContract) {
    await ctx.request.validate(CreateTaskValidator)

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
    await ctx.request.validate(UpdateTaskValidator)

    return ctx.response.ok(await this.repository.updateOne({
      filter: { id: ctx.request.param('id') },
      values: ctx.request.body(),
      context: ctx
    }))
  }

  public async updateStatus(ctx: HttpContextContract) {
    await ctx.request.validate(UpdateTaskStatusValidator)

    return ctx.response.ok(await this.repository.updateOne({
      filter: { id: ctx.request.param('id') },
      values: ctx.request.only(['status']),
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
