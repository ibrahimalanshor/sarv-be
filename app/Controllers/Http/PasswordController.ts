import { inject } from '@adonisjs/fold'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PasswordServive } from 'App/Services/PasswordService'
import ForgotPasswordValidator from 'App/Validators/Password/ForgotPasswordValidator'

@inject()
export default class PasswordController {
    constructor(private passwordService: PasswordServive) {}

    public async forgot(context: HttpContextContract) {
        await context.request.validate(ForgotPasswordValidator)

        await this.passwordService.forgot({
            email: context.request.body().email,
            context
        })

        return context.response.ok({ message: 'Success send reset password url' })
    }

    public async reset(context: HttpContextContract) {
        await this.passwordService
    }
}
