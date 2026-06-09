import {Clock, CheckCircle2 } from "lucide-react";

const SEVERITY_STYLES = {
    CRITICAL: "bg-[#FAECE7] text-[#712B13]",
    HIGH: "bg-[#FAEEDA] text-[#633806]",
    MEDIUM: "bg-[#E6F1FB] text-[#0C447C]",
    LOW: "bg-[#EAF3DE] text-[#27500A]",
};

const PROGRESS_BAR_COLOR = {
    IN_PROGRESS: "bg-[#C4714A]",
    UNDER_REVIEW: "bg-[#E2A84B]",
    RESOLVED: "bg-[#4CAF82]",
};

export function IncidentCard({ incident }) {
    const isResolved = incident.status === "RESOLVED";
    console.log(incident)
    return (
        <div className="bg-[#FAFAF7] rounded-xl border border-[rgba(138,155,170,0.15)] p-3 mb-2 cursor-pointer hover:border-[rgba(196,113,74,0.3)] transition-colors">
            <div className="flex flex-wrap gap-1.5 mb-2">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${SEVERITY_STYLES[incident.priority]}`}>
                    {incident.priority.charAt(0) + incident.priority.slice(1).toLowerCase()}
                </span>
            </div>

            <p className="text-[13px] text-[#111D28] leading-snug mb-1.5">
                {incident.title}
            </p>

            {incident.progress !== null && (
                <>
                    <p className="text-[11px] text-[#8A9BAA] mb-1.5">
                        {isResolved ? "Resolved" : `${incident.progress}% resolved`}
                    </p>
                    <div className="h-0.75 bg-[rgba(138,155,170,0.2)] rounded-full mb-2.5 overflow-hidden">
                        <div
                            className={`h-full rounded-full ${PROGRESS_BAR_COLOR[incident.status]}`}
                            style={{ width: `${incident.progress}%` }}
                        />
                    </div>
                </>
            )}

            {incident.progress === null && (
                <p className="text-[11px] text-[#8A9BAA] mb-2.5">Not started</p>
            )}

            <div className="flex items-center justify-between">
                <div />
                <div className="flex items-center gap-1.5">
                    {isResolved ? (
                        <CheckCircle2 size={13} className="text-[#4CAF82]" />
                    ) : (
                        <Clock size={13} className="text-[#8A9BAA]" />
                    )}
                    <span className="text-[11px] text-[#8A9BAA]">{incident.createdAt}</span>
                </div>
            </div>
        </div>
    );
}

