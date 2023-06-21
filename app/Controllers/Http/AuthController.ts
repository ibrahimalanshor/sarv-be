import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import RegisterValidator from 'App/Validators/Auth/RegisterValidator'

export default class AuthController {
    public async login(context: HttpContextContract) {
        await context.request.validate(LoginValidator)

        const { email, password } = context.request.body()
        const token = await context.auth.use('api').attempt(email, password)     

        return context.response.ok({
            token: token.toJSON(),
            user: token.user
        })
    }

    public async register(context: HttpContextContract) {
        await context.request.validate(RegisterValidator)

        const user = await User.create(context.request.except(['password_confirmation']))

        return context.response.created(user)
    }
}