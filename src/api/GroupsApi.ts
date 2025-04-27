import { ApiMethods } from "./ApiMethods";
import { ENDPOINTS } from "./EndPoints";
import { GroupDto, JoinGroupDto } from "../models";

export const createGroup = async (groupRequestData: GroupDto): Promise<GroupDto> => {
    return ApiMethods.post<GroupDto>(ENDPOINTS.GROUPS.CREATE_GROUP, groupRequestData);
}

export const joinGroup = async (joinGroupData: JoinGroupDto): Promise<GroupDto> => {
    return ApiMethods.post<GroupDto>(ENDPOINTS.GROUPS.JOIN_GROUP, joinGroupData);
}
