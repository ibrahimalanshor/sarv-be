import { inject } from '@adonisjs/fold';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import { UpdateUserPhotoContract } from "Contracts/services/user.service";
import { UserRepository } from 'App/Repositories/Modules/UserRepository'

@inject()
export class UserService {
    constructor (private userRepository: UserRepository) {}

    public async updateUserPhoto(options: UpdateUserPhotoContract<HttpContextContract>) {
        const photo = options.context.request.file('photo')

        await photo?.moveToDisk('./')

        return await this.userRepository.updateOne({
            filter: {
                id: options.context.auth.user?.id
            },
            values: {
                photo_src: await Drive.getUrl(photo?.fileName as string)
            }
        })
    }
}