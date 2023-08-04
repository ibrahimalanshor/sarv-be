import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Unverified {
  public async handle(context: HttpContextContract, next: () => Promise<void>) {
    if (context.auth.use('api').user?.is_verified) {
      return context.response.unauthorized({ message: 'User is verified' })
    }

    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }
}
