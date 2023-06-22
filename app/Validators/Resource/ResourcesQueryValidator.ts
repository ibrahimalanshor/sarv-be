import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ResourcesQueryValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        page: schema.object([rules.required()]).members({
            size: schema.number([rules.required()]),
            number: schema.number([rules.required()])
        })
    })

    public messages: CustomMessages = {}

    public cacheKey = this.ctx.routeKey
}