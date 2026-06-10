import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar";
export default function AssigneeFleet({assignees = [],collapseNum,}) {
    const visibleAssignees = collapseNum ? assignees.slice(0, collapseNum): assignees;

    const hiddenCount = collapseNum ? Math.max(0, assignees.length - collapseNum): 0;
    return (
        <AvatarGroup>
            {visibleAssignees.map((assignee) => (
                <Avatar key={assignee.id}>
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
            ))}

            {hiddenCount > 0 && (
                <AvatarGroupCount>
                    +{hiddenCount}
                </AvatarGroupCount>
            )}
        </AvatarGroup>
    );
}