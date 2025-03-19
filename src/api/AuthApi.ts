import { ApiMethods } from "./ApiMethods";
import { ENDPOINTS } from "./EndPoints";
import { UserRequestDto, UserDto } from "../models";

export const registerUser = async (userRequestData: UserRequestDto): Promise<UserDto> => {
    return ApiMethods.post<UserDto>(ENDPOINTS.AUTH.REGISTER_USER, userRequestData);
}