export const CATEGORY_LABELS = {
    INFRA: "Infrastructure",
    SECURITY: "Security",
    NETWORK: "Network",
    APP: "Application",
    DATABASE: "Database",
    GENERAL: "General",
};
export const PRIORITY_LABELS = [
    "CRITICAL",
    "HIGH",
    "MEDIUM",
    "LOW",
];
export const ACTION_LABELS = {
    CREATED:{ label: "created",color: "#4CAF82" },
    DELETED:{ label: "deleted",color: "#dc2626" },
    STATUS_CHANGED:{ label: "changed status",   color: "#C4714A" },
    PRIORITY_CHANGED:{ label: "changed priority", color: "#E2A84B" },
    TITLE_CHANGED:{ label: "renamed",color: "#8A9BAA" },
    DESCRIPTION_CHANGED: { label: "updated description", color: "#8A9BAA" },
    CATEGORY_CHANGED:{ label: "changed category", color: "#8A9BAA" },
    DUE_DATE_CHANGED:{ label: "changed due date", color: "#8A9BAA" },
    ASSIGNEE_ADDED:{ label: "assigned",color: "#3b82f6" },
    ASSIGNEE_REMOVED:{ label: "unassigned",color: "#a855f7" },
};