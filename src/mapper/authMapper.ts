import { LoginResponse, RegisterResponse } from "@/types/auth";

const loginMapper = (data:any):LoginResponse => {
    return {
        message: data?.message,
        accessToken: data?.access_token ?? ""
    }
}

const registerMapper = (data:any): RegisterResponse => {
    return {
        message: data?.message,
    }
}

export const authMapper = {
    loginMapper,
    registerMapper
}