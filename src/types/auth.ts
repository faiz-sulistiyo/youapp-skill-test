import { BaseResponse } from "./common"

type AuthDto = {
    email: string,
    username: string,
    password: string
}

type LoginResponse = BaseResponse & {
    accessToken:string
}

type RegisterResponse = BaseResponse & {

}

export type {
    AuthDto,
    LoginResponse,
    RegisterResponse
}