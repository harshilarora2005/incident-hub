import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { loginUser } from "../api/authApi";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            await toast.promise(
                loginUser(data),
                {
                    loading: "Signing you in...",
                    success: "Welcome back!",
                    error: (error) =>
                        error.response?.data?.message ||
                        "Invalid email or password",
                }
            );

            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-[#21313F] flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-[#F7F8F6] rounded-3xl shadow-xl p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Log In
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Welcome back
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="name@example.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message:
                                        "Enter a valid email address",
                                },
                            })}
                            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#21313F]"
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="••••••••"
                                {...register("password", {
                                    required:
                                        "Password is required",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Password must be at least 8 characters",
                                    },
                                })}
                                className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#21313F]"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        (prev) => !prev
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-2xl bg-[#877D7A] text-white font-semibold shadow-lg transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSubmitting
                            ? "Logging In..."
                            : "Log In"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?

                    <Link
                        to="/register"
                        className="ml-1 text-[#7F8084] font-medium hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );

    }
