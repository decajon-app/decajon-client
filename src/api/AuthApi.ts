import { ApiMethods } from "./ApiMethods";
import { ENDPOINTS } from "./EndPoints";
import { UserRequestDto, UserDto, LoginRequestDto, LoginResponseDto } from "../models";

export const registerUser = async (userRequestData: UserRequestDto): Promise<UserDto> => {
    return ApiMethods.post<UserDto>(ENDPOINTS.AUTH.REGISTER_USER, userRequestData);
}

export const login = async (loginRequestData: LoginRequestDto): Promise<LoginResponseDto> => {
    return ApiMethods.post<LoginResponseDto>(ENDPOINTS.AUTH.LOGIN_USER, loginRequestData);
}