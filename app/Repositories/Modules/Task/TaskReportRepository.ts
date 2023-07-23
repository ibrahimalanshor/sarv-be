import { inject } from '@adonisjs/fold'
import Database from '@ioc:Adonis/Lucid/Database'
import { GetTaskOverviewOptions, TaskOverview } from 'Contracts/repositories/task/task-report.repository'

@inject()
export class TaskReportRepository {
    public async getTaskOverview(options?: GetTaskOverviewOptions): Promise<TaskOverview> {
        return await Database
            .query()
            .select(Database.raw('count(*) as countAll'))
            .select(
                Database
                    .query()
                    .select(Database.raw('count(*)'))
                    .from('tasks')
                    .where('status', 'in-progress')
                    .if(options?.filter?.user_id, query => query.where('user_id', options?.filter?.user_id))
                    .if(options?.filter?.from_date, query => query.where('created_at', '>=', options?.filter?.from_date))
                    .if(options?.filter?.to_date, query => query.where('created_at', '<=', options?.filter?.to_date))
                    .as('countInProgress')
            )
            .select(
                Database
                    .query()
                    .select(Database.raw('count(*)'))
                    .from('tasks')
                    .where('status', 'done')
                    .if(options?.filter?.user_id, query => query.where('user_id', options?.filter?.user_id))
                    .if(options?.filter?.from_date, query => query.where('created_at', '>=', options?.filter?.from_date))
                    .if(options?.filter?.to_date, query => query.where('created_at', '<=', options?.filter?.to_date))
                    .as('countDone')
            )
            .select(
                Database
                    .query()
                    .select(Database.raw('count(*)'))
                    .from('tasks')
                    .whereIn('status', ['todo', 'in-progress'])
                    .if(options?.filter?.user_id, query => query.where('user_id', options?.filter?.user_id))
                    .if(options?.filter?.from_date, query => query.where('created_at', '>=', options?.filter?.from_date))
                    .if(options?.filter?.to_date, query => query.where('created_at', '<=', options?.filter?.to_date))
                    .as('countActive')
            )
            .if(options?.filter?.user_id, query => query.where('user_id', options?.filter?.user_id))
            .if(options?.filter?.from_date, query => query.where('created_at', '>=', options?.filter?.from_date))
            .if(options?.filter?.to_date, query => query.where('created_at', '<=', options?.filter?.to_date))
            .from('tasks')
            .first()
        }
}