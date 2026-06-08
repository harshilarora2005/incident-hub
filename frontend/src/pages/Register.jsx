import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { registerUser } from "../api/authApi";
import useAuth from "../hooks/useAuth";
import GoogleIcon from "../assets/GoogleIcon";
export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const { refreshUser } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            await registerUser(data);
            await refreshUser();
            toast.success("Account created successfully!");
            await new Promise((resolve) => setTimeout(resolve, 2500));
            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to create account"
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#111D28] flex items-center justify-center p-6">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-32 -left-32 w-125 h-125rounded-full bg-[#C4714A] opacity-[0.06] blur-3xl" />
                <div className="absolute bottom-0 right-0 w-100 h-100
                rounded-full bg-[#1C2B3A] opacity-40 blur-3xl" />
            </div>

            <div className="relative w-full max-w-md bg-[#FAFAF7] rounded-3xl shadow-2xl p-10">
                <div className="mb-8">
                    <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#C4714A] mb-2">
                        Get started
                    </p>
                    <h1 className="font-serif text-[2.1rem] leading-tight font-normal text-[#1C2B3A] mb-1">
                        Create your<br />account.
                    </h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold tracking-wide text-[#1C2B3A] mb-1.5">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 3,
                                    message: "Name must be at least 3 characters",
                                },
                            })}
                            className={`w-full px-4 py-3 rounded-xl border bg-[#F5F0E8] text-[#1C2B3A] text-sm placeholder:text-[#C4B9AE] outline-none transition-all duration-150
                                ${errors.name
                                    ? "border-red-400 ring-2 ring-red-100"
                                    : "border-[#DDD8CE] focus:border-[#1C2B3A] focus:bg-white focus:ring-2 focus:ring-[#1C2B3A]/10"
                                }`}
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-500 font-medium">{errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-semibold tracking-wide text-[#1C2B3A] mb-1.5">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                            className={`w-full px-4 py-3 rounded-xl border bg-[#F5F0E8] text-[#1C2B3A] text-sm placeholder:text-[#C4B9AE] outline-none transition-all duration-150
                                ${errors.email
                                    ? "border-red-400 ring-2 ring-red-100"
                                    : "border-[#DDD8CE] focus:border-[#1C2B3A] focus:bg-white focus:ring-2 focus:ring-[#1C2B3A]/10"
                                }`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-semibold tracking-wide text-[#1C2B3A] mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Min. 8 characters"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters",
                                    },
                                })}
                                className={`w-full px-4 py-3 pr-11 rounded-xl border bg-[#F5F0E8] text-[#1C2B3A] text-sm placeholder:text-[#C4B9AE] outline-none transition-all duration-150
                                    ${errors.password
                                        ? "border-red-400 ring-2 ring-red-100"
                                        : "border-[#DDD8CE] focus:border-[#1C2B3A] focus:bg-white focus:ring-2 focus:ring-[#1C2B3A]/10"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A9BAA] hover:text-[#1C2B3A] transition-colors"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-500 font-medium">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-1 py-3 rounded-xl bg-[#1C2B3A] hover:bg-[#111D28] text-white text-sm font-semibold tracking-wide shadow-lg shadow-[#1C2B3A]/25 transition-all duration-150 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Creating account…" : "Create Account"}
                    </button>
                </form>
                <div className="flex items-center gap-3 my-5">
                    <span className="flex-1 h-px bg-[#DDD8CE]" />
                    <span className="text-[0.7rem] font-semibold tracking-widest uppercase text-[#8A9BAA]">or</span>
                    <span className="flex-1 h-px bg-[#DDD8CE]" />
                </div>
                <button
                    type="button"
                    onClick={() => {
                    window.location.href =
                        "http://localhost:8080/oauth2/authorization/google";
                    }}
                    className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-[#DDD8CE] bg-white hover:bg-[#F5F0E8] hover:border-[#C4B9AE] text-[#1C2B3A] text-sm font-medium shadow-sm transition-all duration-150"
                >
                    <GoogleIcon/>
                    Continue with Google
                </button>
                <p className="text-center text-xs text-[#8A9BAA] mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-[#C4714A] font-semibold hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}