import { ChevronRight, User, LogOut } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
export default function NavUser({ user, open }) {
    const {logout} = useAuth();
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
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="mx-1 mb-2 cursor-pointer">
                    {open ? (
                        <div className="flex items-center gap-3 rounded-xl bg-[#FAFAF7] px-3 py-2.5 hover:bg-[#ede8e0] transition-colors">
                            <div className="flex h-9 w-9 shrink-0 overflow-hidden items-center justify-center rounded-full bg-[#C4714A]">
                                {user?.avatarUrl ? (
                                    <img
                                        src={user.avatarUrl}
                                        alt={user.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xs font-medium text-white">
                                        {user?.name?.slice(0, 2).toUpperCase()}
                                    </span>
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-[#111D28]">
                                    {user?.name}
                                </p>

                                <p className="truncate text-xs text-[#8A9BAA]">
                                    {user?.email}
                                </p>
                            </div>

                            <ChevronRight
                                size={15}
                                className="shrink-0 text-[#8A9BAA]"
                            />
                        </div>
                    ) : (
                        <div className="flex h-8 w-8 overflow-hidden items-center justify-center rounded-full bg-[#C4714A]">
                            {user?.avatarUrl ? (
                                <img
                                    src={user.avatarUrl}
                                    alt={user.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-xs font-medium text-white">
                                    {user?.name?.slice(0, 2).toUpperCase()}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-56"
                align="end">
                <DropdownMenuLabel>
                    My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem  onClick={()=>navigate("/account")}>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}
                className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4"/>
                    <span>Logout</span> 
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}