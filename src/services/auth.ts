import { authMapper } from "@/mapper/authMapper";
import { AuthDto } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

const baseUrl = process.env.BASE_URL_YOUAPP_API || "";

const login = async (loginPayload: AuthDto) => {
    const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginPayload)
    })
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return authMapper.loginMapper(response.json());
}

export const useLogin = (loginPayload:AuthDto) => {
    return useMutation({
        mutationKey:["auth-login"],
        mutationFn: async () => await login(loginPayload)
    })
}