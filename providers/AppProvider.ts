import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    const Request = this.app.container.use('Adonis/Core/Request')
    const {  schema, rules } = await import('@ioc:Adonis/Core/Validator')

    Request.macro('validateResourcesQs', async function () {
      await this.validate({
        schema: schema.create({
          page: schema.object([rules.required()]).members({
            size: schema.number([rules.required()]),
            number: schema.number([rules.required()])
          })
        }),
        data: this.qs()
      })
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
