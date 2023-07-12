import { inject } from '@adonisjs/fold';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import { AuthResult, LoginOptions, RegisterOptions } from "Contracts/services/auth.service";

@inject()
export default class AuthService {
    public async login(options: LoginOptions<HttpContextContract>): Promise<AuthResult> {
        const token = await options.context.auth.use('api').attempt(options.credentials.email, options.credentials.password)

        return {
            token: token.toJSON(),
            user: token.user
        }
    }

    public async register(options: RegisterOptions<HttpContextContract>): Promise<AuthResult> {
        const user = await User.create(options.user)
        const token = await options.context.auth.use('api').generate(user)

        return {
            token: token.toJSON(),
            user
        }
    }
}