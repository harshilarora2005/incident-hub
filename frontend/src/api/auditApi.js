import api from "./axios";

export const getIncidentAuditLog = async (incidentId) => {
    const res = await api.get(`/audit/incident/${incidentId}`);
    return res.data;
};