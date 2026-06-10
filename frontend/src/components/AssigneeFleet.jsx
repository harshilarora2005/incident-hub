import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarImage,
    AvatarGroupCount
} from "@/components/ui/avatar";

export default function AssigneeFleet({ assignees = [], collapseNum }) {
    return (
        <AvatarGroup>
            {assignees.map((assignee) => (
                <Avatar key={assignee.id}>
                    <AvatarImage
                        src={assignee.avatarUrl}
                        alt={assignee.name}
                    />
                    <AvatarFallback className="bg-[#C4714A] text-white text-xs font-medium">
                        {assignee?.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            ))}
        </AvatarGroup>
    );
}