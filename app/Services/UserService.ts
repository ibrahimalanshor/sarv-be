import { inject } from '@adonisjs/fold';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import { UpdatePhotoOptions, VerifyOptions } from "Contracts/services/user.service";
import { UserRepository } from 'App/Repositories/Modules/UserRepository'
import { getNow } from 'App/Utils/date.util';

@inject()
export class UserService {
    constructor (private userRepository: UserRepository) {}

    public async updatePhoto(options: UpdatePhotoOptions<HttpContextContract>) {
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

    public async verify(options: VerifyOptions) {
        return await this.userRepository.updateOne({
            target: options.user,
            values: {
                verified_at: getNow()
            }
        })
    }
}