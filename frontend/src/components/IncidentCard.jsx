import { Clock, CheckCircle2, CalendarDays } from "lucide-react";
import { PROGRESS_BAR_COLOR } from "../assets/constants/incidentStyles";
import { format, parseISO } from "date-fns";
import { AssigneeFleet } from "./AssigneeFleet";
import { PriorityBadge, CategoryBadge } from "./Badges";
import { cn } from "@/lib/utils";

export function IncidentCard({ incident }) {
    const isResolved = incident.status === "RESOLVED";
    const dueDate = incident.dueAt ? parseISO(incident.dueAt) : null;
    const formattedDate = dueDate ? format(dueDate, "dd MMM yyyy") : "No due date";
    const isOverdue = dueDate && !isResolved && dueDate < new Date();

    return (
        <div className="bg-[#FAFAF7] rounded-xl border border-[rgba(138,155,170,0.15)] p-4 mb-2 cursor-pointer hover:border-[rgba(196,113,74,0.3)] transition-colors">
            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 mb-3">
                <PriorityBadge priority={incident.priority} />
                <CategoryBadge category={incident.category} />
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-[#111D28] leading-snug mb-1">
                {incident.title}
            </h3>

            {/* Description */}
            {incident.description && (
                <p className="text-xs text-[#6B7280] line-clamp-2 mb-3 leading-relaxed">
                    {incident.description}
                </p>
            )}

            {/* Progress */}
            <div className="mb-4">
                {incident.progress !== null ? (
                    <>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-[#8A9BAA]">
                                {isResolved ? "Resolved" : "Progress"}
                            </span>
                            <span className="text-xs font-medium text-[#111D28]">
                                {incident.progress}%
                            </span>
                        </div>
                        <div className="h-1.5 bg-[rgba(138,155,170,0.15)] rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all ${
                                    PROGRESS_BAR_COLOR[incident.status] ?? "bg-[#C4714A]"
                                }`}
                                style={{ width: `${incident.progress}%` }}
                            />
                        </div>
                    </>
                ) : (
                    <span className="text-xs text-[#8A9BAA]">Not started</span>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <AssigneeFleet assignees={incident.assignees} collapseNum={3} />

                <div className="flex items-center gap-2">
                    {isResolved ? (
                        <CheckCircle2 size={13} className="text-[#4CAF82]" />
                    ) : (
                        <Clock size={13} className="text-[#8A9BAA]" />
                    )}
                    <div
                        className={cn(
                            "flex items-center gap-1 rounded-md px-2 py-0.5 text-xs",
                            isOverdue
                                ? "bg-red-500/10 text-red-500"
                                : "text-[#8A9BAA]"
                        )}
                    >
                        <CalendarDays size={11} />
                        <span>{formattedDate}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}