import { UserResponse } from "@/types/user"

const profileMapper = (data:any):UserResponse => {
    return {
        ...data.data
    }
}

export const userMapper = {
    profileMapper
}