import { inject } from "@adonisjs/fold";
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { string } from '@ioc:Adonis/Core/Helpers'
import ResetPassword from "App/Mailers/ResetPassword";
import { UserRepository } from "App/Repositories/Modules/UserRepository";
import { ForgotPasswordOptions, ResetPasswordOptions } from "Contracts/services/password.service";
import { ResetPasswordRepository } from "App/Repositories/Modules/ResetPasswordRepoistory";

@inject()
export class PasswordServive {
    constructor(private userRepository: UserRepository, private resetPasswordRepository: ResetPasswordRepository) {}

    public async forgot(options: ForgotPasswordOptions<HttpContextContract>) {
        const user = await this.userRepository.getOne({
            filter: {
                email: options.email,
            }
        })
        await this.resetPasswordRepository.deleteMany({
            filter: {
                user_id: user.id
            }
        })
        const resetPassword = await this.resetPasswordRepository.store({
            values: {
                token: string.generateRandom(32),
                user_id: user.id
            }
        })

        await resetPassword.load('user')

        await new ResetPassword(resetPassword).sendLater()
    }

    public async reset(options: ResetPasswordOptions<HttpContextContract>) {
        const resetPassword = await this.resetPasswordRepository.getOne({
            filter: {
                token: options.token
            }
        })
        await this.resetPasswordRepository.deleteOne({
            filter: {
                token: options.token
            }
        })
        
        return await this.userRepository.updateOne({
            filter: {
                id: resetPassword.user_id
            },
            values: {
                password: options.password
            }
        })
    }
}