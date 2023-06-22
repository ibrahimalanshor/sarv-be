import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class Resources {
  private parsePageQuery(page: Record<string, any>): { size: number, number: number } {
    return {
      size: Number(page?.size ?? 10),
      number: Number(page?.number ?? 1)
    }
  }

  private parseSortQuery(sort: string): { column: string, direction: 'asc' | 'desc' } {
    const isDesc = sort.charAt(0) === '-'
    const column = isDesc ? sort.slice(1) : sort
    return {
      column,
      direction: isDesc ? 'desc' : 'asc'
    }
  }

  private isIndexRoute(ctx: HttpContextContract): boolean {
    const asArray = ctx.route?.name?.split('.') ?? []

    return asArray[asArray?.length - 1] === 'index'
  }

  private async validateIndexResource(ctx) {
    await ctx.request.validate({
      schema: schema.create({
        page: schema.object.nullableAndOptional().members({
          size: schema.number.nullableAndOptional(),
          number: schema.number.nullableAndOptional()
        }),
        sort: schema.string.nullableAndOptional([
          rules.alpha({ allow: ['dash'] })
        ]),
        filter: schema.object.nullableAndOptional().anyMembers()
      }),
      data: ctx.request.qs(),
      cacheKey: ctx.routeKey
    })

    const { page, sort, filter } = ctx.request.qs()

    ctx.request.updateQs({
      page: this.parsePageQuery(page ?? {}),
      sort: this.parseSortQuery(sort ?? 'id'),
      filter: filter ?? {}
    })
  }

  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    if (this.isIndexRoute(ctx)) {
      await this.validateIndexResource(ctx)
    }
    
    await next()
  }
}
