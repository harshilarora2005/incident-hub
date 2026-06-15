import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function AssigneeFleet({assignees = [],collapseNum,}) {
    const visibleAssignees = collapseNum ? assignees.slice(0, collapseNum): assignees;

    const hiddenCount = collapseNum ? Math.max(0, assignees.length - collapseNum): 0;
    return (
        <AvatarGroup>
            {visibleAssignees.map((assignee) => (
                <Tooltip key={assignee.id}>
                    <TooltipTrigger>
                        <Avatar>
                            <AvatarImage
                                src={assignee.avatarUrl}
                                alt={assignee.name}
                            />
                            <AvatarFallback className="bg-[#C4714A] text-[#FAFAF7] text-xs font-medium">
                                {(assignee?.name ?? "?")
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{assignee.name}</p>
                    </TooltipContent>
                </Tooltip>
            ))}
            {hiddenCount > 0 && (
                <AvatarGroupCount>
                    +{hiddenCount}
                </AvatarGroupCount>
            )}
        </AvatarGroup>
    );
}

export function UserRow({ user }) {
    if (!user) return null;
    const initials = (user.name ?? "?")
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    return (
        <div className="flex items-center gap-2.5">
            <Avatar className="h-7 w-7">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback
                    className="text-[10px] font-semibold"
                    style={{ background: "#C4714A", color: "#FAFAF7" }}
                >
                    {initials}
                </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
                <p className="text-[13px] font-medium text-[#111D28] truncate">{user.name}</p>
                <p className="text-[11px] text-[#8A9BAA] truncate">{user.email}</p>
            </div>
        </div>
    );
}