//import { DECAJON_API as BASE_URL } from '@env';

 const BASE_URL = 'http://10.0.2.2:8080/api';

export const ENDPOINTS = {
    AUTH: {
        REGISTER_USER: `${BASE_URL}/auth/register`,
        LOGIN_USER: `${BASE_URL}/auth/login`
    },

    USERS: {
        GET_USER: `TBD`,
    },

    GROUPS: {
        CREATE_GROUP: `${BASE_URL}/groups`,
        JOIN_GROUP: `${BASE_URL}/users-groups`,
        GET_GROUPS_FROM_USER: `${BASE_URL}/groups/users`,
        GET_MEMBERS_COUNT: (groupId: number) => `${BASE_URL}/groups/${groupId}/members/count`,
        GET_MEMBERS_LIST: (groupId: number) => `${BASE_URL}/groups/${groupId}/members`,
        DELETE_GROUP: (groupId: number) => `${BASE_URL}/groups/${groupId}`
    },

    USERS_GROUPS: {
        GET_USER_PERMISSIONS: (userId: number, groupId: number) => `${BASE_URL}/users-groups/user/${userId}/group/${groupId}/permissions`,
        DELETE_GROUP_MEMBER: (groupId: number, userId: number) => `${BASE_URL}/users-groups/group/${groupId}/user/${userId}`
    },

    REPERTOIRES: {
        CREATE_REPERTOIRE: `${BASE_URL}/repertoires/add`,
        GET_REPERTOIRE: `${BASE_URL}/repertoires/group`,
        GET_SONG: (repertoireId: number) => `${BASE_URL}/repertoires/${repertoireId}/song-details`,
        REVIEW_CARD: `${BASE_URL}/repertoires/review-card`,
        SUGGESTIONS_PRACTICE: `${BASE_URL}/repertoires/suggestions`,
    },

    SONGS: {
        GET_SONG: `TBD`
    }
}
