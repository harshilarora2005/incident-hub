import useAuth from "./useAuth";

export function useRole() {
    const { user } = useAuth();
    return {
        role: user?.roles,
        isAdmin: user?.roles.includes("ADMIN"),
        isManager: user?.roles.includes("MANAGER")
    };
}