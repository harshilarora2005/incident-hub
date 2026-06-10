/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { getCurrentUser } from "../api/authApi";
import { logoutUser } from "../api/authApi";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        try {
            const userData = await getCurrentUser();
            setUser(userData);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
        } finally {
            setUser(null);
        }
    };
    useEffect(() => {
        loadUser();
    }, []);

    const value = {
        user,
        setUser,
        loading,
        isAuthenticated: !!user,
        refreshUser: loadUser,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}