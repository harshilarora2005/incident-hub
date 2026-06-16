import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function NotificationItem({ notification, onMarkRead }) {
    const initials = (notification.senderName ?? "?")
        .split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

    return (
        <div
            onClick={() => !notification.isRead && onMarkRead(notification.id)}
            className="flex gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-[rgba(138,155,170,0.06)]"
            style={{ background: notification.isRead ? "transparent" : "rgba(196,113,74,0.04)" }}
        >
            <Avatar className="h-7 w-7 shrink-0 mt-0.5">
                <AvatarImage src={notification.senderAvatar} />
                <AvatarFallback className="text-[10px] font-semibold" style={{ background: "#C4714A", color: "#FAFAF7" }}>
                    {initials}
                </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <p className="text-[13px] font-medium leading-snug" style={{ color: "#111D28" }}>
                        {notification.title}
                    </p>
                    {!notification.isRead && (
                        <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#C4714A" }} />
                    )}
                </div>
                <p className="text-[12px] mt-0.5 line-clamp-2" style={{ color: "#8A9BAA" }}>
                    {notification.message}
                </p>
                <p className="text-[11px] mt-1" style={{ color: "rgba(138,155,170,0.7)" }}>
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </p>
            </div>
        </div>
    );
}