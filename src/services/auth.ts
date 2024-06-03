import { PASSWORD_INCORRECT, USER_NOT_FOUND } from "@/constant";
import { authMapper } from "@/mapper/authMapper";
import { AuthDto, LoginResponse, RegisterResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

interface IUseLogin {
    payload: AuthDto,
    onSuccess: (data: LoginResponse) => void,
    onError: (error: Error) => void
}

interface IUseRegister {
    payload: AuthDto,
    onSuccess: (data: RegisterResponse) => void,
    onError: (error: Error) => void
}


const baseUrl = process.env.YOUAPP_API_URL;

// Login Function and Mutation
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
    if (!response.ok || [PASSWORD_INCORRECT, USER_NOT_FOUND].includes(data?.message)) {
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

// Register Function and Mutation
const register = async (registerPayload: AuthDto) => {

    const response = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerPayload)
    })

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message);
    }

    return authMapper.registerMapper(data);
}

export const useRegister = ({ payload, onError, onSuccess }: IUseRegister) => {
    return useMutation({
        mutationKey: ["auth-register"],
        mutationFn: async () => await register(payload),
        onError,
        onSuccess
    })
}