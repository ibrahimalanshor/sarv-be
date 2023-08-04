import { inject } from '@adonisjs/fold'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthService } from 'App/Services/AuthService'

@inject()
export default class AuthSocialController {
    constructor(private authService: AuthService) {}

    public async google(context: HttpContextContract) {
        const user = await context.ally.use('google').userFromToken(context.request.body().token)
        const res = await this.authService.loginSocial({
            user: {
                email: user.email as string,
                name: user.name as string,
                emailVerificationState: user.emailVerificationState as string,
                avatarUrl: user.avatarUrl as string,
            },
            context
        })

        return res
    }
}
