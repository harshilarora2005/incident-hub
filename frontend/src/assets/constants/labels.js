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
    GITHUB_PUSH:{ label: "pushed commits", color: "#24292e" },
    GITHUB_PR_OPENED:{ label: "opened a PR", color: "#1f883d" },
    GITHUB_PR_MERGED:{ label: "merged a PR", color: "#8250df" },
    GITHUB_PR_CLOSED:{ label: "closed a PR", color: "#cf222e" },
};