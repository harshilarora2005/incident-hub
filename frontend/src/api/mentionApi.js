import api from "./axios";

export const getMentionableUsers = async (incidentId) => {
    const res = await api.get(`/incidents/${incidentId}/mentionables`);
    return res.data; 
};