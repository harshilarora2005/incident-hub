import {
    Home,
    AlertTriangle,
    Users,
    Shield,
    FileText,
} from "lucide-react";
import NavUser from "./NavUser";
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
                <NavUser user={user} open={open}/>
            </SidebarFooter>
        </Sidebar>
    );
}