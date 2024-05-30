import { LoginResponse } from "@/types/auth";

const loginMapper = (data:any):LoginResponse =>{
    return {
        message:data?.message ?? "",
        access_token: data?.access_token ?? ""
    }
}

export const authMapper = {
    loginMapper
}