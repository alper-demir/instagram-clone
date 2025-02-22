import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: null,
        },
        // deletedBy: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, deleted: { type: Boolean, default: false } }] Sohbeti geçmişinden silen kullanıcılar, filtreleme ile silinen conversationlar gösterilmez.
    },
    { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchema);