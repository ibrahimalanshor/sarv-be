import { inject } from '@adonisjs/fold'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserRepository } from 'App/Repositories/Modules/UserRepository'
import { UserService } from 'App/Services/UserService'
import UpdateMePhotoValidator  from 'App/Validators/Auth/UpdateMePhotoValidator'
import UpdateMeEmailValidator  from 'App/Validators/Auth/UpdateMeEmailValidator'
import UpdateMePasswordValidator  from 'App/Validators/Auth/UpdateMePasswordValidator'
import UpdateMeValidator from 'App/Validators/Auth/UpdateMeValidator'

@inject()
export default class MeController {
    constructor(private userService: UserService, private userRepository: UserRepository) {}

    public async getMe(context: HttpContextContract) {
        return context.response.ok(context.auth.user)
    }

    public async updateMePhoto(context: HttpContextContract) {
        await context.request.validate(UpdateMePhotoValidator)

        return context.response.ok(await this.userService.updatePhoto({ context }))
    }

    public async updateMe(context: HttpContextContract) {
        await context.request.validate(UpdateMeValidator)
        
        return context.response.ok(await this.userRepository.updateOne({
            values: context.request.body(),
            filter: {
                id: context.auth.user?.id
            }
        }))
    }

    public async updateMeEmail(context: HttpContextContract) {
        await context.request.validate(UpdateMeEmailValidator)
        
        return context.response.ok(await this.userRepository.updateOne({
            values: context.request.body(),
            filter: {
                id: context.auth.user?.id
            }
        }))
    }

    public async updateMePassword(context: HttpContextContract) {
        await context.request.validate(UpdateMePasswordValidator)
        
        return context.response.ok(await this.userRepository.updateOne({
            values: context.request.except(['password_confirmation']),
            filter: {
                id: context.auth.user?.id
            }
        }))
    }
}