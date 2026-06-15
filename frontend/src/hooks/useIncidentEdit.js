import { useState, useCallback } from "react";
import { updateIncident } from "../api/incidents";
import { toast } from "sonner";

export function useIncidentEdit(incident, onUpdated) {
    const [draft, setDraft] = useState({
        title:incident.title,
        description:  incident.description ?? "",
        priority:incident.priority,
        category:incident.category,
        status:incident.status,
        dueAt:incident.dueAt ?? "",
        assigneesIds: incident.assignees?.map((a) => a.id) ?? [],
    });

    const save = useCallback(
        async (patch) => {
            setDraft((prev) => {
                const next = { ...prev, ...patch };
                updateIncident(incident.id, next)
                    .then((updated) => {
                        console.log(updated)
                        onUpdated?.(updated)
                        })
                    .catch(() => {
                        setDraft(prev);
                        toast.error("Failed to save changes");
                    });
                return next;
            });
        },
        [incident.id, onUpdated]
    );

    return { draft, save };
}