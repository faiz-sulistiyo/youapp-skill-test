import { parseJwt } from '@/lib/utils';
import { useLogin } from '@/services/auth';
import { AuthDto } from '@/types/auth';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

interface ILogin {
    emailOrUserName: string;
    password: string;
}

export const useLoginHook = () => {
    const initialUser: ILogin = {
        emailOrUserName: "",
        password: "",
    };
    const router = useRouter();
    const [user, setUser] = useState<ILogin>(initialUser);

    const [error, setError] = useState({
        show: false,
        message: ""
    })

    // Mapping Payload
    const loginPayload: AuthDto = useMemo(() => {
        // Since the input field is only one for email and username, we need the validate is it email or not
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
            email: emailRegex.test(user.emailOrUserName) ? user.emailOrUserName : "",
            username: emailRegex.test(user.emailOrUserName) ? "" : user.emailOrUserName,
            password: user.password,
        }
    }, [user])

    // Mutation Login
    const { mutate: login, isPending:isLoadingLogin } = useLogin({
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

    // handle onchange for all input
    const handleChange = useCallback((value: string, key: string) => {
        setUser(prevUser => ({ ...prevUser, [key]: value }));
    }, []);

    // memoize disabled button
    const submitDisabled: boolean = useMemo(() => {
        return (!user.emailOrUserName || !user.password);
    }, [user])

    const handleCloseNotif = useCallback(() => {
        setError({
            message: "",
            show: false
        })
    }, [setError])

    return {
        data: {
            user,
            submitDisabled,
            error,
            isLoadingLogin
        },
        method: {
            handleChange,
            handleCloseNotif,
            login
        },
    };
};
