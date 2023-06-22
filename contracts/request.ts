declare module '@ioc:Adonis/Core/Request' {
    interface RequestContract {
      validateResourcesQs(): Promise<void>
    }
  }
  