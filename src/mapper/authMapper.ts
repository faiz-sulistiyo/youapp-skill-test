import { LoginResponse } from "@/types/auth";

const loginMapper = (data:any):LoginResponse => {
    return {
        message: data?.message,
        accessToken: data?.access_token ?? ""
    }
}

export const authMapper = {
    loginMapper
}