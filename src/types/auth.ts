import { BaseResponse } from "./common"

type AuthDto = {
    email: string,
    username: string,
    password: string
}

type LoginResponse = {
    message:string
    accessToken:string
}

export type {
    AuthDto,
    LoginResponse
}