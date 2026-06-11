import { useState, useRef } from "react";
import { Camera, Mail, Shield, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import FormField from "../components/FormField";
import { colors, inputStyle } from "../assets/constants/formStyles";
import { uploadAvatar} from "../api/userApi";
import { cn } from "@/lib/utils";
import { ROLE_LABELS } from "../assets/constants/roleLabels";
import useAuth from "../hooks/useAuth";

function RoleBadge({ role }) {
    const style = ROLE_LABELS[role] ?? { label: role, bg: "rgba(138,155,170,0.12)", color: "#8A9BAA" };
    return (
        <span
            className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ background: style.bg, color: style.color }}
        >
            {style.label}
        </span>
    );
}

function AvatarUpload({ user, onUpload }) {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(user.avatarUrl ?? null);
    const [uploading, setUploading] = useState(false);

    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const handleFile = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));
        setUploading(true);
        try {
            const { avatarUrl } = await uploadAvatar(file);
            onUpload(avatarUrl);
            toast.success("Avatar updated");
        } catch {
            toast.error("Failed to upload avatar");
            setPreview(user.avatarUrl ?? null);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="relative w-fit">
            <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden text-xl font-bold select-none"
                style={{
                    background: preview ? "transparent" : "rgba(196,113,74,0.15)",
                    color: colors.accent,
                    border: `2px solid rgba(196,113,74,0.2)`,
                }}
            >
                {preview ? (
                    <img src={preview} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                    initials
                )}
            </div>

            <button
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className={cn(
                    "absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg flex items-center justify-center transition-opacity",
                    uploading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
                )}
                style={{ background: colors.accent }}
                title="Upload photo"
            >
                <Camera size={13} color={colors.offWhite} />
            </button>

            <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleFile}
            />
        </div>
    );
}

function SectionHeader({ icon: Icon, label }) {
    return (
        <div className="flex items-center gap-2 mb-1">
            <Icon size={14} style={{ color: colors.muted }} />
            <span
                className="text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: colors.muted }}
            >
                {label}
            </span>
        </div>
    );
}

export default function AccountPage() {
    const { user, setUser } = useAuth();
    const [name, setName] = useState(user.name);
    return (
        <div className="max-w-2xl mx-auto p-8">
            <p
                className="text-xs font-medium uppercase tracking-widest mb-1"
                style={{ color: colors.accent }}
            >
                Settings
            </p>
            <h2 className="text-xl font-black mb-7">Account</h2>

            <div
                className="rounded-2xl p-6 mb-5 flex items-center gap-5"
                style={{ background: colors.surface }}
            >
                <AvatarUpload
                    user={user}
                    onUpload={(avatarUrl) => setUser((u) => ({ ...u, avatarUrl }))}
                />
                <div className="min-w-0">
                    <p className="text-[15px] font-semibold truncate" style={{ color: colors.offWhite }}>
                        {user.name}
                    </p>
                    <p className="text-[13px] truncate mb-2.5" style={{ color: colors.muted }}>
                        {user.email}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {user.roles.map((role) => (
                            <RoleBadge key={role} role={role} />
                        ))}
                    </div>
                </div>
            </div>

            <div
                className="rounded-2xl p-6 space-y-5"
                style={{ background: colors.surface }}
            >
                <SectionHeader icon={User} label="Profile" />

                <FormField label="Display name">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        disabled
                        className="border-transparent focus:border-[#C4714A] focus:ring-[#C4714A]/20"
                        style={inputStyle}
                    />
                </FormField>

                <hr style={{ borderColor: "rgba(138,155,170,0.15)" }} />
                <SectionHeader icon={Mail} label="Contact" />

                <FormField label="Email">
                    <Input
                        value={user.email}
                        disabled
                        className="border-transparent opacity-60 cursor-not-allowed"
                        style={inputStyle}
                    />
                </FormField>

                <hr style={{ borderColor: "rgba(138,155,170,0.15)" }} />
                <SectionHeader icon={Shield} label="Roles" />

                <div className="flex flex-wrap gap-2">
                    {user.roles.map((role) => (
                        <RoleBadge key={role} role={role} />
                    ))}
                </div>
            </div>
        </div>
    );
}