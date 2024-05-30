import { PASSWORD_INCORRECT } from "@/constant";
import { authMapper } from "@/mapper/authMapper";
import { AuthDto, LoginResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

interface IUseLogin {
    payload: AuthDto,
    onSuccess: (data: LoginResponse) => void,
    onError: (error: Error) => void
}

const baseUrl = process.env.YOUAPP_API_URL;
const login = async (loginPayload: AuthDto) => {

    const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginPayload)
    })

    const data = await response.json();
    if (!response.ok || [PASSWORD_INCORRECT,].includes(data?.message)) {
        throw new Error(data?.message);
    }

    return authMapper.loginMapper(data);
}

export const useLogin = ({ onError, onSuccess, payload }: IUseLogin) => {
    return useMutation({
        mutationKey: ["auth-login"],
        mutationFn: async () => await login(payload),
        onSuccess,
        onError
    })
}