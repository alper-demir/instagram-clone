import { Link, useParams } from "react-router-dom";
import { getOneConversationData, getOneConversationMessages, sendMessage } from "../../services/chatService";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const Chat = () => {
    const socket = io("http://localhost:3000"); // Backend URL
    const { conversationId } = useParams();
    const [messageText, setMessageText] = useState("");
    const [messages, setMessages] = useState([]);
    const [conversation, setConversation] = useState();
    const [otherParticipant, setOtherParticipant] = useState({});
    const userId = useSelector((state) => state.user.user._id);
    const messagesEndRef = useRef(null);

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
            const otherUser = conversation.participants.filter((p) => p._id !== userId);
            setOtherParticipant(otherUser[0]);
        }
    };

    const initializeSocket = () => {
        socket.on("connect", () => {
            console.log("Socket bağlandı:", socket.id);
            socket.emit("joinRoom", conversationId); // Odaya katıl
        });

        socket.on("receiveMessage", (newMessage) => {
            console.log("Yeni mesaj alındı:", newMessage);
            setMessages((prev) => [...prev, newMessage]); // Mesajları güncelle
        });

        // Temizleme fonksiyonu
        return () => {
            socket.off("receiveMessage");
            socket.disconnect();
        };
    };

    const handleMessageChange = (e) => setMessageText(e.target.value);

    const handleSendMessage = async () => {
        if (messageText.length < 1) return;
        const { newMessage } = await sendMessage(userId, otherParticipant._id, messageText);
        if (newMessage) {
            setMessageText("");
            // Mesajı socket ile göndermeye gerek yok, zaten server emit ediyor
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        getConversationData();
        getConversationMessages();
        const cleanup = initializeSocket();

        return () => cleanup(); // Komponent unmount olduğunda temizle
    }, [conversationId]);

    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="p-4 py-5 flex justify-between border-b-[1px] border-light-border dark:border-dark-border">
                <div className="flex gap-x-3 items-center">
                    <Link to={`/${otherParticipant.username}`}>
                        <img
                            src={otherParticipant.profilePicture}
                            alt="Avatar"
                            className="w-11 h-11 rounded-full object-cover"
                        />
                    </Link>
                    <Link to={`/${otherParticipant.username}`}>{otherParticipant.username}</Link>
                </div>
                {/* Icons */}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                    message.sender._id === userId ? (
                        <div key={message._id} className="flex flex-col items-end my-2">
                            <div className="max-w-[65%] bg-[#3797F0] text-white p-3 rounded-l-2xl rounded-r-sm shadow-sm">
                                <p>{message.message}</p>
                            </div>
                            <span className="text-xs mt-1">
                                {new Date(message.createdAt).toLocaleTimeString()}
                            </span>
                        </div>
                    ) : (
                        <div key={message._id} className="flex flex-col items-start my-2">
                            <div className="max-w-[65%] bg-light-border dark:bg-dark-border p-3 rounded-r-2xl rounded-l-sm shadow-sm">
                                <p>{message.message}</p>
                            </div>
                            <span className="text-xs mt-1">
                                {new Date(message.createdAt).toLocaleTimeString()}
                            </span>
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