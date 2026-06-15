import { Clock, CheckCircle2 } from "lucide-react";
import {
    CATEGORY_STYLES,
    PROGRESS_BAR_COLOR,
    SEVERITY_STYLES,
} from "../assets/constants/incidentStyles";
import { format, parseISO } from "date-fns";
import {AssigneeFleet} from "./AssigneeFleet";
import { CATEGORY_LABELS } from "../assets/constants/incidentLables";
export function IncidentCard({ incident }) {
    console.log(incident)
    const isResolved = incident.status === "RESOLVED";
    const formattedDate = incident.dueAt
    ? format(parseISO(incident.dueAt), "dd MMM yyyy")
    : "-";
    return (
        <div className="bg-[#FAFAF7] rounded-xl border border-[rgba(138,155,170,0.15)] p-3 mb-2 cursor-pointer hover:border-[rgba(196,113,74,0.3)] transition-colors">
            <div className="flex flex-wrap gap-1.5 mb-2">
                <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        SEVERITY_STYLES[incident.priority]
                    }`}
                >
                    {incident.priority.charAt(0) +
                        incident.priority.slice(1).toLowerCase()}
                </span>

                {incident.category && (
                    <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                            CATEGORY_STYLES[incident.category] ??
                            "bg-gray-100 text-gray-700"
                        }`}
                    >
                        {CATEGORY_LABELS[incident.category] ??
                            incident.category}
                    </span>
                )}
            </div>

            <h3 className="text-[13px] font-medium text-[#111D28] leading-snug mb-1.5">
                {incident.title}
            </h3>

            {incident.description && (
                <p className="text-[11px] text-[#6B7280] line-clamp-2 mb-2">
                    {incident.description}
                </p>
            )}

            {incident.progress !== null && (
                <>
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[11px] text-[#8A9BAA]">
                            {isResolved
                                ? "Resolved"
                                : `${incident.progress}% complete`}
                        </span>

                        <span className="text-[11px] text-[#8A9BAA]">
                            {incident.progress}%
                        </span>
                    </div>

                    <div className="h-1 bg-[rgba(138,155,170,0.2)] rounded-full mb-3 overflow-hidden">
                        <div
                            className={`h-full rounded-full ${
                                PROGRESS_BAR_COLOR[incident.status] ??
                                "bg-[#C4714A]"
                            }`}
                            style={{
                                width: `${incident.progress}%`,
                            }}
                        />
                    </div>
                </>
            )}

            {incident.progress === null && (
                <p className="text-[11px] text-[#8A9BAA] mb-3">
                    Not started
                </p>
            )}

            <div className="flex items-center justify-between">
                <div>
                    <AssigneeFleet assignees={incident.assignees} collapseNum={3}/>
                </div>

                <div className="flex items-center gap-2">
                    {isResolved ? (
                        <CheckCircle2
                            size={13}
                            className="text-[#4CAF82]"
                        />
                    ) : (
                        <Clock
                            size={13}
                            className="text-[#8A9BAA]"
                        />
                    )}

                    <div className="flex flex-col items-end leading-none">
                        <span className="text-[11px] text-[#8A9BAA]">
                            {formattedDate}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}