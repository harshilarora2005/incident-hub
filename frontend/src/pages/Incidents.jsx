import { useState } from "react";
import { Plus, MoreHorizontal, Clock, CheckCircle2 } from "lucide-react";

const COLUMNS = [
    { key: "OPEN", label: "Open", dot: "#8A9BAA" },
    { key: "IN_PROGRESS", label: "In Progress", dot: "#C4714A" },
    { key: "REVIEW", label: "Under Review", dot: "#E2A84B" },
    { key: "RESOLVED", label: "Resolved", dot: "#4CAF82" },
];

const SEVERITY_STYLES = {
    CRITICAL: "bg-[#FAECE7] text-[#712B13]",
    HIGH: "bg-[#FAEEDA] text-[#633806]",
    MEDIUM: "bg-[#E6F1FB] text-[#0C447C]",
    LOW: "bg-[#EAF3DE] text-[#27500A]",
};

const CATEGORY_STYLES = {
    INFRA: "bg-[#EEEDFE] text-[#3C3489]",
    SECURITY: "bg-[#FAECE7] text-[#712B13]",
    NETWORK: "bg-[#E1F5EE] text-[#085041]",
    APP: "bg-[#E6F1FB] text-[#0C447C]",
};

const MOCK_INCIDENTS = [
    {
        id: 1,
        title: "Database cluster unreachable in production",
        status: "OPEN",
        severity: "CRITICAL",
        category: "INFRA",
        progress: null,
        createdAt: "2h ago",
    },
    {
        id: 2,
        title: "Unauthorized login attempts on admin panel",
        status: "OPEN",
        severity: "HIGH",
        category: "SECURITY",
        progress: null,
        createdAt: "5h ago",
    },
    {
        id: 3,
        title: "Latency spike on EU-West region endpoints",
        status: "OPEN",
        severity: "MEDIUM",
        category: "NETWORK",
        progress: null,
        createdAt: "1d ago",
    },
    {
        id: 4,
        title: "Payment gateway returning 500 errors on checkout",
        status: "IN_PROGRESS",
        severity: "CRITICAL",
        category: "APP",
        progress: 65,
        createdAt: "3h ago",
    },
    {
        id: 5,
        title: "Disk usage at 94% on primary storage node",
        status: "IN_PROGRESS",
        severity: "HIGH",
        category: "INFRA",
        progress: 40,
        createdAt: "6h ago",
    },
    {
        id: 6,
        title: "SSL certificate expiring in 7 days on api.incidenthub.io",
        status: "UNDER_REVIEW",
        severity: "MEDIUM",
        category: "SECURITY",
        progress: 85,
        createdAt: "12h ago",
    },
    {
        id: 7,
        title: "Mobile push notifications delayed by 8–12 minutes",
        status: "UNDER_REVIEW",
        severity: "LOW",
        category: "APP",
        progress: 90,
        createdAt: "2d ago",
    },
    {
        id: 8,
        title: "CDN outage caused 30 min downtime across all regions",
        status: "RESOLVED",
        severity: "CRITICAL",
        category: "NETWORK",
        progress: 100,
        createdAt: "3d ago",
    },
    {
        id: 9,
        title: "Memory leak in worker service causing OOM restarts",
        status: "RESOLVED",
        severity: "HIGH",
        category: "INFRA",
        progress: 100,
        createdAt: "4d ago",
    },
];

const PROGRESS_BAR_COLOR = {
    IN_PROGRESS: "bg-[#C4714A]",
    UNDER_REVIEW: "bg-[#E2A84B]",
    RESOLVED: "bg-[#4CAF82]",
};

function IncidentCard({ incident }) {
    const isResolved = incident.status === "RESOLVED";

    return (
        <div className="bg-[#FAFAF7] rounded-xl border border-[rgba(138,155,170,0.15)] p-3 mb-2 cursor-pointer hover:border-[rgba(196,113,74,0.3)] transition-colors">
            <div className="flex flex-wrap gap-1.5 mb-2">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${SEVERITY_STYLES[incident.severity]}`}>
                    {incident.severity.charAt(0) + incident.severity.slice(1).toLowerCase()}
                </span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${CATEGORY_STYLES[incident.category]}`}>
                    {incident.category.charAt(0) + incident.category.slice(1).toLowerCase()}
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
                    <div className="h-[3px] bg-[rgba(138,155,170,0.2)] rounded-full mb-2.5 overflow-hidden">
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

function KanbanColumn({ column, incidents }) {
    return (
        <div className="flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                    <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: column.dot }}
                    />
                    <span className="text-[13px] font-medium text-[#111D28]">
                        {column.label}
                    </span>
                    <span className="text-[12px] text-[#8A9BAA] bg-[rgba(138,155,170,0.15)] px-2 py-0.5 rounded-full">
                        {incidents.length}
                    </span>
                </div>
                <MoreHorizontal size={16} className="text-[#8A9BAA] cursor-pointer" />
            </div>

            <div>
                {incidents.map((incident) => (
                    <IncidentCard key={incident.id} incident={incident} />
                ))}
            </div>

            <button className="flex items-center gap-1.5 w-full px-2.5 py-2 rounded-lg border border-dashed border-[rgba(138,155,170,0.4)] text-[12px] text-[#8A9BAA] hover:bg-[rgba(138,155,170,0.06)] hover:text-[#C4714A] transition-colors mt-1">
                <Plus size={14} />
                Add incident
            </button>
        </div>
    );
}

export default function IncidentsPage() {
    const [incidents] = useState(MOCK_INCIDENTS);

    const byStatus = (status) =>
        incidents.filter((i) => i.status === status);

    return (
        <div className="p-6 min-h-full" style={{ background: "#F0EDE8" }}>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-[16px] font-medium text-[#111D28]">Incidents</h1>
                <button className="flex items-center gap-1.5 bg-[#C4714A] hover:bg-[#b5633e] text-[#FAFAF7] text-[13px] font-medium px-3.5 py-1.5 rounded-lg transition-colors">
                    <Plus size={15} />
                    New incident
                </button>
            </div>

            <div className="grid grid-cols-4 gap-4 items-start">
                {COLUMNS.map((col) => (
                    <KanbanColumn
                        key={col.key}
                        column={col}
                        incidents={byStatus(col.key)}
                    />
                ))}
            </div>
        </div>
    );
}