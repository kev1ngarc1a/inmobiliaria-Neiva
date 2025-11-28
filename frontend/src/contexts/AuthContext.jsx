import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../services/AuthService';

const authService = new AuthService();
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(authService.currentUser());

    // Mantener sincronizado con localStorage
    useEffect(() => {
        setUser(authService.currentUser());
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
