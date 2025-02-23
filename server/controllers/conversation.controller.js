import Conversation from "../models/conversation.model.js";

export const getConversations = async (req, res) => {
    try {
        const userId = req.params.userId;
        const conversations = await Conversation.find({ participants: userId })
            .populate("participants", "username profilePicture")
            .populate("lastMessage");

        // Son mesajın tarihine göre sıralama
        conversations.sort((a, b) => {
            const aCreatedAt = a.lastMessage ? a.lastMessage.createdAt : new Date(0);
            const bCreatedAt = b.lastMessage ? b.lastMessage.createdAt : new Date(0);
            return bCreatedAt - aCreatedAt;
        });

        res.status(200).json({ conversations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createConversation = async (req, res) => {
    const { sender, receiver } = req.body;

    try {
        let conversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] },
        });

        if (!conversation) {
            conversation = await Conversation.create({ participants: [sender, receiver] });
        }

        return res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getOneConversation = async (req, res) => {
    const { conversationId } = req.params;
    try {
        const conversation = await Conversation.findById(conversationId)
            .populate("participants", "username profilePicture")
            .populate("lastMessage");
        if (!conversation) { return res.status(404).json({ message: "Conversation error", type: "error" }) }
        return res.status(200).json({ conversation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}