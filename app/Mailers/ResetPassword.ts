import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Config from '@ioc:Adonis/Core/Config'
import { default as ResetPasswordModel } from 'App/Models/ResetPassword'

export default class ResetPassword extends BaseMailer {
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()

  constructor (private resetPassword: ResetPasswordModel) {
    super()
  }

  /**
   * The prepare method is invoked automatically when you run
   * "ResetPassword.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public prepare(message: MessageContract) {
    message
      .subject('Reset Password')
      .from(Config.get('mail.from'))
      .to(this.resetPassword.user.email)
      .htmlView('emails/reset_password', {
        url: `${Config.get('app.resetPasswordUrl')}?email=${this.resetPassword.user.email}&token=${this.resetPassword.token}`
      })
  }
}
