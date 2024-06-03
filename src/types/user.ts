type UserDto = {
    name:string,
    birthday:string,
    height:number,
    weight:number,
    interest: string[]
}

type UserResponse = {
    email: string,
    username: string,
    name: string,
    birthday: string,
    horoscope: string,
    zodiac: string,
    height: number,
    weight: number,
    interests: Array<string>
}

export type {
    UserDto,
    UserResponse
}