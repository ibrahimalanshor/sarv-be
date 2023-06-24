import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateTaskStatusValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        name: schema.string({}, [
            rules.required(),
        ])
    })

    public messages: CustomMessages = {}

    public cacheKey = this.ctx.routeKey
}