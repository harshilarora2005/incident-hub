import api from "./axios";

export const getAllIncidents = async() => {
    const response = await api.get("/incidents");
    return response;
}

export const createIncident = async(payload) => {
    const response = await api.post("/incidents",payload)
    return response.data;
}

export const getMyIncidents = async(payload) => {
    const response = await api.get("/incidents/my",payload)
    return response;
}

export const createQuick = async(payload) => {
    const response = await api.post("incidents/quick",payload)
    return response.data;
}