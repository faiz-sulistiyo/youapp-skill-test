import { parseJwt } from '@/lib/jwtParser';
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

    // mapping payload
    const loginPayload: AuthDto = useMemo(() => {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
            email: emailRegex.test(user.emailOrUserName) ? user.emailOrUserName : "",
            username: emailRegex.test(user.emailOrUserName) ? "" : user.emailOrUserName,
            password: user.password,
        }
    }, [user])

    // mutation login
    const { mutate: login, data } = useLogin({
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
                Cookie.set('currentUser', parsedData);
                router.replace('/profile')
            }
        }
    });

    // handle onchange for all input
    const handleChange = useCallback((value: string, key: string) => {
        setUser(prevUser => ({ ...prevUser, [key]: value }));
    }, []);

    const submitDisabled: boolean = useMemo(() => {
        return (!user.emailOrUserName || !user.password);
    }, [user])

    const handleSubmitLogin = useCallback(() => {
        login();
    }, [login])

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
            error
        },
        method: {
            handleChange,
            handleSubmitLogin,
            handleCloseNotif
        },
    };
};
