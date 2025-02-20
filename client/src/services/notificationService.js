import axios from 'axios';

const API_URL = import.meta.env.VITE_API_USER_URL;
const token = localStorage.getItem("token");

export const getNotifications = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/notifications/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
        if (!response) { return { message: "Error fetching notificaions", type: "error" } }
        return { notifications: response.data.notifications }

    } catch (error) {
        return { message: error, type: "error" }
    }
}

export const markNotificaionsAsRead = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/mark-notifications-as-read/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
        if (!response) { return { message: "Error marking notificaions as read", type: "error" } }
        return {}

    } catch (error) {
        return { message: error, type: "error" }
    }
}