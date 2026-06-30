import { useState } from "react";
import { Calendar, Flag, Layers3, MessageSquare, History } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import TimelineEvent from "../components/TimelineEvent";
import { StatusBadge, PriorityBadge } from "../components/Badges";
import { UserRow } from "../components/AssigneeFleet";
import { PROGRESS_BAR_COLOR, PRIORITY_CONFIG, CATEGORY_CONFIG } from "../assets/constants/incidentStyles";
import { useIncidentEdit } from "../hooks/useIncidentEdit";
import { useIncidentActivity } from "../hooks/useIncidentActivity";
import { EditableTitle, EditableDescription, EditableDueDate } from "../components/EditableFields";
import { InlineSelect } from "../components/InlineSelect";
import AssigneeSelect from "../components/AssigneeSelect";
import { CommentsSection } from "../components/comments/CommentsSection";
import { ActivityFeed } from "../components/dashboard/ActivityFeed";
import { cn } from "@/lib/utils";

const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

function SidebarSection({ title, children }) {
    return (
        <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: "#8A9BAA" }}>
                {title}
            </p>
            {children}
        </div>
    );
}

function SidebarField({ icon: Icon, label, children }) {
    return (
        <div className="flex items-start gap-3">
            <Icon size={14} className="mt-0.5 shrink-0" style={{ color: "#8A9BAA" }} />
            <div className="min-w-0 w-full">
                <p className="text-[11px] uppercase tracking-wider font-medium mb-1" style={{ color: "#8A9BAA" }}>
                    {label}
                </p>
                {children}
            </div>
        </div>
    );
}

function PanelTab({ active, onClick, icon: Icon, label, count }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors",
                active
                    ? "bg-[rgba(196,113,74,0.1)] text-[#C4714A]"
                    : "text-[#8A9BAA] hover:text-[#111D28] hover:bg-[rgba(138,155,170,0.08)]"
            )}
        >
            <Icon size={13} />
            {label}
            {count > 0 && (
                <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={{ background: "rgba(138,155,170,0.15)", color: "#8A9BAA" }}
                >
                    {count}
                </span>
            )}
        </button>
    );
}

export default function IncidentDetailsPage({ incident, onUpdated }) {
    const { draft, save } = useIncidentEdit(incident, onUpdated);
    const [panel, setPanel] = useState("comments"); // "comments" | "activity"
    const { logs, loading: activityLoading } = useIncidentActivity(incident.id, panel === "activity");
    const progress = incident.progress ?? 0;

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
                <StatusBadge status={draft.status} />
                <span style={{ color: "rgba(138,155,170,0.4)" }}>·</span>
                <PriorityBadge priority={draft.priority} />
            </div>

            <div className="flex flex-1 overflow-hidden">
                <div
                    className="flex-1 overflow-y-auto px-6 py-5 space-y-6"
                    style={{ borderRight: "1px solid rgba(138,155,170,0.15)" }}
                >
                    <div>
                        <EditableTitle value={draft.title} onSave={(v) => save({ title: v })} />
                        <EditableDescription value={draft.description} onSave={(v) => save({ description: v })} />
                    </div>

                    <Separator style={{ background: "rgba(138,155,170,0.15)" }} />

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[13px] font-semibold" style={{ color: "#111D28" }}>Progress</p>
                            <span className="text-[12px] font-medium tabular-nums">{progress}%</span>
                        </div>
                        <div className="relative h-2 rounded-full overflow-hidden" style={{ background: "rgba(138,155,170,0.15)" }}>
                            <div
                                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${PROGRESS_BAR_COLOR[incident.status] ?? "bg-[#C4714A]"}`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-[11px] mt-1.5" style={{ color: "#8A9BAA" }}>
                            {progress === 0 ? "Not started" : progress === 100 ? "Completed" : "In progress"}
                        </p>
                    </div>

                    <Separator style={{ background: "rgba(138,155,170,0.15)" }} />

                    <div>
                        <p className="text-[13px] font-semibold mb-4" style={{ color: "#111D28" }}>Timeline</p>
                        <TimelineEvent label="Incident created" date={formatDate(incident.createdAt)} dot="#8A9BAA" />
                        <TimelineEvent label="Last updated"date={formatDate(incident.updatedAt)} dot="#C4714A" />
                        {incident.resolvedAt && (
                            <TimelineEvent label="Resolved" date={formatDate(incident.resolvedAt)} dot="#22c55e" />
                        )}
                    </div>

                    <Separator style={{ background: "rgba(138,155,170,0.15)" }} />

                    <div>
                        <div className="flex items-center gap-1 mb-4">
                            <PanelTab
                                active={panel === "comments"}
                                onClick={() => setPanel("comments")}
                                icon={MessageSquare}
                                label="Comments"
                            />
                            <PanelTab
                                active={panel === "activity"}
                                onClick={() => setPanel("activity")}
                                icon={History}
                                label="Activity"
                                count={logs.length}
                            />
                        </div>

                        {panel === "comments" ? (
                            <CommentsSection
                                incidentId={incident.id}
                                reporter={incident.reporter.id}
                                assignees={incident.assignees?.map((a) => a.id) ?? []}
                            />
                        ) : activityLoading ? (
                            <p className="text-[12px] py-4 text-center" style={{ color: "#8A9BAA" }}>
                                Loading activity…
                            </p>
                        ) : (
                            <ActivityFeed logs={logs} />
                        )}
                    </div>
                </div>
                <div className="w-55 shrink-0 overflow-y-auto px-5 py-5 space-y-5" style={{ background: "#FAFAF7" }}>
                    <SidebarSection title="Details">
                        <SidebarField icon={Flag} label="Priority">
                            <InlineSelect
                                value={draft.priority}
                                onSave={(v) => save({ priority: v })}
                                options={Object.entries(PRIORITY_CONFIG).map(([k, v]) => ({ value: k, label: v.label }))}
                            />
                        </SidebarField>
                        <SidebarField icon={Layers3} label="Category">
                            <InlineSelect
                                value={draft.category}
                                onSave={(v) => save({ category: v })}
                                options={Object.entries(CATEGORY_CONFIG).map(([k, v]) => ({ value: k, label: v.label }))}
                            />
                        </SidebarField>
                        <SidebarField icon={Calendar} label="Due date">
                            <EditableDueDate value={draft.dueAt} onSave={(v) => save({ dueAt: v })} />
                        </SidebarField>
                    </SidebarSection>

                    <Separator style={{ background: "rgba(138,155,170,0.15)" }} />

                    <SidebarSection title="Reporter">
                        <UserRow user={incident.reporter} />
                    </SidebarSection>

                    <Separator style={{ background: "rgba(138,155,170,0.15)" }} />

                    <SidebarSection title="Assignees">
                        <AssigneeSelect
                            value={draft.assigneesIds}
                            onChange={(ids) => save({ assigneesIds: ids })}
                        />
                    </SidebarSection>
                </div>
            </div>
        </div>
    );
}