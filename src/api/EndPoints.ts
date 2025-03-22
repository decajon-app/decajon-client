// const BASE_URL = 'http://localhost:8080/api';
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
        GET_GROUP: `TBD`
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
