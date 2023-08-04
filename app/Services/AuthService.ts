import { inject } from '@adonisjs/fold';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthResult, LoginOptions, LoginSocialOptions, LogoutOptions, RegisterOptions } from "Contracts/services/auth.service";
import { UserRepository } from 'App/Repositories/Modules/UserRepository'
import { getNow } from 'App/Utils/date.util';

@inject()
export class AuthService {
    constructor (private userRepository: UserRepository) {}

    private genereateAuthResult(token) {
        return {
            token: token.toJSON(),
            user: token.user
        }
    }

    public async login(options: LoginOptions<HttpContextContract>): Promise<AuthResult> {
        const token = await options.context.auth.use('api').attempt(options.credentials.email, options.credentials.password)

        return this.genereateAuthResult(token)
    }

    public async loginSocial(options: LoginSocialOptions<HttpContextContract>) {
        const user = await this.userRepository.getOneOrCreate({
            filter: {
                email: options.user.email
            },
            values: {
                email: options.user.email,
                name: options.user.name,
                verified_at: options.user.emailVerificationState === 'verified' ? getNow() : null,
                photo_src: options.user.avatarUrl
            }
        })

        const token = await options.context.auth.use('api').generate(user)

        return this.genereateAuthResult(token)
    }

    public async register(options: RegisterOptions<HttpContextContract>): Promise<AuthResult> {
        const user = await this.userRepository.store({
            values: options.user
        })
        const token = await options.context.auth.use('api').generate(user)

        return this.genereateAuthResult(token)
    }

    public async logout(options: LogoutOptions<HttpContextContract>) {
        await options.context.auth.use('api').logout()
    }
}