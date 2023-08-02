import { inject } from "@adonisjs/fold";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserRepository } from "App/Repositories/Modules/UserRepository";
import { SendVerifyEmailOptions, VerifyEmailOptions } from "Contracts/services/email.service";
import { getNow } from 'App/Utils/date.util';
import VerifyEmail from "App/Mailers/VerifyEmail";

@inject()
export class EmailService {
    constructor (private userRepository: UserRepository) {}

    public async send(options: SendVerifyEmailOptions<HttpContextContract>) {
        return await new VerifyEmail(options.user).sendLater()
    }

    public async verify(options: VerifyEmailOptions<HttpContextContract>) {
        return await this.userRepository.updateOne({
            values: {
                verified_at: getNow()
            },
            filter: {
                email: options.email,
                is_verified: false
            }
        })
    }
}