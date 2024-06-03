import { parseJwt } from '@/lib/utils';
import { useLogin, useRegister } from '@/services/auth';
import { AuthDto } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import Cookie from 'js-cookie';

interface IRegister {
    email: string;
    userName: string;
    password: string;
    confirmPassword: string;
}

export const useRegisterHook = () => {
    const initialUser: IRegister = {
        confirmPassword: "",
        email: "",
        userName: "",
        password: "",
    };
    const router = useRouter();
    const [user, setUser] = useState<IRegister>(initialUser);

    const [error, setError] = useState({
        show: false,
        message: ""
    })

    // Mapping Payload
    const loginPayload: AuthDto = useMemo(() => {
        return {
            email: user.email,
            username: "",
            password: user.password,
        }
    }, [user])

    // Mutation Login
    const { mutate: login, isPending: isLoadingLogin } = useLogin({
        payload: loginPayload,
        onError: (error) => {
            setError({
                show: true,
                message: error.message
            })
        },
        onSuccess: (data) => {
            const parsedData = parseJwt(data.accessToken);
            if (parsedData) {
                Cookie.set('token', data.accessToken);
                Cookie.set('currentUser', parsedData);
                router.replace('/profile')
            }
        }
    });

    const registerPayload: AuthDto = useMemo(() => {
        return {
            email: user.email,
            username: user.userName,
            password: user.confirmPassword

        }
    }, [user])

    const { mutate: register, isPending: isLoadingRegister } = useRegister({
        payload: registerPayload,
        onSuccess: () => {
            login();
        },
        onError: (error) => {
            setError({
                show: true,
                message: error.message
            })
        }
    })


    const handleChange = useCallback((value: string, key: string) => {
        setUser(prevUser => ({ ...prevUser, [key]: value }));
    }, []);

    const handleCloseNotif = useCallback(() => {
        setError({
            message: "",
            show: false
        })
    }, [setError])

    const submitDisabled: boolean = useMemo(() => {
        return (!user.email || !user.userName || !user.password || !user.confirmPassword) || (user.password !== user.confirmPassword);
    }, [user])

    const isLoading: boolean = useMemo(() => isLoadingLogin || isLoadingRegister, [isLoadingLogin, isLoadingRegister])

    return {
        data: {
            user,
            submitDisabled,
            isLoading,
            error
        },
        method: {
            register,
            handleChange,
            handleCloseNotif
        },
    };
};
