type AuthDto = {
    email: string,
    username: string,
    password: string
}

type LoginResponse = {
    message:string,
    access_token:string
}

export type {
    AuthDto,
    LoginResponse
}