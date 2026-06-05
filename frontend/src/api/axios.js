import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {

        const requestUrl = error.config?.url;

        const isAuthRequest =
            requestUrl?.includes("/auth/login") ||
            requestUrl?.includes("/auth/register");

        if (
            error.response?.status === 401 &&
            !isAuthRequest
        ) {
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;