import User from "App/Models/User"

export interface UpdatePhotoOptions<Context> {
    context: Context
}
export interface VerifyOptions {
    user?: User
}