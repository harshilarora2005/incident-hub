import {Clock, CheckCircle2, CircleDot, Timer } from "lucide-react";

export const PROGRESS_BAR_COLOR = {
    IN_PROGRESS: "bg-[#C4714A]",
    UNDER_REVIEW: "bg-[#E2A84B]",
    RESOLVED: "bg-[#4CAF82]",
};

export const PRIORITY_CONFIG = {
    CRITICAL:{ color: "#dc2626", bg: "rgba(220,38,38,0.08)", label: "Critical" },
    HIGH:{ color: "#ea580c", bg: "rgba(234,88,12,0.08)", label: "High" },
    MEDIUM:{ color: "#C4714A", bg: "rgba(196,113,74,0.10)", label: "Medium" },
    LOW:{ color: "#8A9BAA", bg: "rgba(138,155,170,0.12)", label: "Low" },
};

export const STATUS_CONFIG = {
    OPEN:{ color: "#8A9BAA", bg: "rgba(138,155,170,0.12)",icon: CircleDot,label: "Open" },
    IN_PROGRESS: { color: "#3b82f6", bg: "rgba(59,130,246,0.10)",icon: Timer,label: "In Progress" },
    REVIEW:{ color: "#a855f7", bg: "rgba(168,85,247,0.10)",icon: Clock,label: "In Review" },
    RESOLVED:{ color: "#22c55e", bg: "rgba(34,197,94,0.10)",icon: CheckCircle2,label: "Resolved" },
};

export const CATEGORY_CONFIG = {
    INFRA:{ color: "#075985", bg: "rgba(7,89,133,0.08)",label: "Infra"},
    SECURITY:{ color: "#991B1B", bg: "rgba(153,27,27,0.08)",label: "Security" },
    NETWORK:  { color: "#065F46", bg: "rgba(6,95,70,0.08)",label: "Network"},
    APP:{ color: "#6B21A8", bg: "rgba(107,33,168,0.08)",label: "App"},
    DATABASE: { color: "#92400E", bg: "rgba(146,64,14,0.08)",label: "Database" },
    GENERAL:{ color: "#4B5563", bg: "rgba(75,85,99,0.08)",label: "General"},
};