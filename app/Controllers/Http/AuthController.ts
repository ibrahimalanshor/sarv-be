import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/Auth/LoginValidator'

export default class AuthController {
    public async login(context: HttpContextContract) {
        await context.request.validate(LoginValidator)
        
        return context.request.body()
    }
}