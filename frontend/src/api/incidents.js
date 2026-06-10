import api from "./axios";

export const getAllIncidents = async() => {
    const response = await api.get("/incidents");
    return response;
}

export const createIncident = async(payload) => {
    const response = await api.post("/incidents",payload)
    return response.data;
}