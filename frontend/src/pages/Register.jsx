import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const onSubmit = async (data) => {
        console.log(data);
    };
     const handleToggle = () => {
        setShowPassword((prev) => !prev);
    };
    return (
        <div className="min-h-screen bg-[#21313F] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#F7F8F6] backdrop-blur-md rounded-3xl shadow-xl p-8">
            <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
                Create Account
            </h1>
            <p className="text-gray-500 mt-2">
                Join us and start your journey
            </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
                </label>
                <input
                {...register("name", {
                    required: "Name is required",
                    minLength: {
                    value: 3,
                    message: "At least 3 characters",
                    },
                })}
                placeholder="Enter Name.."
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#21313F] transition"
                />
                {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                </p>
                )}
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
                </label>
                <input
                type="email"
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                    },
                })}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#21313F] transition"
                />
                {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                </p>
                )}
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
                </label>
                <input
                type={showPassword ? 'text' : 'password'} 
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                    value: 8,
                    message: "Minimum 8 characters",
                    },
                })}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#21313F] transition"
                />
                <button
                type="button" // Prevents form submission when clicked
                onClick={handleToggle}
                style=''
                aria-label={showPassword ? "Hide password" : "Show password"}
                >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-[#877D7A] text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform"
            >
                {isSubmitting ? "Creating..." : "Create Account"}
            </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?
            <span className="text-[#7F8084] font-medium cursor-pointer ml-1">
                Sign In
            </span>
            </p>
        </div>
        </div>
    );
}