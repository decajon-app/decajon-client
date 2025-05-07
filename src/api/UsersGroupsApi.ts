import { ApiMethods } from "./ApiMethods";
import { ENDPOINTS } from "./EndPoints";

export const getRoleByUserIdAndGroupId = async (userId: number, groupId: number): Promise<{ role: string }> => {
    return ApiMethods.get<{ role: string }>(ENDPOINTS.USERS_GROUPS.GET_USER_PERMISSIONS(userId, groupId));
}
