import { AlertTriangle} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboard } from "../hooks/useDashboard";
import { StatCard } from "../components/dashboard/StatCard";
import { StatusPipeline } from "../components/dashboard/StatusPipeline";
import { PriorityTiles } from "../components/dashboard/PriorityTiles";
import { CategoryBars } from "../components/dashboard/CategoryBars";
import { TopAssignees } from "../components/dashboard/TopAssignees";
import { ActivityFeed } from "../components/dashboard/ActivityFeed";
import useAuth from "../hooks/useAuth";

function DashboardSkeleton() {
    return (
        <div className="p-6 space-y-4 animate-pulse">
            <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-28 rounded-xl" />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-64 col-span-2 rounded-xl" />
                <Skeleton className="h-64 rounded-xl" />
            </div>
        </div>
    );
}

function DashboardCard({ title, children, className = "" }) {
    return (
        <div
            className={`bg-[#FAFAF7] rounded-xl border border-[rgba(138,155,170,0.15)] p-5 ${className}`}
        >
            {title && (
                <p className="text-[13px] font-semibold mb-4" style={{ color: "#111D28" }}>
                    {title}
                </p>
            )}
            {children}
        </div>
    );
}

export default function Dashboard() {
    const { user } = useAuth();
    const { loading, stats, byCategory, topAssignees, auditLogs } = useDashboard();

    if (loading) return <DashboardSkeleton />;

    return (
        <div className="p-6 space-y-4 min-h-full" style={{ background: "#F0EDE8" }}>
            {/* Greeting */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[11px] uppercase tracking-wider font-medium mb-0.5"
                        style={{ color: "#C4714A" }}>
                        Overview
                    </p>
                    <h1 className="text-[18px] font-bold" style={{ color: "#111D28" }}>
                        Good to see you, {user?.name?.split(" ")[0]}
                    </h1>
                </div>
                {stats.overdue > 0 && (
                    <div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-medium"
                        style={{ background: "#FAECE7", color: "#712B13" }}
                    >
                        <AlertTriangle size={13} />
                        {stats.overdue} overdue
                    </div>
                )}
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-4 gap-4">
                <StatCard
                    label="Total incidents"
                    value={stats.total}
                    accentColor="#111D28"
                />
                <StatCard
                    label="Open"
                    value={stats.open}
                    sub={`${stats.total ? Math.round((stats.open / stats.total) * 100) : 0}% of total`}
                    accentColor="#8A9BAA"
                />
                <StatCard
                    label="Resolved"
                    value={stats.resolved}
                    sub={`${stats.total ? Math.round((stats.resolved / stats.total) * 100) : 0}% resolved`}
                    accentColor="#4CAF82"
                />
                <StatCard
                    label="Critical open"
                    value={stats.critical}
                    sub={stats.critical > 0 ? "Needs immediate action" : "All clear"}
                    accentColor="#dc2626"
                    danger={stats.critical > 0}
                />
            </div>

            {/* Middle row */}
            <div className="grid grid-cols-3 gap-4">
                <DashboardCard className="col-span-2 space-y-6">
                    <StatusPipeline
                        open={stats.open}
                        inProgress={stats.inProgress}
                        review={stats.review}
                        resolved={stats.resolved}
                    />
                    <Separator style={{ background: "rgba(138,155,170,0.15)" }} />
                    <PriorityTiles
                        critical={stats.critical}
                        high={stats.high}
                        medium={stats.medium}
                        low={stats.low}
                    />
                    <Separator style={{ background: "rgba(138,155,170,0.15)" }} />
                    <CategoryBars byCategory={byCategory} />
                </DashboardCard>

                <div className="space-y-4">
                    <DashboardCard title="Top assignees">
                        <TopAssignees assignees={topAssignees} />
                    </DashboardCard>
                </div>
            </div>

            <DashboardCard title="Recent activity">
                <ScrollArea >
                    <ActivityFeed logs={auditLogs} />
                </ScrollArea>
            </DashboardCard>
        </div>
    );
}