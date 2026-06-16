import { Outlet } from "react-router";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { NotificationBell } from "@/components/NotificationBell";

export default function DashboardLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <SidebarTrigger />
                    <NotificationBell />
                </header>
                <main className="flex-1 min-w-0 p-4">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}