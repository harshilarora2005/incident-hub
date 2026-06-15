import { PRIORITY_CONFIG,STATUS_CONFIG, CATEGORY_CONFIG} from "../assets/constants/incidentStyles";
import { Flag, Layers3 } from "lucide-react";

export function PriorityBadge({ priority }) {
    const cfg = PRIORITY_CONFIG[priority] ?? PRIORITY_CONFIG.MEDIUM;
    return (
        <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase"
            style={{ color: cfg.color, background: cfg.bg }}
        >
            <Flag size={10} />
            {cfg.label}
        </span>
    );
}

export function StatusBadge({ status }) {
    const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.OPEN;
    const Icon = cfg.icon;
    return (
        <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase"
            style={{ color: cfg.color, background: cfg.bg }}
        >
            <Icon size={10} />
            {cfg.label}
        </span>
    );
}

export function CategoryBadge({ category }) {
    const cfg = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.GENERAL;
    return (
        <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase"
            style={{ color: cfg.color, background: cfg.bg }}
        >
            <Layers3 size={10} />
            {cfg.label}
        </span>
    );
}