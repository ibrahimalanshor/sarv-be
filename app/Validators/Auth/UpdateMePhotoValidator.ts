import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateMePhotoValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        photo: schema.file.nullableAndOptional({
            extnames: ['jpg', 'jpeg', 'png', 'svg']
        })
    })

    public messages: CustomMessages = {}

    public cacheKey = this.ctx.routeKey
}