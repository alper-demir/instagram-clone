import axios from "axios"

const CONVERSATION_API_URL = import.meta.env.VITE_API_CONVERSATION_URL;
const MESSAGE_API_URL = import.meta.env.VITE_API_MESSAGES_URL;
const token = localStorage.getItem("token");

export const getConversations = async (userId) => {
    console.log(userId, CONVERSATION_API_URL);

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