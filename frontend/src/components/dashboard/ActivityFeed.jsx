import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink } from "lucide-react";
import { ACTION_LABELS } from "../../assets/constants/labels";

const URL_MARKER = "__url__:";

function parseDetail(log) {
    const raw = log.oldValue && log.newValue
        ? `${log.oldValue} → ${log.newValue}`
        : log.newValue || log.oldValue || "";

    const lines = raw.split("\n");
    const urlLineIndex = lines.findIndex((l) => l.startsWith(URL_MARKER));
    const url = urlLineIndex !== -1 ? lines[urlLineIndex].slice(URL_MARKER.length) : null;
    const text = (urlLineIndex !== -1 ? lines.slice(0, urlLineIndex) : lines).join("\n");

    return { text, url };
}

function AuditRow({ log }) {
    const cfg = ACTION_LABELS[log.action] ?? { label: log.action, color: "#8A9BAA" };
    const initials = (log.changedByName ?? "?")
        .split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

    const { text, url } = parseDetail(log);
    const isMultiline = text.includes("\n");

    return (
        <div className="flex gap-2.5 py-2.5 border-b border-[rgba(138,155,170,0.1)] last:border-0">
            <Avatar className="h-6 w-6 shrink-0 mt-0.5">
                <AvatarImage src={log.changedByAvatar} />
                <AvatarFallback
                    className="text-[9px] font-semibold"
                    style={{ background: "#1C2B3A", color: "#F5F0E8" }}
                >
                    {initials}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
                <p className="text-[12px] leading-snug" style={{ color: "#111D28" }}>
                    <span className="font-medium">{log.changedByName}</span>
                    {" "}
                    <span style={{ color: cfg.color }}>{cfg.label}</span>
                    {" "}
                    <span className="font-medium truncate">{log.incidentTitle}</span>
                </p>
                {text && (
                    <p
                        className={`text-[11px] mt-0.5 font-mono ${isMultiline ? "whitespace-pre-line" : "truncate"}`}
                        style={{ color: "#8A9BAA" }}
                    >
                        {text}
                    </p>
                )}
                <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[10px]" style={{ color: "rgba(138,155,170,0.7)" }}>
                        {formatDistanceToNow(new Date(log.changedAt), { addSuffix: true })}
                    </p>
                    {url && (
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-medium hover:underline"
                            style={{ color: "#C4714A" }}
                        >
                            View on GitHub
                            <ExternalLink size={9} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export function ActivityFeed({ logs }) {
    if (logs.length === 0) {
        return (
            <p className="text-[12px] py-4 text-center" style={{ color: "#8A9BAA" }}>
                No activity yet
            </p>
        );
    }
    return (
        <div>
            {logs.slice(0, 12).map(log => (
                <AuditRow key={log.id} log={log} />
            ))}
        </div>
    );
}