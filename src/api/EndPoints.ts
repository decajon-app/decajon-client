//import { DECAJON_API as BASE_URL } from '@env';

const BASE_URL = 'http://192.168.1.86:8080/api';

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
        GET_GROUPS_FROM_USER: `${BASE_URL}/groups/users`
    },

    REPERTOIRES: {
        CREATE_REPERTOIRE: `TBD`,
        GET_REPERTOIRE: `TBD`,
    },

    SONGS: {
        CREATE_SONG: `TBD`,
        GET_SONG: `TBD`,
    }
}
