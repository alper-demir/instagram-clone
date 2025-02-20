export const getNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        const notifications = await Notification.find({ receiverId: userId }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Error fetching notifications", type: "error" });
    }
};

export const markNotificationsAsRead = async (req, res) => {
    const { userId } = req.params;

    try {
        await Notification.updateMany({ receiverId: userId, isRead: false }, { $set: { isRead: true } });

        res.status(200).json({ message: "Notifications marked as read" });
    } catch (error) {
        console.error("Error marking notifications as read:", error);
        res.status(500).json({ message: "Error updating notifications", type: "error" });
    }
};