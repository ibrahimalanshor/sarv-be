import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TaskCategory from "App/Models/TaskCategory";
import Repository from "App/Repositories/Repository";
import { DeleteOneOptions, GetAllOptions, GetOneOptions, UpdateOneOptions } from "Contracts/repository";
import User from 'App/Models/User';
import { inject } from '@adonisjs/fold';

@inject()
export class TaskCategoriesRepository extends Repository<TaskCategory> {
    public model = TaskCategory

    public async getAll(options: GetAllOptions<HttpContextContract>) {
        return await this.model.query()
            .withScopes((scopes) => scopes.visibleTo(options.context?.auth.user as User))
            .if(options.filter.name, query => query.whereILike('name', `%${options.filter.name}%`))
            .if(options.include?.includes('tasks_count'), query => query.withCount('tasks'))
            .if(options.include?.includes('tasks_done_count'), query => query.withCount('tasks', query => {
                query.where('status', 'done')
                query.as('tasks_done_count')
            }))
            .orderBy(options.sort.column, options.sort.direction)
            .paginate(options.page.number, options.page.size)
    }

    public async getOne(options: GetOneOptions<HttpContextContract>) {
        return await this.model.query()
            .withScopes(scopes => scopes.visibleTo(options.context?.auth.user as User))
            .where('id', options.filter.id)
            .if(options.include?.includes('tasks_count'), query => query.withCount('tasks'))
            .if(options.include?.includes('tasks_done_count'), query => query.withCount('tasks', query => {
                query.where('status', 'done')
                query.as('tasks_done_count')
            }))
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