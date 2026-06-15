import { Calendar, Flag, Layers3 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import TimelineEvent from "./TImelineEvent";
import { StatusBadge,PriorityBadge } from "./Badges";
import { UserRow } from "./AssigneeFleet";
function SidebarField({ icon: Icon, label, children }) {
    return (
        <div className="flex items-start gap-3">
            <Icon size={14} className="mt-0.5 shrink-0" style={{ color: "#8A9BAA" }} />
            <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wider font-medium mb-0.5" style={{ color: "#8A9BAA" }}>
                    {label}
                </p>
                <div className="text-[13px] font-medium text-[#111D28]">{children}</div>
            </div>
        </div>
    );
}

export default function IncidentDetailsPage({ incident }) {
    const formatDate = (date) =>
        date
            ? new Date(date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                })
            : "—";

    const progress = incident.progress ?? 0;
    const progressColor =
        progress === 100 ? "#22c55e" : progress >= 50 ? "#3b82f6" : "#C4714A";

    return (
        <div className="flex flex-col h-full max-h-[85vh] overflow-hidden bg-white rounded-xl">
            <div
                className="px-6 py-3 flex items-center gap-2 border-b shrink-0"
                style={{ borderColor: "rgba(138,155,170,0.15)", background: "#FAFAF7" }}
            >
                <span className="text-[11px] font-mono font-medium" style={{ color: "#8A9BAA" }}>
                    INC-{incident.id}
                </span>
                <span style={{ color: "rgba(138,155,170,0.4)" }}>·</span>
                <StatusBadge status={incident.status} />
                <span style={{ color: "rgba(138,155,170,0.4)" }}>·</span>
                <PriorityBadge priority={incident.priority} />
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left: main content */}
                <div
                    className="flex-1 overflow-y-auto px-6 py-5 space-y-6"
                    style={{ borderRight: "1px solid rgba(138,155,170,0.15)" }}
                >
                    {/* Title + description */}
                    <div>
                        <h1 className="text-[22px] font-bold tracking-tight mb-2" style={{ color: "#111D28" }}>
                            {incident.title}
                        </h1>
                        <p className="text-[14px] leading-relaxed whitespace-pre-wrap" style={{ color: "#8A9BAA" }}>
                            {incident.description || "No description provided."}
                        </p>
                    </div>

                    <Separator style={{ background: "rgba(138,155,170,0.15)" }} />

                    {/* Progress */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[13px] font-semibold" style={{ color: "#111D28" }}>Progress</p>
                            <span className="text-[12px] font-medium tabular-nums" style={{ color: progressColor }}>
                                {progress}%
                            </span>
                        </div>
                        <div className="relative h-2 rounded-full overflow-hidden" style={{ background: "rgba(138,155,170,0.15)" }}>
                            <div
                                className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%`, background: progressColor }}
                            />
                        </div>
                        <p className="text-[11px] mt-1.5" style={{ color: "#8A9BAA" }}>
                            {progress === 0 && "Not started"}
                            {progress > 0 && progress < 100 && "In progress"}
                            {progress === 100 && "Completed"}
                        </p>
                    </div>

                    <Separator style={{ background: "rgba(138,155,170,0.15)" }} />

                    {/* Timeline */}
                    <div>
                        <p className="text-[13px] font-semibold mb-4" style={{ color: "#111D28" }}>Timeline</p>
                        <div>
                            <TimelineEvent
                                label="Incident created"
                                date={formatDate(incident.createdAt)}
                                dot="#8A9BAA"
                            />
                            <TimelineEvent
                                label="Last updated"
                                date={formatDate(incident.updatedAt)}
                                dot="#C4714A"
                            />
                            {incident.resolvedAt && (
                                <TimelineEvent
                                    label="Resolved"
                                    date={formatDate(incident.resolvedAt)}
                                    dot="#22c55e"
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: sidebar */}
                <div className="w-[220px] shrink-0 overflow-y-auto px-5 py-5 space-y-5" style={{ background: "#FAFAF7" }}>
                    <div className="space-y-4">
                        <p className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: "#8A9BAA" }}>
                            Details
                        </p>
                        <SidebarField icon={Flag} label="Priority">
                            {incident.priority ?? "—"}
                        </SidebarField>
                        <SidebarField icon={Layers3} label="Category">
                            {incident.category ?? "—"}
                        </SidebarField>
                        <SidebarField icon={Calendar} label="Due date">
                            {formatDate(incident.dueAt)}
                        </SidebarField>
                    </div>

                    <Separator style={{ background: "rgba(138,155,170,0.15)" }} />

                    <div className="space-y-3">
                        <p className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: "#8A9BAA" }}>
                            Reporter
                        </p>
                        <UserRow user={incident.reporter} />
                    </div>

                    <Separator style={{ background: "rgba(138,155,170,0.15)" }} />

                    <div className="space-y-3">
                        <p className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: "#8A9BAA" }}>
                            Assignees
                        </p>
                        {incident.assignees?.length > 0 ? (
                            <div className="space-y-2.5">
                                {incident.assignees.map((user) => (
                                    <UserRow key={user.id} user={user} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-[12px]" style={{ color: "#8A9BAA" }}>Unassigned</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}