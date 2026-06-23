import { useState, useRef } from "react";
import { Paperclip, X, CornerDownLeft } from "lucide-react";
import { MentionTextarea } from "./MentionTextarea";
import { cn } from "@/lib/utils";

export function CommentForm({
    onSubmit,
    initialContent = "",
    submitLabel = "Comment",
    onCancel,
    mentionableUsers = [],
}) {
    const [content, setContent] = useState(initialContent);
    const [file, setFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const fileRef = useRef(null);

    const canSubmit = content.trim().length > 0 && !submitting;

    const handleSubmit = async () => {
        if (!canSubmit) return;
        setSubmitting(true);
        try {
            await onSubmit({ content: content.trim(), file });
            setContent("");
            setFile(null);
        } finally {
            setSubmitting(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleSubmit();
        }
        if (e.key === "Escape" && onCancel) onCancel();
    };

    return (
        <div className="rounded-xl border border-[rgba(138,155,170,0.25)] bg-white overflow-visible">
            <div className="px-3 pt-3 pb-1">
                <MentionTextarea
                    value={content}
                    onChange={setContent}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a comment… type @ to mention someone (Ctrl+Enter to submit)"
                    rows={3}
                    mentionableUsers={mentionableUsers}
                />
            </div>
            {file && (
                <div className="mx-3 mb-2 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[rgba(196,113,74,0.08)] w-fit">
                    <Paperclip size={12} style={{ color: "#C4714A" }} />
                    <span className="text-[12px] font-medium truncate max-w-48" style={{ color: "#C4714A" }}>
                        {file.name}
                    </span>
                    <button
                        onClick={() => setFile(null)}
                        className="ml-1 text-[#C4714A] hover:opacity-70 transition-opacity"
                    >
                        <X size={12} />
                    </button>
                </div>
            )}
            <div className="flex items-center justify-between border-t border-[rgba(138,155,170,0.15)] px-2.5 py-2">
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => fileRef.current?.click()}
                        title="Attach file"
                        className={cn(
                            "h-7 w-7 flex items-center justify-center rounded-md transition-colors",
                            file
                                ? "text-[#C4714A] bg-[rgba(196,113,74,0.1)]"
                                : "text-[#8A9BAA] hover:text-[#111D28] hover:bg-[#F3F4F6]"
                        )}
                    >
                        <Paperclip size={14} />
                    </button>
                    <input
                        ref={fileRef}
                        type="file"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    />
                </div>

                <div className="flex items-center gap-1.5">
                    {onCancel && (
                        <button
                            onClick={onCancel}
                            className="h-8 px-2.5 text-[12px] rounded-lg text-[#8A9BAA] hover:bg-[#F3F4F6] hover:text-[#111D28] transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                        title="Submit (Ctrl+Enter)"
                        className={cn(
                            "h-8 px-3 flex items-center gap-1.5 rounded-lg text-[12px] font-medium transition-colors",
                            canSubmit
                                ? "text-[#FAFAF7] hover:opacity-90"
                                : "bg-[#F3F4F6] text-[#8A9BAA] cursor-not-allowed"
                        )}
                        style={canSubmit ? { background: "#C4714A" } : undefined}
                    >
                        <CornerDownLeft size={13} />
                        {submitting ? "Posting…" : submitLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}