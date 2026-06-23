import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Pencil, Trash2, Paperclip, Download } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CommentForm } from "./CommentForm";
import { MentionText } from "./MentionText";
import useAuth from "../../hooks/useAuth";
import { useRole } from "../../hooks/useRole";

export function CommentCard({ comment, onUpdate, onDelete, mentionableUsers = [] }) {
    const { user } = useAuth();
    const { isAdmin } = useRole();
    const [editing, setEditing]           = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const isAuthor = user?.userId === comment.authorId;
    const canEdit   = isAuthor;
    const canDelete = isAuthor || isAdmin;

    const initials = (comment.authorName ?? "?")
        .split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

    const handleUpdate = async ({ content, file }) => {
        await onUpdate(comment.id, {
            content,
            file,
            existingAttachmentUrl:  comment.attachmentUrl,
            existingAttachmentName: comment.attachmentName,
        });
        setEditing(false);
    };

    return (
        <>
            <div className="flex gap-3 py-3 border-b border-[rgba(138,155,170,0.1)] last:border-0 group">
                <Avatar className="h-7 w-7 shrink-0 mt-0.5">
                    <AvatarImage src={comment.authorAvatar} alt={comment.authorName} />
                    <AvatarFallback
                        className="text-[10px] font-semibold"
                        style={{ background: "#C4714A", color: "#FAFAF7" }}
                    >
                        {initials}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                            <span className="text-[13px] font-medium" style={{ color: "#111D28" }}>
                                {comment.authorName}
                            </span>
                            <span className="text-[11px]" style={{ color: "rgba(138,155,170,0.7)" }}>
                                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                            </span>
                            {comment.updatedAt !== comment.createdAt && (
                                <span className="text-[10px] italic" style={{ color: "rgba(138,155,170,0.6)" }}>
                                    (edited)
                                </span>
                            )}
                        </div>

                        {!editing && (canEdit || canDelete) && (
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {canEdit && (
                                    <button
                                        onClick={() => setEditing(true)}
                                        className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-[rgba(138,155,170,0.12)] transition-colors"
                                        title="Edit"
                                    >
                                        <Pencil size={12} style={{ color: "#8A9BAA" }} />
                                    </button>
                                )}
                                {canDelete && (
                                    <button
                                        onClick={() => setConfirmDelete(true)}
                                        className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-red-50 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={12} className="text-red-400" />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Body */}
                    {editing ? (
                        <CommentForm
                            initialContent={comment.content}
                            submitLabel="Save"
                            onSubmit={handleUpdate}
                            onCancel={() => setEditing(false)}
                            mentionableUsers={mentionableUsers}
                        />
                    ) : (
                        <>
                            <p className="text-[13px] leading-relaxed whitespace-pre-wrap" style={{ color: "#374151" }}>
                                <MentionText content={comment.content} />
                            </p>

                            {comment.attachmentUrl && (
                                <a
                                    href={comment.attachmentUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-lg text-[12px] font-medium hover:opacity-80 transition-opacity"
                                    style={{ background: "rgba(196,113,74,0.08)", color: "#C4714A" }}
                                >
                                    <Paperclip size={11} />
                                    <span className="truncate max-w-48">
                                        {comment.attachmentName ?? "Attachment"}
                                    </span>
                                    <Download size={11} className="shrink-0" />
                                </a>
                            )}
                        </>
                    )}
                </div>
            </div>

            <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete comment?</AlertDialogTitle>
                        <AlertDialogDescription>This can't be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => { onDelete(comment.id); setConfirmDelete(false); }}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}