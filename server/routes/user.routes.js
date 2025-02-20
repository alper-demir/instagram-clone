import express from "express";
import { checkUsername, getUserByUsername, updateEmail, updatePassword, updateProfile, updateProfilePicture, getUserWithSavedPosts, toggleFollowUser, checkFollowStatus, getNotifications, acceptFollowRequest, rejectFollowRequest, anyUnReadNotifications, markNotificaionsAsRead } from "../controllers/user.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { requester } from "../middleware/requester.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.put("/:userId", protectedRoute, requester, updateProfile);
userRouter.put("/email/:userId", protectedRoute, requester, updateEmail);
userRouter.put("/password/:userId", protectedRoute, requester, updatePassword);
userRouter.put("/profilePicture/:userId", protectedRoute, upload.single("profilePicture"), updateProfilePicture);

userRouter.get("/:username", protectedRoute, getUserByUsername);
userRouter.get("/:username/saved", protectedRoute, getUserWithSavedPosts);
userRouter.get("/check-username/:username", checkUsername);


userRouter.get("/notifications/:userId", getNotifications);
userRouter.get("/unread-notification-status/:userId", anyUnReadNotifications);
userRouter.get("/mark-notifications-as-read/:userId", protectedRoute, markNotificaionsAsRead);
userRouter.post("/check-follow-status/:receiverId", checkFollowStatus);

userRouter.post("/follow-user/:receiverId", protectedRoute, toggleFollowUser)
userRouter.post("/follow-request/accept", protectedRoute, acceptFollowRequest);
userRouter.post("/follow-request/reject", protectedRoute, rejectFollowRequest);


export default userRouter;