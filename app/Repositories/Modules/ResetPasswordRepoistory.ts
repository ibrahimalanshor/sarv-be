import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Repository from "App/Repositories/Repository";
import { inject } from '@adonisjs/fold';
import ResetPassword from "App/Models/ResetPassword";
import { GetOneOptions } from "Contracts/repository";

@inject()
export class ResetPasswordRepository extends Repository<ResetPassword> {
    public model = ResetPassword

    public async getOne(options: GetOneOptions<HttpContextContract>) {
        return await this.model.query()
            .if(options.filter.id, query => query.where('id', options.filter.id))
            .if(options.filter.token, query => query.where('token', options.filter.token))
            .if(options.include?.includes('user'), query => query.preload('user'))
            .firstOrFail()
    }
}