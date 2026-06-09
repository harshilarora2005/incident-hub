import { NavLink } from "react-router";
import {
    Home,
    AlertTriangle,
    Users,
    Shield,
    FileText,
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
} from "@/components/ui/sidebar";

import useAuth from "../hooks/useAuth";

const mainItems = [
    {
        title: "Dashboard",
        url: "/",
        icon: Home,
    },
    {
        title: "Incidents",
        url: "/incidents",
        icon: AlertTriangle,
    },
    {
        title: "Reports",
        url: "/reports",
        icon: FileText,
    },
];

const managementItems = [
    {
        title: "Users",
        url: "/users",
        icon: Users,
    },
    {
        title: "Roles",
        url: "/roles",
        icon: Shield,
    },
];

export function AppSidebar() {
    const { user } = useAuth();

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex flex-col px-2 py-3">
                    <h2 className="text-lg font-bold">
                        IncidentHub
                    </h2>

                    <p className="text-xs text-muted-foreground">
                        Administration
                    </p>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Main
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink
                                            to={item.url}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "font-medium"
                                                    : ""
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
                    <SidebarGroupLabel>
                        Management
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {managementItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink
                                            to={item.url}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "font-medium"
                                                    : ""
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
                <div className="rounded-lg border p-3">
                    <p className="font-medium">
                        {user?.name}
                    </p>

                    <p className="text-xs text-muted-foreground truncate">
                        {user?.email}
                    </p>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}