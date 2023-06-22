import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ResourcesQueryParse {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    await ctx.request.validateResourcesQs()

    const { page } = ctx.request.qs()

    ctx.request.updateQs({
      page: {
        size: Number(page.size),
        number: Number(page.number)
      }
    })
    
    await next()
  }
}
