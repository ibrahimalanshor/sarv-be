import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Signed {
  public async handle(context: HttpContextContract, next: () => Promise<void>) {
    if (!context.request.hasValidSignature()) {
        return context.response.badRequest({ message: 'invalid signature' })
    }
    
    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }
}
