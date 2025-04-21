// const BASE_URL = 'http://localhost:8080/api';
const BASE_URL = 'http://192.168.1.83:8080/api'; //IP manuel localhost

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
        JOIN_GROUP: `${BASE_URL}/users-groups`
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
