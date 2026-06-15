import {
    Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput,
    ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList,
    ComboboxValue, useComboboxAnchor,
} from "@/components/ui/combobox";
import { useState, useEffect, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllUsers } from "../api/userApi";
import { UserRow } from "./AssigneeFleet";

function UserAvatar({ user }) {
    const initials = (user?.name ?? "?")
        .split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
    return (
        <Avatar className="h-4 w-4 shrink-0">
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback
                className="text-[9px] font-semibold"
                style={{ background: "#C4714A", color: "#FAFAF7" }}
            >
                {initials}
            </AvatarFallback>
        </Avatar>
    );
}

export default function AssigneeSelect({ value = [], onChange, single = false }) {
    const anchor = useComboboxAnchor();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllUsers()
            .then(setUsers)
            .catch(() => setError("Failed to load users."));
    }, []);

    const userMap = useMemo(
        () => Object.fromEntries(users.map((u) => [String(u.id), u])),
        [users]
    );

    if (error) return <p className="text-[12px] text-red-500">{error}</p>;

    return (
        <Combobox
            multiple={!single}
            autoHighlight
            items={users.map((u) => ({ label: u.name, value: String(u.id) }))}
            value={value.map(String)}
            onValueChange={(vals) =>{
                console.log("NEW VALUES:", vals);
                onChange(single ? Number(vals[0]) : vals.map(Number));
            }}
        >
            <ComboboxChips ref={anchor} className="w-full min-h-8 text-[12px]">
                <ComboboxValue>
                    {(values) => (
                        <div className="flex flex-wrap gap-1">
                            {values.map((id) => {
                                const user = userMap[id];
                                if (!user) return null;
                                return (
                                    <ComboboxChip
                                        key={id}
                                        className="flex items-center gap-1.5 text-[11px] px-1.5 py-0.5"
                                    >
                                        <UserAvatar user={user} />
                                        {user.name}
                                    </ComboboxChip>
                                );
                            })}
                            <ComboboxChipsInput
                                placeholder={values.length ? "" : "Add assignee..."}
                                className="text-[12px]"
                            />
                        </div>
                    )}
                </ComboboxValue>
            </ComboboxChips>

            <ComboboxContent anchor={anchor} className="z-9999">
                <ComboboxEmpty>No users found.</ComboboxEmpty>
                <ComboboxList>
                    {(item) => {
                        const user = userMap[item.value];
                        return (
                            <ComboboxItem
                                key={item.value}
                                value={item.value}
                                className="focus:bg-[rgba(196,113,74,0.08)]"
                            >
                                <UserRow user={user} />
                            </ComboboxItem>
                        );
                    }}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}