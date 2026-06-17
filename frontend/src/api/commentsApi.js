import api from "./axios";

export const getComments = async(incidentId)=> {
    const res = await api.get(`/incidents/${incidentId}/comments`);
    return res.data;
}

export const addComment = async(incidentId,payload) => {
    const res = await api.post(`/incidents/${incidentId}/comments`,payload)
    return res.data;
}

export const edit = async(incidentId,commentId,payload) => {
    const res = await api.put(`/incidents/${incidentId}/comments/${commentId}`,payload)
    return res.data;
}

export const deleteComment = async(incidentId,commentId) => {
    await api.delete(`/incidents/${incidentId}/comments/${commentId}`)
}