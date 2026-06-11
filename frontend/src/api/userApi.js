import api from "./axios";
export const getAllUsers = async () => {
    const response = await api.get("/users");
    return response.data;
};

export const uploadAvatar = async (file) => {
    const form = new FormData();
    form.append("file", file);
    const response = await api.patch("/users/me/avatar", form, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};