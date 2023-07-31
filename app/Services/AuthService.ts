import { inject } from '@adonisjs/fold';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthResult, LoginOptions, LogoutOptions, RegisterOptions, VerifyEmailOptions } from "Contracts/services/auth.service";
import { UserRepository } from 'App/Repositories/Modules/UserRepository'
import { getNow } from 'App/Utils/date.util';

@inject()
export class AuthService {
    constructor (private userRepository: UserRepository) {}

    public async login(options: LoginOptions<HttpContextContract>): Promise<AuthResult> {
        const token = await options.context.auth.use('api').attempt(options.credentials.email, options.credentials.password)

        return {
            token: token.toJSON(),
            user: token.user
        }
    }

    public async register(options: RegisterOptions<HttpContextContract>): Promise<AuthResult> {
        const user = await this.userRepository.store({
            values: options.user
        })
        const token = await options.context.auth.use('api').generate(user)

        return {
            token: token.toJSON(),
            user
        }
    }

    public async logout(options: LogoutOptions<HttpContextContract>) {
        await options.context.auth.use('api').logout()
    }

    public async verifyEmail(options: VerifyEmailOptions<HttpContextContract>) {
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