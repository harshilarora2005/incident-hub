import { useState } from "react";
import {
    Plus,
    MoreHorizontal,
    CheckSquare,
    ChevronDown,
    Calendar,
    User,
    CornerDownLeft,
} from "lucide-react";
import { IncidentCard } from "./IncidentCard";

export function KanbanColumn({ column, incidents }) {
    const [isCreating, setIsCreating] = useState(false);
    const [title, setTitle] = useState("");

    const handleCreate = () => {
        if (!title.trim()) return;

        // TODO: call create incident API

        setTitle("");
        setIsCreating(false);
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

                <MoreHorizontal
                    size={16}
                    className="text-[#8A9BAA] cursor-pointer"
                />
            </div>

            <div className="space-y-2">
                {incidents.map((incident) => (
                    <IncidentCard
                        key={incident.id}
                        incident={incident}
                    />
                ))}
            </div>

            <div className="mt-2">
                {isCreating ? (
                    <div className="rounded-xl border border-[#D7DEE3] bg-white shadow-sm overflow-hidden">
                        <textarea
                            autoFocus
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What needs to be done?"
                            className="w-full min-h-10 resize-none bg-transparent p-4 text-[14px] outline-none placeholder:text-[#8A9BAA]"
                        />

                        <div className="flex items-center justify-between border-t border-[#EEF2F4] px-3 py-2">
                            <div className="flex items-center gap-3 text-[#8A9BAA]">
                                <button className="hover:text-[#111D28]">
                                    <CheckSquare size={18} />
                                </button>

                                <button className="hover:text-[#111D28]">
                                    <ChevronDown size={18} />
                                </button>

                                <button className="hover:text-[#111D28]">
                                    <Calendar size={18} />
                                </button>

                                <button className="hover:text-[#111D28]">
                                    <User size={18} />
                                </button>
                            </div>

                            <button
                                onClick={handleCreate}
                                className="h-9 w-9 flex items-center justify-center rounded-lg bg-[#F3F4F6] text-[#8A9BAA] hover:bg-[#E5E7EB]"
                            >
                                <CornerDownLeft size={18} />
                            </button>
                        </div>
                    </div>
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