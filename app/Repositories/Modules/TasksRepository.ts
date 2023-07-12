import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Repository from "App/Repositories/Repository";
import { DeleteOneOptions, GetAllOptions, GetOneOptions, UpdateOneOptions } from "Contracts/repository";
import User from 'App/Models/User';
import { inject } from '@adonisjs/fold';
import Task from 'App/Models/Task';
import { isNullOrUndefined } from 'App/Utils/check-type.util'
import { parseBoolean } from 'App/Utils/parse-type.util'

@inject()
export class TasksRepository extends Repository {
    public model = Task

    public async getAll(options: GetAllOptions<HttpContextContract>) {
        return await this.model.query()
            .withScopes((scopes) => scopes.visibleTo(options.context?.auth.user as User))
            .if(options.filter.name, query => query.whereILike('name', `%${options.filter.name}%`))
            .if(options.filter.task_category_id, query => query.where('task_category_id', options.filter.task_category_id))
            .if(options.filter.task_status_id, query => query.where('task_status_id', options.filter.task_status_id))
            .if(isNullOrUndefined(options.filter.is_due, { reverse: true }), query => query.where('due_date', parseBoolean(options.filter.is_due) ? '<' : '>' , new Date))
            .if(options.include?.includes('category'), query => query.preload('category'))
            .if(options.include?.includes('status'), query => query.preload('status'))
            .orderBy(options.sort.column, options.sort.direction)
            .paginate(options.page.number, options.page.size)
    }

    public async getOne(options: GetOneOptions<HttpContextContract>) {
        return await this.model.query()
            .withScopes(scopes => scopes.visibleTo(options.context?.auth.user as User))
            .where('id', options.filter.id)
            .if(options.include?.includes('category'), query => query.preload('category'))
            .if(options.include?.includes('status'), query => query.preload('status'))
            .firstOrFail()
    }

    public async updateOne(options: UpdateOneOptions<HttpContextContract>) {
        return await super.updateOne({
            filter: options.filter,
            values: options.values,
            target: await this.getOne({ filter: options.filter, context: options.context })
        })
    }

    public async deleteOne(options: DeleteOneOptions<HttpContextContract>) {
        return await super.deleteOne({
            filter: options.filter,
            target: await this.getOne({ filter: options.filter, context: options.context })
        })
    }
}