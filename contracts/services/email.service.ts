import User from "App/Models/User";

export interface SendVerifyEmailOptions<Context> {
    user: User,
    context: Context,
}

export interface VerifyEmailOptions<Context> {
    email: string,
    context: Context,
}