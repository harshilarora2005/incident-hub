import { useState, useCallback } from "react";
import { updateIncident } from "../api/incidents";
import { toast } from "sonner";

export function useIncidentEdit(incident, onUpdated) {
    const [draft, setDraft] = useState({
        title:incident.title,
        description: incident.description ?? "",
        priority:incident.priority,
        category:incident.category,
        status:incident.status,
        dueAt:incident.dueAt ?? "",
        assigneesIds: incident.assignees?.map((a) => a.id) ?? [],
    });

    const save = useCallback(
        async (patch) => {
            const next = { ...draft, ...patch };
            setDraft(next);
            try {
                // const updated = await updateIncident(incident.id, next);
                // onUpdated?.(updated);
            } catch {
                toast.error("Failed to save changes");
                setDraft(draft); // rollback
            }
        },
        [draft, incident.id, onUpdated]
    );

    return { draft, save };
}