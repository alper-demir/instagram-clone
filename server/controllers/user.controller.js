import User from "../models/user.model.js";
import FollowRequest from "../models/follow.model.js";
import Notification from "../models/notification.model.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from 'cloudinary';

export const updateProfile = async (req, res) => {
    const { userId } = req.params;
    const { firstName, lastName, bio, privacy, username } = req.body.data;

    try {

        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const updateData = {};
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (bio) updateData.bio = bio;
        if (privacy) updateData.privacy = privacy;
        if (username) updateData.username = username;

        if (privacy !== undefined && existingUser.privacy !== privacy) {
            if (privacy === "public") {
                // Kullanıcı hesabını "public" yaptıysa, tüm bekleyen istekleri kabul et
                const pendingFollows = await FollowRequest.find({ receiverId: userId, status: "pending" });

                for (const follow of pendingFollows) {
                    // Takip isteğini accepted yap
                    follow.status = "accepted";
                    await follow.save();

                    // Kullanıcının followers listesine ekle
                    await User.findByIdAndUpdate(userId, {
                        $addToSet: { followers: follow.senderId }
                    });

                    // Takip edenin followings listesine ekle
                    await User.findByIdAndUpdate(follow.senderId, {
                        $addToSet: { followings: userId }
                    });
                }
                // Gelen tüm takip istek bildirimlerini sil.
                await Notification.deleteMany({ type: "follow_request", receiverId: userId })
            }
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("profilePicture username");
        const token = generateToken(updatedUser);
        res.setHeader("token", `Bearer ${token}`);
        res.status(200).json({ message: "Profile updated successfully", token });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error });
    }
};

export const updatePassword = async (req, res) => {
    const { userId } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashedNewPassword = await bcrypt.hash(password, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating password", error });
    }
};

export const updateEmail = async (req, res) => {
    const { userId } = req.params;
    const { email } = req.body;

    try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.email = email;
        await user.save();

        const token = generateToken(user);
        res.setHeader("token", `Bearer ${token}`);
        res.status(200).json({ message: "Email updated successfully", token });
    } catch (error) {
        res.status(500).json({ message: "Error updating email", error });
    }
};

export const updateProfilePicture = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId, { username: 1, profilePicture: 1 });

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Cloudinary'ye yükleme
        const uploadResult = await cloudinary.uploader.upload_stream(
            { folder: "profile_pictures" }, // İsteğe bağlı klasör
            async (error, result) => {
                if (error) {
                    return res.status(500).json({ message: "Error uploading image" });
                }
                // Şuan eski görseli silmiyor.
                // Eski profil resmini sil (varsa)
                if (user.profilePicture) {
                    const publicId = user.profilePicture.split("/").pop().split(".")[0];
                    await cloudinary.uploader.destroy(publicId);
                }

                user.profilePicture = result.secure_url;
                await user.save();

                const token = generateToken(user);
                return res.status(200).json({
                    message: "Profile picture updated successfully",
                    profilePictureUrl: result.secure_url,
                    token
                });
            }
        );

        uploadResult.end(req.file.buffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};

export const getUserByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username }).select("-password").populate("posts");
        if (!user) { return res.status(404).json({ message: "User not found" }); }
        // posts and savedPosts will be populated here later
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error gettning user", error });
    }
}

export const updateProfilePictureEski = async (req, res) => {
    const { userId } = req.params;

    // Upload base64 image to cloudinary
    try {
        const { profilePicture } = req.body;

        const user = await User.findById(userId).select("-password");

        const uploadFile = await cloudinary.uploader.upload(profilePicture);
        const profilePictureUrl = uploadFile.secure_url;

        if (!profilePictureUrl) {
            return res.status(400).json({ message: "Error uploading image" });
        }

        if (user.profilePicture) { // If user already has a profile picture, delete it and upload the new profile picture
            const publicId = user.profilePicture.split("/").slice(-1)[0].split(".")[0];
            await cloudinary.uploader.destroy(publicId);
        }

        user.profilePicture = profilePictureUrl;
        user.save();

        const token = generateToken(user);
        res.setHeader("token", `Bearer ${token}`);
        res.status(200).json({ message: "Profile picture updated successfully", profilePictureUrl });

    } catch (error) {
        res.status(500).json({ message: "Error image upload!", error });
    }

}

export const checkUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ available: false, message: "Bu kullanıcı adı başkasına ait!" });
        }

        return res.status(200).json({ available: true, message: "Kullanıcı adı kullanılabilir!" });
    } catch (error) {
        return res.status(500).json({ available: false, message: "Sunucu hatası!" });
    }
}

export const getUserWithSavedPosts = async (req, res) => {
    const { username } = req.params;
    console.log(username);

    try {
        const user = await User.findOne({ username }).select("savedPosts").populate("savedPosts");
        if (!user) { return res.status(404).json({ message: "User not found" }); }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error getting saved posts", error });
    }
}

export const toggleFollowUser = async (req, res) => {
    const { receiverId } = req.params; // Receiver
    const { userId } = req.body; // Sender
    const senderId = userId;

    try {

        const [senderUser, receiverUser] = await Promise.all([
            User.findById(userId),
            User.findById(receiverId)
        ]);

        if (!senderUser) { return res.status(404).json({ message: "User does not exist", type: "error" }) }
        if (!receiverUser) { return res.status(404).json({ message: "User does not exist", type: "error" }) }

        if (senderId === receiverId) {
            return res.status(400).json({ message: "You cannot send a follow request to yourself" });
        }

        if (!senderUser) { return res.status(404).json({ message: "User does not exist", type: "error" }) }
        if (!receiverUser) { return res.status(404).json({ message: "User does not exist", type: "error" }) }

        if (senderUser.blockedUsers.includes(receiverId) || receiverUser.blockedUsers.includes(senderId)) {
            return res.status(403).json({ message: "You cannot follow or unfollow this user as one of you has blocked the other.", type: "error" });
        }


        if (senderUser.followings.includes(receiverId)) { // Already follows that user, so unfollow
            await Promise.all([
                User.updateOne({ _id: senderId }, { $pull: { followings: receiverId } }),
                User.updateOne({ _id: receiverId }, { $pull: { followers: senderId } })
            ]);
            await Notification.deleteOne({ senderId: userId, receiverId, type: "follow" });
            await FollowRequest.findOneAndDelete({ senderId, receiverId, status: "accepted" });
            return res.status(200).json({ message: "Unfollowed successfully", type: "success" });
        }

        if (receiverUser.privacy === "public") { // directly follow
            await Promise.all([
                User.updateOne({ _id: senderId }, { $push: { followings: receiverId } }),
                User.updateOne({ _id: receiverId }, { $push: { followers: senderId } })
            ]);

            await FollowRequest.create({ senderId, receiverId, status: "accepted" });

            await Notification.create({
                receiverId,
                senderId,
                type: "follow",
            });

            return res.status(200).json({ message: "Followed successfully", type: "success" });
        }
        else { // if private account send a request, if there is existing request withdraw it, if already follows unfollow the user.
            const existingRequest = await FollowRequest.findOne({ senderId, receiverId, active: true });
            if (existingRequest) {
                await FollowRequest.findByIdAndDelete(existingRequest._id);
                await Notification.deleteOne({ senderId: userId, receiverId, type: "follow_request" });
                return res.status(200).json({ message: "A previous request has been withdrawn." });
            }
            else {
                await FollowRequest.create({ senderId, receiverId, status: "pending" });
                await Notification.create({
                    receiverId,
                    senderId,
                    type: "follow_request",
                });
                return res.status(200).json({ message: "Follow request sent successfully" });
            }
        }

    } catch (error) {
        console.error("Follow toggle error:", error);
        return res.status(500).json({ message: "An error occurred while toggling follow status.", type: "error" });
    }
}

export const checkFollowStatus = async (req, res) => {
    const { receiverId } = req.params;
    const { userId } = req.body;
    console.log(receiverId, userId);

    try {
        const followRequest = await FollowRequest.findOne({ receiverId, senderId: userId, active: true });
        if (!followRequest) { return res.json({ message: "No follow request record found", status: null }) }
        return res.status(200).json({ status: followRequest.status });
    } catch (error) {
        res.status(500).json({ message: "Error getting follow status", error });
    }
}

export const anyUnReadNotifications = async (req, res) => {
    const { userId } = req.params;
    try {
        const notifications = await Notification.find({ receiverId: userId, isRead: false });
        if (!notifications || notifications.length === 0) { return res.json({ message: "There are no unread notifications", type: "info", notifications: [] }) }
        let unreadStatus = notifications.length > 0 ? true : false
        return res.json({ message: "There are some unread notifications..", type: "success", unReadNotification: unreadStatus })
    } catch (error) {
        res.status(500).json({ message: "Error fetch notifications", type: "error" })
    }
}

export const getNotifications = async (req, res) => {
    const { userId } = req.params;
    try {
        const notifications = await Notification.find({ receiverId: userId }).sort({ createdAt: -1 }).populate({ path: "senderId", select: ["username", "profilePicture"] })
        if (!notifications) { return res.json({ message: "There are no unread notifications", type: "info", notifications: [] }) }
        return res.json({ message: "Notifications records are listed..", type: "success", notifications })

    } catch (error) {
        res.status(500).json({ message: "Error fetch notifications", type: "error" })
    }
}

export const markNotificaionsAsRead = async (req, res) => {
    const { userId } = req.params;

    try {
        await Notification.updateMany({ receiverId: userId, isRead: false }, { $set: { isRead: true } });
        return res.status(200).json({ message: "Notifications marked as read" });
    } catch (error) {
        console.error("Error marking notifications as read:", error);
        res.status(500).json({ message: "Error updating notifications", type: "error" });
    }
};

export const acceptFollowRequest = async (req, res) => {
    const { receiverId, senderId } = req.body;
    try {
        await FollowRequest.findOneAndUpdate({ receiverId, senderId, status: "pending" }, { status: "accepted" });
        await Notification.updateOne({ // Takip isteği bildirimini, takip edildi olarak güncelliyoruz.
            receiverId,
            senderId,
            type: "follow_request",
        }, { type: "follow" });

        await Promise.all([
            User.updateOne({ _id: senderId }, { $push: { followings: receiverId } }),
            User.updateOne({ _id: receiverId }, { $push: { followers: senderId } })
        ]);

        return res.status(200).json({ message: "Takip isteği kabul edildi.", type: "success" });
    } catch (error) {
        return res.status(500).json({ message: "Error accept follow req", type: "error" })
    }
}

export const rejectFollowRequest = async (req, res) => {
    const { receiverId, senderId } = req.body;
    try {
        await FollowRequest.findOneAndDelete({ receiverId, senderId, status: "pending" });
        await Notification.findOneAndDelete({ senderId, receiverId, type: "follow_request" })
        return res.status(200).json({ message: "Takip isteği reddedildi.", type: "success" });
    } catch (error) {
        return res.status(500).json({ message: "Error reject follow req", type: "error" })
    }
}