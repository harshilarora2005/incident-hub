import {Clock, CheckCircle2, CircleDot, Timer } from "lucide-react";

export const SEVERITY_STYLES = {
    CRITICAL: "bg-[#FAECE7] text-[#712B13]",
    HIGH: "bg-[#FAEEDA] text-[#633806]",
    MEDIUM: "bg-[#E6F1FB] text-[#0C447C]",
    LOW: "bg-[#EAF3DE] text-[#27500A]",
};

export const PROGRESS_BAR_COLOR = {
    IN_PROGRESS: "bg-[#C4714A]",
    UNDER_REVIEW: "bg-[#E2A84B]",
    RESOLVED: "bg-[#4CAF82]",
};

export const CATEGORY_STYLES = {
    INFRA: "bg-[#E0F2FE] text-[#075985]",
    SECURITY: "bg-[#FEE2E2] text-[#991B1B]",
    NETWORK: "bg-[#ECFDF5] text-[#065F46]",
    APP: "bg-[#F3E8FF] text-[#6B21A8]",
    DATABASE: "bg-[#FEF3C7] text-[#92400E]",
    GENERAL: "bg-[#F3F4F6] text-[#4B5563]",
};

export const PRIORITY_CONFIG = {
    CRITICAL: { color: "#dc2626", bg: "rgba(220,38,38,0.08)", label: "Critical" },
    HIGH:     { color: "#ea580c", bg: "rgba(234,88,12,0.08)", label: "High" },
    MEDIUM:   { color: "#C4714A", bg: "rgba(196,113,74,0.10)", label: "Medium" },
    LOW:      { color: "#8A9BAA", bg: "rgba(138,155,170,0.12)", label: "Low" },
};

export const STATUS_CONFIG = {
    OPEN:        { color: "#8A9BAA", bg: "rgba(138,155,170,0.12)", icon: CircleDot,    label: "Open" },
    IN_PROGRESS: { color: "#3b82f6", bg: "rgba(59,130,246,0.10)", icon: Timer,        label: "In Progress" },
    REVIEW:      { color: "#a855f7", bg: "rgba(168,85,247,0.10)",  icon: Clock,        label: "In Review" },
    RESOLVED:    { color: "#22c55e", bg: "rgba(34,197,94,0.10)",   icon: CheckCircle2, label: "Resolved" },
};