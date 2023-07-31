import User from "App/Models/User"

export interface AuthResult {
    token: {
        type: string,
        token: string
    },
    user: User
}

export interface LoginOptions<Context> {
    context: Context,
    credentials: {
        email: string
        password: string
    }
}

export interface RegisterOptions<Context> {
    context: Context,
    user: Partial<User>
}

export interface LogoutOptions<Context> {
    context: Context,
}

export interface VerifyEmailOptions<Context> {
    email: string,
    context: Context,
}