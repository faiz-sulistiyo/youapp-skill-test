import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

interface IRegister {
    email: string;
    userName: string;
    password: string;
    confirmPassword:string;
}

export const useRegisterHook = () => {
    const initialUser: IRegister = {
        confirmPassword:"",
        email:"",
        userName:"",
        password: "",
    };
    const router = useRouter();
    const [user, setUser] = useState<IRegister>(initialUser);

    const handleChange = useCallback((value: string, key:string) => {
        setUser(prevUser => ({ ...prevUser, [key]: value }));
    }, []);

    const submitDisabled:boolean = useMemo(()=>{
        return (!user.email || !user.userName || !user.password || !user.confirmPassword) || (user.password !== user.confirmPassword);
    },[user])

    const handleSubmitRegister = useCallback(()=>{
        console.log(user);
    },[user])
    
    return {
        data: {
            user,
            submitDisabled
        },
        method: {
            handleChange,
            handleSubmitRegister
        },
    };
};
