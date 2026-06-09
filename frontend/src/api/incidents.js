import api from "./axios";

export const getAllIncidents = async() => {
    const response = await api.get("/incidents");
    return response;
}