import { useState, useEffect, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import { getComments, addComment, editComment, deleteComment, uploadAttachment } from "../api/commentApi";
import { toast } from "sonner";

export function useComments(incidentId) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getComments(incidentId)
            .then((data) => setComments(data ?? []))
            .catch(() => toast.error("Failed to load comments"))
            .finally(() => setLoading(false));
    }, [incidentId]);

    useEffect(() => {
        const client = new Client({
            brokerURL: "ws://localhost:8080/ws",
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe(`/topic/incidents/${incidentId}/comments`, (msg) => {
                    const { type, comment } = JSON.parse(msg.body);
                    setComments((prev) => {
                        if (type === "CREATED") {
                            if (prev.find((c) => c.id === comment.id)) return prev;
                            return [...prev, comment];
                        }
                        if (type === "UPDATED") {
                            return prev.map((c) => (c.id === comment.id ? comment : c));
                        }
                        if (type === "DELETED") {
                            return prev.filter((c) => c.id !== comment.id);
                        }
                        return prev;
                    });
                });
            },
        });
        client.activate();
        return () => client.deactivate();
    }, [incidentId]);

    const submitComment = useCallback(
        async ({ content, file }) => {
            let attachmentUrl = null;
            let attachmentName = null;

            if (file) {
                try {
                    const uploaded = await uploadAttachment(file);
                    attachmentUrl = uploaded.url;
                    attachmentName = uploaded.originalName;
                } catch {
                    toast.error("Failed to upload attachment");
                    return;
                }
            }

            try {
                const created = await addComment(incidentId, {
                    content,
                    attachmentUrl,
                    attachmentName,
                });
                setComments((prev) => [...prev, created]);
            } catch {
                toast.error("Failed to post comment");
            }
        },
        [incidentId]
    );

    const updateComment = useCallback(
        async (commentId, { content, file, existingAttachmentUrl, existingAttachmentName }) => {
            let attachmentUrl = existingAttachmentUrl ?? null;
            let attachmentName = existingAttachmentName ?? null;

            if (file) {
                try {
                    const uploaded = await uploadAttachment(file);
                    attachmentUrl = uploaded.url;
                    attachmentName = uploaded.originalName;
                } catch {
                    toast.error("Failed to upload attachment");
                    return;
                }
            }

            try {
                const updated = await editComment(incidentId, commentId, {
                    content,
                    attachmentUrl,
                    attachmentName,
                });
                setComments((prev) => prev.map((c) => (c.id === commentId ? updated : c)));
                toast.success("Comment updated");
            } catch {
                toast.error("Failed to update comment");
            }
        },
        [incidentId]
    );

    const removeComment = useCallback(
        async (commentId) => {
            try {
                await deleteComment(incidentId, commentId);
                setComments((prev) => prev.filter((c) => c.id !== commentId));
                toast.success("Comment deleted");
            } catch {
                toast.error("Failed to delete comment");
            }
        },
        [incidentId]
    );

    return { comments, loading, submitComment, updateComment, removeComment };
}