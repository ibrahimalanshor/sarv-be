import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        email: schema.string({}, [
            rules.required(),
            rules.email(),
            rules.unique({ table: 'users', column: 'email' })
        ]),
        name: schema.string({}, [
            rules.required(),
        ]),
        password: schema.string({}, [
            rules.required(),
            rules.minLength(6),
            rules.confirmed()
        ])
    })

    public messages: CustomMessages = {}

    public cacheKey = this.ctx.routeKey
}