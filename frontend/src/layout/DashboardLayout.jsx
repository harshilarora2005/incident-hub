import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar"
export default function DashboardLayout() {
    return (
        <>
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1">
                <SidebarTrigger />
                <Outlet />
            </main>
        </SidebarProvider>
        </>
    );
}