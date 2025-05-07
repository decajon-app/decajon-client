import { ApiMethods } from "./ApiMethods";
import { ENDPOINTS } from "./EndPoints";
import { GroupDto, GroupMemberDto, JoinGroupDto } from "../models";

export const createGroup = async (groupRequestData: GroupDto): Promise<GroupDto> => {
    return ApiMethods.post<GroupDto>(ENDPOINTS.GROUPS.CREATE_GROUP, groupRequestData);
}

export const joinGroup = async (joinGroupData: JoinGroupDto): Promise<GroupDto> => {
    return ApiMethods.post<GroupDto>(ENDPOINTS.GROUPS.JOIN_GROUP, joinGroupData);
}

export const getGroupsFromUser = async (userId: number): Promise<GroupDto[]> => {
    return ApiMethods.get<GroupDto[]>(ENDPOINTS.GROUPS.GET_GROUPS_FROM_USER + `/${userId}`);
}

export const getGroupMembersCount = async (groupId: number): Promise<number> => {
    return ApiMethods.get<number>(ENDPOINTS.GROUPS.GET_MEMBERS_COUNT(groupId));
}

export const getGroupMembersList = async (groupId: number): Promise<GroupMemberDto[]> => {
    return ApiMethods.get<GroupMemberDto[]>(ENDPOINTS.GROUPS.GET_MEMBERS_LIST(groupId));
}

export const deleteGroupMember = async (groupId: number, userId: number): Promise<string> => {
    return ApiMethods.delete<string>(ENDPOINTS.USERS_GROUPS.DELETE_GROUP_MEMBER(groupId, userId));
}

export const deleteGroup = async (groupId: number): Promise<void> => {
    return ApiMethods.delete<void>(ENDPOINTS.GROUPS.DELETE_GROUP(groupId));
}