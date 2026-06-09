import { useNavigate } from "react-router";
import { toast } from "sonner";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
    const {
        user,
        loading,
        logout,
    } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logged out successfully");
            navigate("/login");
        } catch {
            toast.error("Failed to logout");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#21313F] text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#21313F] p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-[#F7F8F6] rounded-3xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Dashboard
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Welcome back, {user?.name}
                    </p>

                    <div className="mt-8 grid gap-4">
                        <div className="p-4 rounded-2xl border border-gray-200">
                            <p className="text-sm text-gray-500">
                                Name
                            </p>

                            <p className="font-semibold text-gray-800">
                                {user?.name}
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl border border-gray-200">
                            <p className="text-sm text-gray-500">
                                Email
                            </p>

                            <p className="font-semibold text-gray-800">
                                {user?.email}
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl border border-gray-200">
                            <p className="text-sm text-gray-500">
                                Role(s)
                            </p>

                            <p className="font-semibold text-gray-800">
                                {user?.roles?.join(", ")}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                        <button
                            className="px-5 py-3 rounded-2xl bg-[#877D7A] text-white font-medium hover:opacity-90 transition"
                        >
                            Create Incident
                        </button>

                        <button
                            onClick={handleLogout}
                            className="px-5 py-3 rounded-2xl border border-red-300 text-red-600 font-medium hover:bg-red-50 transition">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}