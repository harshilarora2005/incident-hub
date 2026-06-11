import { useState } from "react";
import { User } from "lucide-react";
import { CornerDownLeft, X } from "lucide-react";
import { DatePicker } from "./DueDatePicker";
import AssigneeSelect from "./AssigneeSelect";
import { colors } from "../assets/constants/formStyles";
import { cn } from "@/lib/utils";

const EMPTY = { title: "", dueAt: null, assigneeIds: [] };

export function QuickCreateCard({ onSave, onCancel }) {
    const [form, setForm] = useState(EMPTY);
    const [showDate, setShowDate] = useState(false);
    const [showAssignees, setShowAssignees] = useState(false);

    const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

    const handleSave = () => {
        if (!form.title.trim()) return;
        onSave(form);
        setForm(EMPTY);
        setShowDate(false);
        setShowAssignees(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        }
        if (e.key === "Escape") onCancel();
    };

    return (
        <div className="rounded-xl border border-[#D7DEE3] bg-white shadow-sm overflow-hidden">
            <textarea
                autoFocus
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What needs to be done?"
                rows={2}
                className="w-full resize-none bg-transparent px-4 pt-3 pb-1 text-[14px] text-[#111D28] outline-none placeholder:text-[#8A9BAA]"
            />

            {showDate && (
                <div className="px-3 pb-2">
                    <DatePicker
                        value={form.dueAt}
                        onChange={(date) => set("dueAt", date)}
                        placeholder="Set due date"
                    />
                </div>
            )}

            {showAssignees && (
                <div className="px-3 pb-2">
                    <AssigneeSelect
                        value={form.assigneeIds}
                        onChange={(ids) => set("assigneeIds", ids)}
                    />
                </div>
            )}

            <div className="flex items-center justify-between border-t border-[#EEF2F4] px-3 py-2">
                <div className="flex items-center gap-1">
                    <ToolbarButton
                        active={showDate}
                        onClick={() => setShowDate((v) => !v)}
                        title={showDate ? "Hide date" : "Set due date"}
                    >
                        {/* calendar icon inline to avoid lucide import collision */}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                    </ToolbarButton>

                    <ToolbarButton
                        active={showAssignees}
                        onClick={() => setShowAssignees((v) => !v)}
                        title={showAssignees ? "Hide assignees" : "Assign members"}
                    >
                        <User size={16} />
                    </ToolbarButton>
                </div>

                <div className="flex items-center gap-1.5">
                    <button
                        onClick={onCancel}
                        className="h-8 w-8 flex items-center justify-center rounded-lg text-[#8A9BAA] hover:bg-[#F3F4F6] hover:text-[#111D28] transition-colors"
                        title="Cancel"
                    >
                        <X size={16} />
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!form.title.trim()}
                        className={cn(
                            "h-8 w-8 flex items-center justify-center rounded-lg transition-colors",
                            form.title.trim()
                                ? "text-white"
                                : "bg-[#F3F4F6] text-[#8A9BAA] cursor-not-allowed"
                        )}
                        style={form.title.trim() ? { background: colors.accent } : undefined}
                        title="Create incident (Enter)"
                    >
                        <CornerDownLeft size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}

function ToolbarButton({ active, onClick, title, children }) {
    return (
        <button
            onClick={onClick}
            title={title}
            className={cn(
                "h-7 w-7 flex items-center justify-center rounded-md transition-colors",
                active
                    ? "text-[#C4714A] bg-[rgba(196,113,74,0.1)]"
                    : "text-[#8A9BAA] hover:text-[#111D28] hover:bg-[#F3F4F6]"
            )}
        >
            {children}
        </button>
    );
}