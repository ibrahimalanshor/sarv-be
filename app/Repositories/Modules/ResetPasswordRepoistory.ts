import Repository from "App/Repositories/Repository";
import { inject } from '@adonisjs/fold';
import ResetPassword from "App/Models/ResetPassword";

@inject()
export class ResetPasswordRepository extends Repository<ResetPassword> {
    public model = ResetPassword
}