import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buildToken } from "../../utils/mentionUtils";
import { cn } from "@/lib/utils";

export function MentionTextarea({
    value,
    onChange,
    onKeyDown,
    placeholder,
    rows = 3,
    className,
    mentionableUsers = [],
}) {
    const textareaRef = useRef(null);
    const [open, setOpen]= useState(false);
    const [query, setQuery]= useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [triggerPos, setTriggerPos]= useState(null); 

    const filtered = mentionableUsers.filter((u) =>
        u.name.toLowerCase().includes(query.toLowerCase())
    );
    const handleChange = (e) => {
        const raw = e.target.value;
        onChange(raw);
        const cursor= e.target.selectionStart;
        const textToCursor = raw.slice(0, cursor);
        const atMatch = textToCursor.match(/@([^@[\]]*)$/);
        if (atMatch) {
            setTriggerPos(cursor - atMatch[0].length);
            setQuery(atMatch[1]);
            setOpen(true);
            setActiveIndex(0);
        } else {
            setOpen(false);
        }
    };

    const insertMention = (user) => {
        if (triggerPos === null || !textareaRef.current) return;

        const cursor = textareaRef.current.selectionStart;
        const before = value.slice(0, triggerPos);          
        const after= value.slice(cursor);                 
        const token= buildToken(user) + " ";
        const next= before + token + after;

        onChange(next);
        setOpen(false);
        setQuery("");
        setTriggerPos(null);

        requestAnimationFrame(() => {
            if (textareaRef.current) {
                const pos = before.length + token.length;
                textareaRef.current.focus();
                textareaRef.current.setSelectionRange(pos, pos);
            }
        });
    };
    const handleKeyDown = (e) => {
        if (open && filtered.length > 0) {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((i) => (i + 1) % filtered.length);
                return;
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
                return;
            }
            if (e.key === "Enter" || e.key === "Tab") {
                e.preventDefault();
                insertMention(filtered[activeIndex]);
                return;
            }
            if (e.key === "Escape") {
                setOpen(false);
                return;
            }
        }
        onKeyDown?.(e);
    };

    useEffect(() => {
        const handler = (e) => {
            if (!textareaRef.current?.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="relative w-full">
            <textarea
                ref={textareaRef}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                rows={rows}
                className={cn(
                    "w-full resize-none bg-transparent text-[13px] text-[#111D28] placeholder:text-[#8A9BAA] outline-none",
                    className
                )}
            />

            {open && filtered.length > 0 && (
                <div
                    className="absolute left-0 z-9999 w-56 rounded-xl border border-[rgba(138,155,170,0.2)] bg-white shadow-lg overflow-hidden"
                    style={{ bottom: "100%", marginBottom: 6 }}
                >
                    <p className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-wider font-semibold" style={{ color: "#8A9BAA" }}>
                        Mention
                    </p>
                    {filtered.map((user, i) => {
                        const initials = user.name
                            .split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
                        return (
                            <button
                                key={user.id}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    insertMention(user);
                                }}
                                className={cn(
                                    "w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors",
                                    i === activeIndex
                                        ? "bg-[rgba(196,113,74,0.08)]"
                                        : "hover:bg-[rgba(138,155,170,0.06)]"
                                )}
                            >
                                <Avatar className="h-6 w-6 shrink-0">
                                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                                    <AvatarFallback
                                        className="text-[9px] font-semibold"
                                        style={{ background: "#C4714A", color: "#FAFAF7" }}
                                    >
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-[13px] font-medium truncate" style={{ color: "#111D28" }}>
                                    {user.name}
                                </span>
                            </button>
                        );
                    })}
                    <p className="px-3 py-1.5 text-[10px]" style={{ color: "rgba(138,155,170,0.6)" }}>
                        ↑↓ navigate · Enter to select · Esc to close
                    </p>
                </div>
            )}
        </div>
    );
}