import api from "./axios";

export const getDashboardStats = async () => {
    const res = await api.get("/incidents/stats");
    return res.data;
};

export const getRecentAuditLogs = async () => {
    const res = await api.get("/audit/recent");
    return res.data;
};