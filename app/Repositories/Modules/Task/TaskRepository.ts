import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Repository from "App/Repositories/Repository";
import { DeleteOneOptions, GetAllOptions, GetOneOptions, UpdateOneOptions, StoreOptions } from "Contracts/repository";
import User from 'App/Models/User';
import { inject } from '@adonisjs/fold';
import Task from 'App/Models/Task';
import { isNullOrUndefined } from 'App/Utils/check-type.util'
import { parseBoolean } from 'App/Utils/parse-type.util'

@inject()
export class TaskRepository extends Repository<Task> {
    public model = Task

    public async store(options: StoreOptions) {
        return await this.model.create(options.values)
    }

    public async getAll(options: GetAllOptions<HttpContextContract>) {
        return await this.model.query()
            .withScopes((scopes) => {
                scopes.visibleTo(options.context?.auth.user as User)

                if (isNullOrUndefined(options.filter.is_due, { reverse: true })) {
                    scopes.isDue(parseBoolean(options.filter.is_due))
                }

                if (isNullOrUndefined(options.filter.is_active, { reverse: true })) {
                    scopes.isActive(parseBoolean(options.filter.is_active))
                }

                if (isNullOrUndefined(options.filter.is_parent, { reverse: true })) {
                    scopes.isParent(parseBoolean(options.filter.is_parent))
                }
            })
            .if(options.filter.name, query => query.whereILike('name', `%${options.filter.name}%`))
            .if(options.filter.task_category_id, query => query.where('task_category_id', options.filter.task_category_id))
            .if(options.filter.parent_id, query => query.where('parent_id', options.filter.parent_id))
            .if(options.filter.status, query => query.where('status', options.filter.status))
            .if(options.filter.statuses, query => query.whereIn('status', options.filter.statuses))
            .if(options.filter.due_date_from, query => query.where('due_date', '>=', options.filter.due_date_from))
            .if(options.filter.due_date_to, query => query.where('due_date', '<=', options.filter.due_date_to))
            .if(options.filter.priority, query => query.where('priority', options.filter.priority))
            .if(options.include?.includes('category'), query => query.preload('category'))
            .if(options.sort.column, query => {
                if (options.sort.column === 'primary') {
                    query.orderBy([
                        {
                            column: 'status',
                            order: options.sort.direction
                        },
                        {
                            column: 'priority',
                            order: options.sort.direction
                        },
                        {
                            column: 'due_date',
                            order: options.sort.direction
                        },
                        {
                            column: 'created_at',
                            order: options.sort.direction
                        }
                    ])
                } else {
                    query.orderBy(options.sort.column, options.sort.direction)
                }
            })
            .paginate(options.page.number, options.page.size)
    }

    public async getOne(options: GetOneOptions<HttpContextContract>) {
        return await this.model.query()
            .withScopes(scopes => scopes.visibleTo(options.context?.auth.user as User))
            .where('id', options.filter.id)
            .if(options.include?.includes('category'), query => query.preload('category'))
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