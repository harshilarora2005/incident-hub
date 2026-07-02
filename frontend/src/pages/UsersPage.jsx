import { useState, useEffect } from "react";
import { UserPlus, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllUsers } from "../api/userApi";
import { ROLE_LABELS } from "../assets/constants/roleLabels";
import { InviteUserDialog } from "../components/users/InviteUserDialog";
import { colors } from "../assets/constants/formStyles";
import { format } from "date-fns";
import { useRole } from "../hooks/useRole";

function RoleBadge({ role }) {
    const cfg = ROLE_LABELS[role] ?? { label: role, bg: "rgba(138,155,170,0.12)", color: "#8A9BAA" };
    return (
        <span
            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ background: cfg.bg, color: cfg.color }}
        >
            {cfg.label}
        </span>
    );
}

function UserRowSkeleton() {
    return (
        <div className="flex items-center gap-4 px-5 py-3.5 border-b border-[rgba(138,155,170,0.1)]">
            <Skeleton className="h-9 w-9 rounded-full shrink-0" />
            <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-3 w-20" />
        </div>
    );
}

function UserRow({ user }) {
    const initials = (user.name ?? "?")
        .split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

    const joinDate = user.createdAt
        ? format(new Date(user.createdAt), "d MMM yyyy")
        : "—";

    return (
        <div className="flex items-center gap-4 px-5 py-3.5 border-b border-[rgba(138,155,170,0.08)] hover:bg-[rgba(138,155,170,0.04)] transition-colors last:border-0">
            <Avatar className="h-9 w-9 shrink-0">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback
                    className="text-[11px] font-semibold"
                    style={{ background: "#C4714A", color: "#FAFAF7" }}
                >
                    {initials}
                </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium truncate" style={{ color: "#111D28" }}>
                    {user.name}
                </p>
                <p className="text-[12px] truncate" style={{ color: "#8A9BAA" }}>
                    {user.email}
                </p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
                {Array.from(user.roles ?? []).map((role) => (
                    <RoleBadge key={role} role={role} />
                ))}
            </div>

            <p className="text-[12px] w-28 text-right shrink-0" style={{ color: "#8A9BAA" }}>
                {joinDate}
            </p>
        </div>
    );
}

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [inviteOpen, setInviteOpen] = useState(false);
    const { isAdmin, isManager } = useRole();

    useEffect(() => {
        getAllUsers()
            .then(setUsers)
            .finally(() => setLoading(false));
    }, []);

    const filtered = users.filter((u) => {
        const q = search.toLowerCase();
        return (
            u.name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q)
        );
    });

    const handleInvited = (newUser) => {
        setUsers((prev) => [newUser, ...prev]);
    };

    return (
        <div className="p-6 min-h-full" style={{ background: "#F0EDE8" }}>
            <div className="flex items-center justify-between mb-5">
                <div>
                    <p
                        className="text-[11px] uppercase tracking-widest font-medium mb-0.5"
                        style={{ color: colors.accent }}
                    >
                        Management
                    </p>
                    <h1 className="text-[18px] font-bold" style={{ color: "#111D28" }}>
                        Users
                    </h1>
                </div>

                {(isAdmin || isManager) && (
                    <button
                        onClick={() => setInviteOpen(true)}
                        className="flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-1.5 rounded-lg transition-colors"
                        style={{ background: colors.accent, color: colors.offWhite }}
                    >
                        <UserPlus size={14} />
                        Add member
                    </button>
                )}
            </div>

            <div
                className="rounded-xl overflow-hidden border border-[rgba(138,155,170,0.15)]"
                style={{ background: "#FAFAF7" }}
            >
                <div
                    className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-[rgba(138,155,170,0.12)]"
                    style={{ background: "#FAFAF7" }}
                >
                    <div className="relative w-64">
                        <Search
                            size={13}
                            className="absolute left-3 top-1/2 -translate-y-1/2"
                            style={{ color: "#8A9BAA" }}
                        />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or email…"
                            className="pl-8 h-8 text-[12px] border-[rgba(138,155,170,0.2)] bg-[#F5F0E8] focus:border-[#C4714A] focus:ring-[#C4714A]/20"
                        />
                    </div>
                    <p className="text-[12px] shrink-0" style={{ color: "#8A9BAA" }}>
                        {loading ? "—" : `${filtered.length} member${filtered.length !== 1 ? "s" : ""}`}
                    </p>
                </div>

                <div
                    className="flex items-center gap-4 px-5 py-2.5 border-b border-[rgba(138,155,170,0.1)]"
                    style={{ background: "#F5F0E8" }}
                >
                    <div className="w-9 shrink-0" />
                    <p className="flex-1 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#8A9BAA" }}>
                        Member
                    </p>
                    <p className="text-[11px] font-semibold uppercase tracking-wider shrink-0" style={{ color: "#8A9BAA" }}>
                        Role
                    </p>
                    <p className="text-[11px] font-semibold uppercase tracking-wider w-28 text-right shrink-0" style={{ color: "#8A9BAA" }}>
                        Joined
                    </p>
                </div>

                {loading ? (
                    [...Array(5)].map((_, i) => <UserRowSkeleton key={i} />)
                ) : filtered.length === 0 ? (
                    <div className="py-16 text-center">
                        <p className="text-[13px]" style={{ color: "#8A9BAA" }}>
                            {search ? "No users match your search" : "No users yet"}
                        </p>
                    </div>
                ) : (
                    filtered.map((user) => <UserRow key={user.id} user={user} />)
                )}
            </div>

            <InviteUserDialog
                open={inviteOpen}
                onOpenChange={setInviteOpen}
                onInvited={handleInvited}
            />
        </div>
    );
}