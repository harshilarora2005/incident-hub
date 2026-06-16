import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TopAssignees({ assignees }) {
    const max = Math.max(...assignees.map(a => a.total), 1);

    if (assignees.length === 0) {
        return (
            <p className="text-[12px]" style={{ color: "#8A9BAA" }}>No assignees yet</p>
        );
    }

    return (
        <div className="space-y-3">
            {assignees.map(({ user, total, resolved }) => {
                const initials = (user.name ?? "?")
                    .split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
                return (
                    <div key={user.id} className="flex items-center gap-2.5">
                        <Avatar className="h-6 w-6 shrink-0">
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback
                                className="text-[9px] font-semibold"
                                style={{ background: "#C4714A", color: "#FAFAF7" }}
                            >
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between mb-1">
                                <span className="text-[12px] font-medium truncate"
                                    style={{ color: "#111D28" }}>
                                    {user.name}
                                </span>
                                <span className="text-[11px] tabular-nums shrink-0 ml-2"
                                    style={{ color: "#8A9BAA" }}>
                                    {resolved}/{total}
                                </span>
                            </div>
                            <div className="h-1 rounded-full overflow-hidden"
                                style={{ background: "rgba(138,155,170,0.15)" }}>
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${(total / max) * 100}%`,
                                        background: "#4CAF82",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}