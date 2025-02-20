import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useNotification = () => {

    const API_URL = import.meta.env.VITE_API_USER_URL;
    const token = localStorage.getItem("token");
    const userId = useSelector(state => state.user.user._id)
    const [notification, setNotification] = useState(false);

    const fetchNotifications = async () => {
        const response = await axios.get(`${API_URL}/unread-notification-status/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
        console.log(response.data);

        if (response.data.unReadNotification) {
            setNotification(true);
        }
    }

    useEffect(() => {
        fetchNotifications();
    }, [window.location.href]); // Sayfalar değiştikçe bildirim durumunu kontrol et.

    return { notification }
}

export default useNotification;