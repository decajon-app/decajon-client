import React, { createContext, useState, useEffect } from 'react';
import { getToken, removeToken, saveToken } from '../storage/AuthStorage';


type AuthContextType = {
    userToken: string | null;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
}


const defaultValue: AuthContextType = {
    userToken: null,
    login: async () => {},
    logout: async () => {}
};


export const AuthContext = createContext<AuthContextType>(defaultValue);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userToken, setUserToken] = useState<string | null>(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await getToken();
            if (token) {
                setUserToken(token)
            };
        }
        checkLoginStatus();
    }, []);

    const login = async (token: string) => {
        await saveToken(token);
        setUserToken(token);
    }

    const logout = async () => {
        await removeToken();
        setUserToken(null);
    }

    return (
        <AuthContext.Provider value={{ userToken, login, logout }}>
            { children }
        </AuthContext.Provider>
    );
}
