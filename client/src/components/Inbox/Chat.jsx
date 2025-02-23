import { Link, useParams } from "react-router-dom";
import { getOneConversationData, getOneConversationMessages, sendMessage } from "../../services/chatService";
import { useEffect, useState, useRef } from "react";
import { useSelector } from 'react-redux';

const Chat = () => {
    const { conversationId } = useParams();
    const [messageText, setMessageText] = useState("");
    const [messages, setMessages] = useState([]);
    const [conversation, setConversation] = useState();
    const [otherParticipant, setOtherParticipant] = useState({});
    const userId = useSelector(state => state.user.user._id);
    const messagesEndRef = useRef(null); // To scroll to the bottom

    const getConversationMessages = async () => {
        const { messages, type } = await getOneConversationMessages(conversationId);
        if (type === "success") {
            setMessages(messages);
        }
    };

    const getConversationData = async () => {
        const { conversation, type } = await getOneConversationData(conversationId);
        if (type === "success") {
            setConversation(conversation);
            const otherUser = conversation.participants.filter(p => p._id !== userId);
            setOtherParticipant(otherUser[0]);
        }
    };

    const handleMessageChange = (e) => setMessageText(e.target.value);

    const handleSendMessage = async () => {
        if (messageText.length < 1) return;
        const { newMessage } = await sendMessage(userId, otherParticipant._id, messageText);
        if (newMessage) {
            setMessageText(""); // Clear input after sending
            getConversationMessages(); // Refresh messages
        }
    };

    // Scroll to bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        getConversationData();
        getConversationMessages();
    }, [conversationId]);

    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="p-4 py-5 flex justify-between border-b-[1px] border-light-border dark:border-dark-border">
                <div className="flex gap-x-3 items-center">
                    <Link to={`/${otherParticipant.username}`}>
                        <img src={otherParticipant.profilePicture} alt="Avatar" className="w-11 h-11 rounded-full object-cover" />
                    </Link>
                    <Link to={`/${otherParticipant.username}`}>{otherParticipant.username}</Link>
                </div>
                <div className="flex gap-x-4 items-center">
                    {/* Icons remain unchanged */}
                    <div className="cursor-pointer">
                        <svg aria-label="Sesli Arama" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">{/* SVG Path */}</svg>
                    </div>
                    <div className="cursor-pointer">
                        <svg aria-label="Görüntülü arama" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">{/* SVG Path */}</svg>
                    </div>
                    <div className="cursor-pointer">
                        <svg aria-label="Konuşma Bilgileri" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">{/* SVG Path */}</svg>
                    </div>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map(message => (
                    message.sender._id === userId ? (
                        <div key={message._id} className="flex flex-col items-end my-2">
                            <div className="max-w-[65%] bg-[#3797F0] text-white p-3 rounded-l-2xl rounded-r-sm shadow-sm">
                                <p>{message.message}</p>
                            </div>
                            <span className="text-xs mt-1">{new Date(message.createdAt).toLocaleTimeString()}</span>
                        </div>
                    ) : (
                        <div key={message._id} className="flex flex-col items-start my-2">
                            <div className="max-w-[65%] bg-light-border dark:bg-dark-border p-3 rounded-r-2xl rounded-l-sm shadow-sm">
                                <p>{message.message}</p>
                            </div>
                            <span className="text-xs mt-1">{new Date(message.createdAt).toLocaleTimeString()}</span>
                        </div>
                    )
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Fixed Input */}
            <div className="p-4 border-t-[1px] border-light-border dark:border-dark-border">
                <div className="flex items-center relative">
                    <input
                        onChange={handleMessageChange}
                        value={messageText}
                        placeholder="Mesaj..."
                        type="text"
                        className="!text-sm !rounded-full flex-1 !pl-5 !pr-20 border-[1px] !py-3 border-light-border dark:border-dark-border"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="absolute right-3 text-sm cursor-pointer hover:text-sky-500 font-semibold"
                    >
                        Gönder
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;