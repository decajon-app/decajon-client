export interface UserDto {
    id: number,
    firstName: string,
    lastName: string,
    email: string
}

export interface UserRequestDto {
    email: string
    password: string,
    firstName: string,
    lastName: string
}