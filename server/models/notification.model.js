import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["follow", "follow_request", "liked", "comment"], required: true },
    isRead: { type: Boolean, default: false },
    likedPost: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: false } // Eğer bildirim türü post'a beğeni ya da yorum ise ilgili post içeriğini gönderebiliriz.
}, { timestamps: true });

export default mongoose.model("Notification", NotificationSchema);