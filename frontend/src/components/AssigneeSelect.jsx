import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from "@/components/ui/combobox";

import { useState, useEffect, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllUsers } from "../api/userApi";

export default function AssigneeSelect({value = [],onChange,}) {
    const anchor = useComboboxAnchor();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await getAllUsers();
                setUsers(result);
            } catch (err) {
                console.error(err);
                setError("Failed to load users.");
            }
        };

        fetchUsers();
    }, []);
    const userMap = useMemo(
        () =>
            Object.fromEntries(
                users.map((user) => [String(user.id), user])
            ),
        [users]
    );

    if (error) {
        return (
            <p className="text-sm text-red-500">
                {error}
            </p>
        );
    }

    return (
        <Combobox
            multiple
            autoHighlight
            items={users.map((user) => ({
                label: user.name,
                value: String(user.id),
            }))}
            value={value.map(String)}
            onValueChange={(values) =>
                onChange(values.map(Number))
            }
        >
            <ComboboxChips
                ref={anchor}
                className="w-full"
            >
                <ComboboxValue>
                    {(values) => (
                        <di>
                            {values.map((id) => {
                                const user = userMap[id];

                                if (!user) return null;

                                return (
                                    <ComboboxChip key={user.id}>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-5 w-5">
                                                <AvatarImage
                                                    src={user.avatarUrl}
                                                />

                                                <AvatarFallback className="text-[10px]">
                                                    {user.name
                                                        .split(" ")
                                                        .map(
                                                            (n) => n[0]
                                                        )
                                                        .join("")
                                                        .slice(0, 2)
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>

                                            {user.name}
                                        </div>
                                    </ComboboxChip>
                                );
                            })}

                            <ComboboxChipsInput />
                        </di>
                    )}
                </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>
                    No users found.
                </ComboboxEmpty>

                <ComboboxList>
                    {(item) => {
                        const user =
                            userMap[item.value];

                        return (
                            <ComboboxItem
                            className="border-transparent focus:border-[#C4714A] focus:ring-[#C4714A]/20"
                                key={item.value}
                                value={item.value}
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-7 w-7">
                                        <AvatarImage
                                            src={user?.avatarUrl}
                                        />

                                        <AvatarFallback>
                                            {user?.name
                                                ?.split(" ")
                                                .map(
                                                    (n) => n[0]
                                                )
                                                .join("")
                                                .slice(0, 2)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <p className="text-sm">
                                            {user?.name}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                            </ComboboxItem>
                        );
                    }}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}