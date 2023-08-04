import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { inject } from "@adonisjs/fold";
import { EmailService } from 'App/Services/EmailService';
import User from 'App/Models/User';
import Config from '@ioc:Adonis/Core/Config'

@inject()
export default class EmailController {
    constructor (private emailService: EmailService) {}

    public async send(context: HttpContextContract) {
        await this.emailService.send({
            user: context.auth.use('api').user as User,
            context
        })

        return context.response.ok({ message: 'Success send verification email' })
    }

    public async verify(context: HttpContextContract) {
        await this.emailService.verify({
            email: context.request.qs().email,
            context
        })

        return context.response.redirect(Config.get('app.clientUrl'))
    }
}
