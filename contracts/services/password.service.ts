export interface ForgotPasswordOptions<Context> {
    email: string,
    context: Context,
}

export interface ResetPasswordOptions<Context> {
    token: string,
    context: Context,
}