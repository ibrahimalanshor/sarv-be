import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/Auth/LoginValidator'

export default class AuthController {
    public async login(context: HttpContextContract) {
        await context.request.validate(LoginValidator)

        const { email, password } = context.request.body()
        const token = await context.auth.use('api').attempt(email, password)     

        return context.response.status(200).send({
            token: token.toJSON(),
            user: token.user
        })
    }
}