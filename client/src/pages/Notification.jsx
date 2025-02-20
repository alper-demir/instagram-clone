import { useState } from "react";
import { getNotifications, markNotificaionsAsRead } from "../services/notificationService";
import { useEffect } from "react";
import useToast from './../hooks/useToast';
import { useSelector } from 'react-redux';
import { timeAgo } from './../utils/dateUtils';
import { acceptFollowRequest, rejectFollowRequest } from "../services/userService";
import { Link } from "react-router-dom";

const Notificaion = () => {

    const { showToast } = useToast();
    const userId = useSelector(state => state.user.user._id)
    const [notifications, setNotifications] = useState([]);
    const [tab, setTab] = useState("notifications");

    const markAsRead = async () => {
        await markNotificaionsAsRead(userId);
    };

    const followRequests = notifications.filter(n => n.type === "follow_request");
    const otherNotifications = notifications.filter(n => n.type !== "follow_request");

    const fetchNotifications = async () => {
        const { message, type, notifications } = await getNotifications(userId);
        if (notifications) {
            setNotifications(notifications)
        } else {
            showToast(message, type);
        }
    }

    const acceptFollowReq = async (receiverId, senderId) => {
        const { type } = await acceptFollowRequest(receiverId, senderId);
        type === "success" && fetchNotifications()
    }

    const rejectFollowReq = async (receiverId, senderId) => {
        const { type } = await rejectFollowRequest(receiverId, senderId);
        type === "success" && fetchNotifications()
    }

    useEffect(() => { fetchNotifications(); markAsRead() }, [])

    return (
        <div className="w-full overflow-x-hidden p-10 max-md:p-2 text-wrap break-all h-screen">
            <div className="max-w-md mx-auto p-4 bg-white dark:bg-dark-bg-secondary shadow-lg rounded-lg">
                <div className="flex justify-between items-center mb-4 border-b pb-2 max-md:text-sm text-lg">
                    <button
                        className={`font-semibold px-4 py-2 ${tab === "notifications" ? "border-b-2 border-blue-500" : "text-gray-500"}`}
                        onClick={() => setTab("notifications")}
                    >
                        Bildirimler
                    </button>
                    <button
                        className={`font-semibold px-4 py-2 ${tab === "follow" ? "border-b-2 border-blue-500" : "text-gray-500"}`}
                        onClick={() => setTab("follow")}
                    >
                        Takip İstekleri
                    </button>
                </div>

                {tab === "notifications" && (
                    <div className="space-y-3">
                        {otherNotifications.length === 0 ? (
                            <p className="text-gray-500 text-center">Henüz bir bildiriminiz yok.</p>
                        ) : (
                            otherNotifications.map((notif) => (
                                <div
                                    key={notif._id}
                                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${notif.isRead ? "bg-[#F2F2F2] dark:bg-dark-button-bg" : "bg-blue-100 dark:bg-indigo-900"}`}
                                >
                                    <Link to={`/${notif.senderId?.username}`}><img src={notif.senderId?.profilePicture} alt={notif.senderId?.username} className="w-10 h-10 rounded-full mr-3" /></Link>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">
                                            <Link to={`/${notif.senderId?.username}`}><span className="font-semibold">{notif.senderId?.username} </span></Link>
                                            <span>{notif.type === "follow" ? (<>sizi takip etmeye başladı!</>) : notif.type === "liked" ? (<>bir gönderinizi beğendi</>) : <></>}</span>
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(notif.createdAt)}</p>
                                    </div>

                                </div>
                            ))
                        )}
                    </div>
                )}

                {tab === "follow" && (
                    <div className="space-y-3">
                        {followRequests.length === 0 ? (
                            <p className="text-gray-500 text-center">Takip isteğiniz yok.</p>
                        ) : (
                            followRequests.map((notif) => (
                                <div key={notif._id} className="flex items-center p-3 rounded-lg bg-light-bg-secondary dark:bg-dark-button-bg">
                                    <Link to={`/${notif.senderId?.username}`}><img src={notif.senderId?.profilePicture} alt={notif.senderId?.username} className="w-10 h-10 rounded-full mr-3" /></Link>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium dark:text-white">
                                            <Link to={`/${notif.senderId?.username}`}><span className="font-semibold">{notif.senderId?.username}</span></Link> sizi takip etmek istiyor!
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(notif.createdAt)}</p>
                                        <div className="mt-2 flex space-x-2">
                                            <button className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all cursor-pointer"
                                                onClick={() => acceptFollowReq(notif.receiverId, notif.senderId._id)}
                                            >
                                                Kabul Et
                                            </button>
                                            <button className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all cursor-pointer"
                                                onClick={() => rejectFollowReq(notif.receiverId, notif.senderId._id)}
                                            >
                                                Reddet
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Notificaion;