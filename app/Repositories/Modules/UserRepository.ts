import Repository from "App/Repositories/Repository";
import { inject } from '@adonisjs/fold';
import User from 'App/Models/User';

@inject()
export class UserRepository extends Repository<User> {
    public model = User
}