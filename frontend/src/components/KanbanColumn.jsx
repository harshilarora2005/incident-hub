import { Plus, MoreHorizontal} from "lucide-react";
import { IncidentCard } from "./IncidentCard";
export function KanbanColumn({ column, incidents }) {
    return (
        <div className="flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                    <span
                        className="w-2 h-2 rounded-full shrink-0"
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

