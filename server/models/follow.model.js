import mongoose from "mongoose";

const FollowRequestSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model("FollowRequest", FollowRequestSchema);