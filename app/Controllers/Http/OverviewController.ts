import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { inject } from "@adonisjs/fold";
import OverviewValidator from 'App/Validators/OverviewValidator';
import { TaskReportRepository } from 'App/Repositories/Modules/Task/TaskReportRepository';

@inject()
export default class OverviewController {
    constructor (private taskReportRepository: TaskReportRepository) {}

    public async getTaskOverview(context: HttpContextContract) {
        await context.request.validate(OverviewValidator)

        return await this.taskReportRepository.getTaskOverview({
            filter: {
                ...context.request.qs().filter,
                user_id: context.auth.user?.id
            }
        })
    }
}
