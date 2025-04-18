import { ApiMethods } from "./ApiMethods";
import { ENDPOINTS } from "./EndPoints";
import { GroupDto } from "../models";

export const createGroup = async (groupRequestData: GroupDto): Promise<GroupDto> => {
    return ApiMethods.post<GroupDto>(ENDPOINTS.GROUPS.CREATE_GROUP, groupRequestData);
}

