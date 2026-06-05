/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { getCurrentUser } from "../api/authApi";

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

    useEffect(() => {
        loadUser();
    }, []);

    const value = {
        user,
        setUser,
        loading,
        isAuthenticated: !!user,
        refreshUser: loadUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}