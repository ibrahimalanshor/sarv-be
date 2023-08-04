import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Config from '@ioc:Adonis/Core/Config'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

export default class VerifyEmail extends BaseMailer {
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()

  constructor (private user: User) {
    super()
  }

  /**
   * The prepare method is invoked automatically when you run
   * "VerifyEmail.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public prepare(message: MessageContract) {
    message
      .subject('Email Verification')
      .from(Config.get('mail.from'))
      .to(this.user.email)
      .htmlView('emails/verify_email', {
        url: Route.makeSignedUrl('api.email.verify', {}, {
          qs: {
            email: this.user.email 
          },
          expiresIn: '30m',
          prefixUrl: Config.get('app.appUrl')
        })
      })
  }
}
