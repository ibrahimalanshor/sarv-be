import type { EventsList } from '@ioc:Adonis/Core/Event'
import VerifyEmail from 'App/Mailers/VerifyEmail'

export default class User {
    public async onSendVerifyEmail(user: EventsList['update-email:user']) {
        await new VerifyEmail(user).sendLater()
    }
}
