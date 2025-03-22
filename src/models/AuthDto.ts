export interface UserRequestDto {
    email: string
    password: string,
    firstName: string,
    lastName: string
}

export interface LoginRequestDto {
    email: string,
    password: string
}

export interface LoginResponseDto {
    token: string,
    id: number,
    email: string,
    firstName: string,
    lastName: string
}