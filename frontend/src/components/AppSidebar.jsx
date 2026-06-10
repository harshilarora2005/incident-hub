import {
    Home,
    AlertTriangle,
    Users,
    Shield,
    FileText,
    ChevronRight,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";

const mainItems = [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "Incidents", url: "/incidents", icon: AlertTriangle },
    { title: "Reports", url: "/reports", icon: FileText },
];

const managementItems = [
    { title: "Users", url: "/users", icon: Users },
    { title: "Roles", url: "/roles", icon: Shield },
];

export function AppSidebar() {
    const { user } = useAuth();
    const { open } = useSidebar();
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className={`flex items-center px-2 py-3 ${open ? "gap-2.5" : "justify-center"}`}>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C4714A] text-[#FAFAF7]">
                        <AlertTriangle size={16} />
                    </div>
                    {open && (
                        <div className="flex flex-col">
                            <h2 className="text-sm font-medium text-[#F5F0E8] leading-tight">
                                IncidentHub
                            </h2>
                            <p className="text-xs text-[#8A9BAA]">Administration</p>
                        </div>
                    )}
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    {open && (
                        <SidebarGroupLabel>Main</SidebarGroupLabel>
                    )}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink
                                            to={item.url}
                                            className={({ isActive }) =>
                                                isActive ? "font-medium" : ""
                                            }
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    {open && (
                        <SidebarGroupLabel>Management</SidebarGroupLabel>
                    )}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {managementItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink
                                            to={item.url}
                                            className={({ isActive }) =>
                                                isActive ? "font-medium" : ""
                                            }
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <div className="mx-1 mb-2">
                    {open ? (
                        <div className="flex items-center gap-3 rounded-xl bg-[#FAFAF7] px-3 py-2.5 cursor-pointer hover:bg-[#ede8e0] transition-colors">
                            <div className="flex h-9 w-9 shrink-0 overflow-hidden items-center justify-center rounded-full bg-[#C4714A]">
                                {user?.avatarUrl ? (
                                    <img
                                        src={user.avatarUrl}
                                        alt={user.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    user?.name?.slice(0, 2).toUpperCase()
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-[#111D28] leading-tight">
                                    {user?.name}
                                </p>
                                <p className="truncate text-xs text-[#8A9BAA]">
                                    {user?.email}
                                </p>
                            </div>
                            <ChevronRight size={15} className="shrink-0 text-[#8A9BAA]" />
                        </div>
                    ) : (
                        <div className="flex h-8 w-8 overflow-hidden items-center justify-center rounded-full bg-[#C4714A] text-xs font-medium text-[#FAFAF7] cursor-pointer">
                        {user?.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt={user.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            user?.name?.slice(0, 2).toUpperCase()
                        )}
                    </div>
                    )}
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}