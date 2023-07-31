import { inject } from '@adonisjs/fold'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PasswordServive } from 'App/Services/PasswordService'

@inject()
export default class PasswordController {
    constructor(private passwordService: PasswordServive) {}

    public async forgot(context: HttpContextContract) {
        await this.passwordService.forgot({
            email: context.request.param('email'),
            context
        })

        return context.response.ok({ message: 'Success send reset password url' })
    }
}
