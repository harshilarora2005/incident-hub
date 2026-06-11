import { useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { IncidentCard } from "./IncidentCard";
import { QuickCreateCard } from "./QuickCreateCard";
import { createQuick } from "../api/incidents";
import { toast } from "sonner";
export function KanbanColumn({ column, incidents }) {
    const [isCreating, setIsCreating] = useState(false);
    const handleSave = async (form) => {
        const payload = {
            title: form.title,
            status: column.key,
            dueAt: form.dueAt ? form.dueAt.toISOString().split("T")[0] : null,
            assigneeIds: form.assigneeIds,
        };

        try {
            await createQuick(payload);
            toast.success("Incident created");
        } catch (error) {
            toast.error(error.response?.data?.message ?? "Failed to create incident");
        } finally {
            setIsCreating(false);
        }
    };

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
            <div className="space-y-2">
                {incidents.map((incident) => (
                    <IncidentCard key={incident.id} incident={incident} />
                ))}
            </div>
            <div className="mt-2">
                {isCreating ? (
                    <QuickCreateCard
                        onSave={handleSave}
                        onCancel={() => setIsCreating(false)}
                    />
                ) : (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="flex items-center gap-1.5 w-full px-2.5 py-2 rounded-lg border border-dashed border-[rgba(138,155,170,0.4)] text-[12px] text-[#8A9BAA] hover:bg-[rgba(138,155,170,0.06)] hover:text-[#C4714A] transition-colors"
                    >
                        <Plus size={14} />
                        Add incident
                    </button>
                )}
            </div>
        </div>
    );
}