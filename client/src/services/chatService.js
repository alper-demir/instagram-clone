import axios from "axios"

const CONVERSATION_API_URL = import.meta.env.VITE_API_CONVERSATION_URL;
const MESSAGE_API_URL = import.meta.env.VITE_API_MESSAGE_URL;
const token = localStorage.getItem("token");

export const getConversations = async (userId) => {
    try {
        const response = await axios.get(`${CONVERSATION_API_URL}/${userId}`);
        console.log(response.data.conversations);
        if (response.data.conversations.length > 0) {
            return { conversations: response.data.conversations, type: "success" }
        }
        return { conversations: [], type: "error" }

    } catch (error) {
        return { message: error.message, type: "error" }
    }
}

export const startConversation = async (sender, receiver) => { // Daha önce mesajlaşma olmadığı için önce bir conversation oluştur.
    try {
        const response = await axios.post(`${CONVERSATION_API_URL}`, { sender, receiver });
        console.log(response.data);
        return { conversation: response.data }

    } catch (error) {
        return { message: error.message, type: "error" }
    }
}

export const getOneConversationMessages = async (conversationId) => {
    try {
        const response = await axios.get(`${MESSAGE_API_URL}/${conversationId}`);
        console.log(response.data);
        return { messages: response.data.messages, type: "success" }

    } catch (error) {
        return { message: error.message, type: "error" }
    }
}

export const getOneConversationData = async (conversationId) => {
    try {
        const response = await axios.get(`${CONVERSATION_API_URL}/conversation/${conversationId}`);
        console.log(response.data);
        return { conversation: response.data.conversation, type: "success" }

    } catch (error) {
        return { message: error.message, type: "error" }
    }
}

export const sendMessage = async (sender, receiver, message) => {
    try {
        const response = await axios.post(`${MESSAGE_API_URL}`, { sender, receiver, message });
        if (!response) return;
        return { newMessage: response.data }
    } catch (error) {
        return { message: error.message, type: "error" }
    }
}