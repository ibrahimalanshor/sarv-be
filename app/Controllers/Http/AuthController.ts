import { inject } from '@adonisjs/fold'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthService from 'App/Services/AuthService'
import { UserService } from 'App/Services/UserService'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import RegisterValidator from 'App/Validators/Auth/RegisterValidator'
import UpdateMePhotoValidator  from 'App/Validators/Auth/UpdateMePhotoValidator'

@inject()
export default class AuthController {
    constructor(private authService: AuthService, private userService: UserService) {}

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

    public async me(context: HttpContextContract) {
        return context.response.ok(context.auth.user)
    }

    public async updateMePhoto(context: HttpContextContract) {
        await context.request.validate(UpdateMePhotoValidator)
        await this.userService.updateMePhoto({ context })

        return context.response.ok(context.auth.user)
    }
}