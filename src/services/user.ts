import userMapper from "@/mapper/userMapper";
import { UserDto, UserResponse } from "@/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";

const baseUrl = process.env.YOUAPP_API_URL;
interface IUseUpdateProfile {
    payload: UserDto,
    token: string,
    onSuccess: () => void,
    onError: (error: Error) => void
}

const getUserProfile = async (token: string) => {
    const response = await fetch(`${baseUrl}/getProfile`, {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'applicaion/json',
            'x-access-token': token
        },
    })

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message)
    }

    return userMapper.profileMapper(data)
}

const useGetUserProfile = (token: string) => {
    return useQuery({
        queryKey: ['user-get-profile',token],
        queryFn: async () => await getUserProfile(token),
        enabled: !!token,
        refetchOnWindowFocus: false
    })
}

const updateUserProfile = async (payload: UserDto, token: string) => {
    const response = await fetch(`${baseUrl}/updateProfile`, {
        method: 'PUT',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(payload)
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data?.message);
    }

    return userMapper.profileMapper(data);
}

const useUpdateProfile = ({ onError, onSuccess, payload, token }: IUseUpdateProfile) => {
    return useMutation({
        mutationKey: ['user-update'],
        mutationFn: async () => await updateUserProfile(payload, token),
        onError,
        onSuccess
    })
}

export {
    useGetUserProfile,
    useUpdateProfile
}