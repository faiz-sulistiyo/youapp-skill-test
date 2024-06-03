import { useGetUserProfile, useUpdateProfile } from '@/services/user';
import Cookie from 'js-cookie';
import { SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
export const useProfileHook = () => {
    const token = Cookie.get('token') ?? "";
    const { data: dataProfile, isLoading: isLoadingGetProfile, refetch: refetchProfile, isFetching: isFetchingProfile } = useGetUserProfile(token)
    const [isEditAbout, setIsEditAbout] = useState<boolean>(false);
    const [isEditInterest, setIsEditInterest] = useState<boolean>(false);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [profile, setProfile] = useState({
        birthday: "",
        email: "",
        height: 0,
        horoscope: "",
        interests: [] as string[],
        name: "",
        username: "",
        weight: 0,
        zodiac: "",
        gender: "",
        image:""
    });

    const payload = useMemo(()=>{
        return {
            interest: profile?.interests ?? [],
            birthday: profile?.birthday ?? "",
            height: Number(profile?.height) ?? 0,
            name: profile?.name ?? "",
            weight: Number(profile?.weight) ?? 0,
        }
    },[profile])

    const { mutate: updateProfile, isPending: isLoadingUpdate } = useUpdateProfile({
        onError: () => {

        },
        onSuccess: () => {
            refetchProfile();
        },
        payload,
        token
    })

    useEffect(() => {
        const image =  typeof window !== 'undefined' ? localStorage.getItem('image') :"";
        if (dataProfile) {
            setProfile({ ...dataProfile, gender: "", image:image??"" });
        }
    }, [dataProfile])

    const handleEditAbout = useCallback(() => setIsEditAbout(!isEditAbout), [setIsEditAbout,isEditAbout]);

    const handleEditInterest = useCallback(() => setIsEditInterest(!isEditInterest), [setIsEditInterest, isEditInterest]);

    const handleOpenFile = useCallback(() => inputFileRef.current?.click(), [inputFileRef]);
    const handleUploadFile = useCallback((e:SyntheticEvent<HTMLInputElement>)=>{
        const file = e.currentTarget?.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file);
            setProfile((prev) => ({ ...prev, image: url }))
            localStorage.setItem('image', url);
        }
    },[setProfile])
    const handleOnChangeInputText = useCallback((val: string, key: string) => {
        setProfile((prev) => ({ ...prev, [key]: val }))
    }, [setProfile])

    const handleOnChangeChip = useCallback((val: string[]) => {
        setProfile((prev) => ({ ...prev, interests: val }))
    }, [setProfile])

    const isInterestEmpty = useMemo(() => !profile?.interests.length, [profile]);

    const isAboutEmpty = useMemo(() => {
        return !profile?.birthday && !profile?.height && !profile?.horoscope && !profile?.name && !profile?.weight && !profile?.zodiac
    }, [profile])

    const isLoading = useMemo(() => isLoadingGetProfile || isLoadingUpdate || isFetchingProfile, [isLoadingGetProfile, isFetchingProfile, isLoadingUpdate]);

    console.log(profile.interests);

    return {
        data: { profile, isLoading, isEditInterest, inputFileRef, isAboutEmpty, isInterestEmpty, isEditAbout },
        method: { handleEditAbout, updateProfile, handleOpenFile, handleOnChangeInputText, handleEditInterest, handleOnChangeChip, handleUploadFile }
    }
}