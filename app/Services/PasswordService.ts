import { inject } from "@adonisjs/fold";
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ResetPassword from "App/Mailers/ResetPassword";
import { UserRepository } from "App/Repositories/Modules/UserRepository";
import { ForgotPasswordOptions } from "Contracts/services/password.service";

@inject()
export class PasswordServive {
    constructor(private userRepository: UserRepository) {}

    public async forgot(options: ForgotPasswordOptions<HttpContextContract>) {
        const user = await this.userRepository.getOne({
            filter: {
                email: options.email,
            }
        })

        await new ResetPassword(user).sendLater()
    }
}