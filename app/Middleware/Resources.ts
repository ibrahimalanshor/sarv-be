import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class Resources {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    await ctx.request.validate({
      schema: schema.create({
        page: schema.object.nullableAndOptional().members({
          size: schema.number.nullableAndOptional(),
          number: schema.number.nullableAndOptional()
        })
      }),
      data: ctx.request.qs()
    })

    const { page } = ctx.request.qs()

    ctx.request.updateQs({
      page: {
        size: Number(page?.size ?? 10),
        number: Number(page?.number ?? 1)
      }
    })
    
    await next()
  }
}
