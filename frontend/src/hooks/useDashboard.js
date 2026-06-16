import { useState, useEffect } from "react";
import { getAllIncidents } from "../api/incidents";
import { getRecentAuditLogs } from "../api/dashboardApi";

export function useDashboard() {
    const [incidents, setIncidents] = useState([]);
    const [auditLogs, setAuditLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getAllIncidents(), getRecentAuditLogs()])
            .then(([incRes, logs]) => {
                setIncidents(incRes.data ?? []);
                setAuditLogs(logs ?? []);
            })
            .finally(() => setLoading(false));
    }, []);

    const total= incidents.length;
    const open= incidents.filter(i => i.status === "OPEN").length;
    const inProgress = incidents.filter(i => i.status === "IN_PROGRESS").length;
    const review= incidents.filter(i => i.status === "REVIEW").length;
    const resolved= incidents.filter(i => i.status === "RESOLVED").length;

    const critical = incidents.filter(i => i.priority === "CRITICAL").length;
    const high= incidents.filter(i => i.priority === "HIGH").length;
    const medium= incidents.filter(i => i.priority === "MEDIUM").length;
    const low= incidents.filter(i => i.priority === "LOW").length;

    const today = new Date().toISOString().split("T")[0];
    const overdue = incidents.filter(i =>
        i.dueAt && i.dueAt < today && i.status !== "RESOLVED"
    ).length;

    const byCategory = ["INFRA","SECURITY","NETWORK","APP","DATABASE","GENERAL"].map(cat => ({
        cat,
        count: incidents.filter(i => i.category === cat).length,
    }));

    const assigneeMap = {};
    incidents.forEach(incident => {
        (incident.assignees ?? []).forEach(a => {
            if (!assigneeMap[a.id]) assigneeMap[a.id] = { user: a, total: 0, resolved: 0 };
            assigneeMap[a.id].total++;
            if (incident.status === "RESOLVED") assigneeMap[a.id].resolved++;
        });
    });
    const topAssignees = Object.values(assigneeMap)
        .sort((a, b) => b.total - a.total)
        .slice(0, 5);

    return {
        loading,
        stats: { total, open, inProgress, review, resolved, critical, high, medium, low, overdue },
        byCategory,
        topAssignees,
        auditLogs,
        incidents,
    };
}