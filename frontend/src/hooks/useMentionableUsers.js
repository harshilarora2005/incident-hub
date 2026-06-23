import { useState, useEffect } from "react";
import { getMentionableUsers } from "../api/mentionApi";

export function useMentionableUsers(incidentId) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!incidentId) return;
        getMentionableUsers(incidentId)
            .then(setUsers)
            .catch(() => setUsers([]));
    }, [incidentId]);

    return users;
}