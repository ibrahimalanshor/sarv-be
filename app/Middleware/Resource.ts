import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class Resource {
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

  private isRouteName(ctx: HttpContextContract, name: string): boolean {
    const asArray = ctx.route?.name?.split('.') ?? []

    return asArray[asArray?.length - 1] === name
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
        filter: schema.object.nullableAndOptional().anyMembers(),
        include: schema.array.nullableAndOptional().members(schema.string())
      }),
      data: ctx.request.qs(),
      cacheKey: ctx.routeKey
    })

    const { page, sort, filter, include } = ctx.request.qs()

    ctx.request.updateQs({
      page: this.parsePageQuery(page ?? {}),
      sort: this.parseSortQuery(sort ?? 'id'),
      filter: filter ?? {},
      include
    })
  }

  private async validateShowResource(ctx) {
    await ctx.request.validate({
      schema: schema.create({
        include: schema.array.nullableAndOptional().members(schema.string())
      }),
      data: ctx.request.qs(),
      cacheKey: ctx.routeKey
    })

    const { page, sort, filter, include } = ctx.request.qs()

    ctx.request.updateQs({
      page: this.parsePageQuery(page ?? {}),
      sort: this.parseSortQuery(sort ?? 'id'),
      filter: filter ?? {},
      include
    })
  }

  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    if (this.isRouteName(ctx, 'index')) {
      await this.validateIndexResource(ctx)
    } else if (this.isRouteName(ctx, 'show')) {
      await this.validateShowResource(ctx)
    }
    
    await next()
  }
}
