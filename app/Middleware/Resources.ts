import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class Resources {
  private parseSortQuery(sort: string): { column: string, direction: 'asc' | 'desc' } {
    const isDesc = sort.charAt(0) === '-'
    const column = isDesc ? sort.slice(1) : sort
    return {
      column,
      direction: isDesc ? 'desc' : 'asc'
    }
  }

  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    await ctx.request.validate({
      schema: schema.create({
        page: schema.object.nullableAndOptional().members({
          size: schema.number.nullableAndOptional(),
          number: schema.number.nullableAndOptional()
        }),
        sort: schema.string.nullableAndOptional([
          rules.alpha({ allow: ['dash'] })
        ])
      }),
      data: ctx.request.qs()
    })

    const { page, sort } = ctx.request.qs()

    ctx.request.updateQs({
      page: {
        size: Number(page?.size ?? 10),
        number: Number(page?.number ?? 1)
      },
      sort: this.parseSortQuery(sort ?? 'id')
    })
    
    await next()
  }
}
