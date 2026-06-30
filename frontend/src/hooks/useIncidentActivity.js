import { useState, useEffect } from "react";
import { getIncidentAuditLog } from "../api/auditApi";

export function useIncidentActivity(incidentId, enabled) {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!enabled) return;
        setLoading(true);
        getIncidentAuditLog(incidentId)
            .then((data) => setLogs(data ?? []))
            .catch(() => setLogs([]))
            .finally(() => setLoading(false));
    }, [incidentId, enabled]);

    return { logs, loading };
}