import { useEffect, useState, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import {getComments,addComment,edit,deleteComment} from "../api/comments";
export function useComments(incidentId) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchComments = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getComments(incidentId);
            setComments(data);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [incidentId]);

    const createComment = async (payload) => {
        return await addComment(incidentId, payload);
    };

    const updateComment = async (commentId, payload) => {
        const updated = await edit(incidentId, commentId, payload);

        setComments((prev) =>
        prev.map((comment) =>
            comment.id === commentId ? updated : comment
        )
        );

        return updated;
    };

    const removeComment = async (commentId) => {
        await deleteComment(incidentId, commentId);

        setComments((prev) =>
        prev.filter((comment) => comment.id !== commentId)
        );
    };

    useEffect(() => {
        if (!incidentId) return;
        fetchComments();
    }, [incidentId, fetchComments]);

    useEffect(() => {
        if (!incidentId) return;

        const client = new Client({
            brokerURL: "ws://localhost:8080/ws",
            onConnect: ()=>{
                client.subscribe(
                    `/topic/incidents/${incidentId}/comments`,
                    (message) => {
                    const comment = JSON.parse(message.body);
                    setComments((prev) => {const exists = prev.some((c) => c.id === comment.id);
                        if (exists) return prev;
                        return [...prev, comment];
                    })
                })
            }
        });
        client.activate();
        return () => {client.deactivate();};
    }, [incidentId]);

    return {
        comments,
        loading,
        error,
        refetch: fetchComments,
        createComment,
        updateComment,
        removeComment,
    };
}