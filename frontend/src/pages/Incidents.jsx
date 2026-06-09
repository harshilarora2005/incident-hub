import { useState } from "react";
import { Plus} from "lucide-react";
import { KanbanColumn } from "../components/KanbanColumn";
const COLUMNS = [
    { key: "OPEN", label: "Open", dot: "#8A9BAA" },
    { key: "IN_PROGRESS", label: "In Progress", dot: "#C4714A" },
    { key: "UNDER_REVIEW", label: "Under Review", dot: "#E2A84B" },
    { key: "RESOLVED", label: "Resolved", dot: "#4CAF82" },
];
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