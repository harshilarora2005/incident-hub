import { Bell } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationItem } from "./NotificationItem";
import { useNotifications } from "../hooks/useNotifications";

export function NotificationBell() {
    const { notifications, unreadCount, markRead, markAllRead } = useNotifications();

    return (
        <Popover>
            <PopoverTrigger>
                <Button variant="ghost" size="icon" className="relative h-8 w-8">
                    <Bell size={16} style={{ color: "#8A9BAA" }} />
                    {unreadCount > 0 && (
                        <span
                            className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                            style={{ background: "#C4714A", color: "#FAFAF7" }}
                        >
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent align="end" className="w-80 p-0 overflow-hidden rounded-xl shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3" style={{ background: "#FAFAF7" }}>
                    <p className="text-[13px] font-semibold" style={{ color: "#111D28" }}>
                        Notifications
                        {unreadCount > 0 && (
                            <span className="ml-2 text-[11px] font-medium" style={{ color: "#C4714A" }}>
                                {unreadCount} unread
                            </span>
                        )}
                    </p>
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllRead}
                            className="text-[11px] hover:underline"
                            style={{ color: "#C4714A" }}
                        >
                            Mark all read
                        </button>
                    )}
                </div>

                <Separator style={{ background: "rgba(138,155,170,0.15)" }} />

                {/* List */}
                <ScrollArea className="max-h-[360px]">
                    {notifications.length === 0 ? (
                        <div className="py-10 text-center">
                            <Bell size={20} className="mx-auto mb-2 opacity-20" />
                            <p className="text-[12px]" style={{ color: "#8A9BAA" }}>No notifications yet</p>
                        </div>
                    ) : (
                        <div className="divide-y" style={{ borderColor: "rgba(138,155,170,0.1)" }}>
                            {notifications.map((n) => (
                                <NotificationItem key={n.id} notification={n} onMarkRead={markRead} />
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
}