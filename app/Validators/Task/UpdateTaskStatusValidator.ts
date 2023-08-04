import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateTaskValidator {
    constructor(protected ctx: HttpContextContract) {}

    public refs = schema.refs({
        user: this.ctx.auth.user
    })

    public schema = schema.create({
      status: schema.enum.nullableAndOptional(['todo', 'pending', 'in-progress', 'done']),
    })

    public messages: CustomMessages = {}

    public cacheKey = this.ctx.routeKey
}