import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
export default function Dashboard() {
    const navigate = useNavigate();
    const {
        user,
        loading
    } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-screen">
                Loading...
            </div>
        );
    }
    return (
        <div className="p-6">
            <div className="max-w-5xl mx-auto">
                <div className="bg-[#F7F8F6] rounded-3xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Dashboard
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Welcome back, {user?.name}
                    </p>

                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        <div className="p-5 rounded-2xl border bg-white">
                            <p className="text-sm text-gray-500">
                                Name
                            </p>

                            <p className="font-semibold text-gray-800 mt-1">
                                {user?.name}
                            </p>
                        </div>

                        <div className="truncate p-5 rounded-2xl border bg-white">
                            <p className="text-sm text-gray-500">
                                Email
                            </p>

                            <p className="truncate font-semibold text-gray-800 mt-1">
                                {user?.email}
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl border bg-white">
                            <p className="text-sm text-gray-500">
                                Role(s)
                            </p>

                            <p className="font-semibold text-gray-800 mt-1">
                                {user?.roles?.join(", ")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}