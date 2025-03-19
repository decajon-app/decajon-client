// const BASE_URL = 'http://localhost:8080/api';
const BASE_URL = 'http://10.0.2.2:8080/api';

export const ENDPOINTS = {
    AUTH: {
        REGISTER_USER: `${BASE_URL}/auth/register`,
        LOGIN_USER: `${BASE_URL}/auth/login`
    },

    GROUPS: {
        CREATE_GROUP: `${BASE_URL}/groups`,
    }
}
