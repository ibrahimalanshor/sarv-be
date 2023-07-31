import Repository from "App/Repositories/Repository";
import { inject } from '@adonisjs/fold';
import { GetOneOptions } from "Contracts/repository"
import User from 'App/Models/User';
import { isNullOrUndefined } from 'App/Utils/check-type.util'
import { parseBoolean } from 'App/Utils/parse-type.util'

@inject()
export class UserRepository extends Repository<User> {
    public model = User

    public async getOne(options: GetOneOptions) {
        return await this.model.query()
            .withScopes((scopes) => {
                if (isNullOrUndefined(options.filter.is_verified, { reverse: true })) {
                    scopes.isVerified(parseBoolean(options.filter.is_verified))
                }
            })
            .if(options.filter.id, query => query.where('id', options.filter.id))
            .if(options.filter.email, query => query.where('email', options.filter.email))
            .firstOrFail()
    }
}