import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { sender, receiver, message } = req.body;

        let conversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] },
        });

        if (!conversation) {
            conversation = await Conversation.create({ participants: [sender, receiver] });
        }

        const newMessage = await Message.create({ conversationId: conversation._id, sender, message });

        // Son mesajı conversation'a kaydet
        await Conversation.findByIdAndUpdate(conversation._id, { lastMessage: newMessage._id })

        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Bir konuşmanın tüm mesajlarını getir
export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;

        const messages = await Message.find({ conversationId }).populate("sender", "username profilePicture");

        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};