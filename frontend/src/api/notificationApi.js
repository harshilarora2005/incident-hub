import api from "./axios";

export const getNotifications = async()=> {
    const res = await api.get("/notifications");
    return res.data;
}

export const getUnreadCount = async()=> {
    const res = await api.get("/notifications/unread-count")
    return res.data;
}

export const markRead = async(id)=> {
    const res = await api.patch(`/notifications/${id}/read`)
    return res.data;
}

export const markAllRead=()=>{
    api.patch("/notifications/read-all");
}