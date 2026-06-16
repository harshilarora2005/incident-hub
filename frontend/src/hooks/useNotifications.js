import { useState, useEffect, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import { getNotifications, markRead, markAllRead } from "../api/notificationApi";
import useAuth from "./useAuth";

export function useNotifications() {
    const [notifications, setNotifications] = useState([]);
    const {user} = useAuth();
    const userId = user?.userId;
    console.log(user)
    useEffect(() => {
        getNotifications()
        .then((data) => {
            console.log(data)
            setNotifications(data ?? [])
    })
        .catch(console.error);
    }, []);

    useEffect(() => {
        if (!userId) return;
        const client = new Client({
            brokerURL: "ws://localhost:8080/ws",
            onConnect: () => {
                client.subscribe(`/user/${userId}/queue/notifications`, (msg) => {
                    const notification = JSON.parse(msg.body);
                    setNotifications((prev) => [notification, ...prev]);
                });
            },
        });
        client.activate();
        return () => client.deactivate();
    }, [userId]);

    const handleMarkRead = useCallback(async (id) => {
        await markRead(id);
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
    }, []);

    const handleMarkAllRead = useCallback(async () => {
        await markAllRead();
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    }, []);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return { notifications, unreadCount, markRead: handleMarkRead, markAllRead: handleMarkAllRead };
}