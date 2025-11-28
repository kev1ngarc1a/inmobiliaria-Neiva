import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const authService = new AuthService();
    const [user, setUser] = useState(authService.currentUser());

    useEffect(() => {
        const syncUser = () => {
            setUser(authService.currentUser());
        };

        // Por si cambia en otra pestaña
        window.addEventListener("storage", syncUser);

        return () => {
            window.removeEventListener("storage", syncUser);
        };
    }, []);

    const login = (payload) => {
        const u = authService.login(payload);
        setUser(u);
        return u;
    };

    const register = (payload) => {
        const u = authService.register(payload);
        setUser(u);
        return u;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
