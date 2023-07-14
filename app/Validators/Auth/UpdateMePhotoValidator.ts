import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateMePhotoValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        photo: schema.file.nullableAndOptional({
            extnames: ['jpg', 'png', 'svg']
        })
    })

    public messages: CustomMessages = {}

    public cacheKey = this.ctx.routeKey
}