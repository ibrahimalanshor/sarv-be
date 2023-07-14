import { inject } from '@adonisjs/fold'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserRepository } from 'App/Repositories/Modules/UserRepository'
import { AuthService } from 'App/Services/AuthService'
import { UserService } from 'App/Services/UserService'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import RegisterValidator from 'App/Validators/Auth/RegisterValidator'
import UpdateMePhotoValidator  from 'App/Validators/Auth/UpdateMePhotoValidator'
import UpdateMeValidator from 'App/Validators/Auth/UpdateMeValidator'

@inject()
export default class AuthController {
    constructor(private authService: AuthService, private userService: UserService, private userRepository: UserRepository) {}

    public async login(context: HttpContextContract) {
        await context.request.validate(LoginValidator)

        const { email, password } = context.request.body()

        return context.response.ok(await this.authService.login({
            credentials: { email, password },
            context
        }))
    }

    public async register(context: HttpContextContract) {
        await context.request.validate(RegisterValidator)

        return context.response.ok(await this.authService.register({
            user: context.request.except(['password_confirmation']),
            context
        }))
    }

    public async logout(context: HttpContextContract) {
        return context.response.ok(await this.authService.logout({ context }))
    }

    public async me(context: HttpContextContract) {
        return context.response.ok(context.auth.user)
    }

    public async updateMePhoto(context: HttpContextContract) {
        await context.request.validate(UpdateMePhotoValidator)

        return context.response.ok(await this.userService.updateUserPhoto({ context }))
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
}