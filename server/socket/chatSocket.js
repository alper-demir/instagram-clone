import Message from "../models/message.model.js"

const chatSocket = (io) => {
    io.on("connection", (socket) => {
        console.log(`📢 Kullanıcı bağlandı: ${socket.id}`);

        // Kullanıcıyı odaya sokma
        socket.on("joinRoom", (conversationId) => {
            socket.join(conversationId);
            console.log(`📌 Kullanıcı ${socket.id}, sohbet odasına katıldı: ${conversationId}`);
        });

        // Kullanıcıyı kişisel odaya sokma (userId)
        socket.on("joinPersonalRoom", (userId) => {
            socket.join(userId);
            console.log(`📌 Kullanıcı ${socket.id}, kişisel odaya katıldı: ${userId}`);
        });

        // Mesaj gönderme
        // socket.on("message", ({ conversationId, message }) => {
        //     io.to(conversationId).emit("receiveMessage", message);
        //     console.log(`📩 Yeni mesaj:`, message);
        // });

        socket.on("markMessagesAsSeen", async ({ conversationId, userId }) => {
            console.log("Server: Mesajlar okundu olarak işaretleniyor", conversationId, userId);

            try {
                const result = await Message.updateMany(
                    {
                        conversationId,
                        sender: userId,
                        isSeen: false
                    },
                    { $set: { isSeen: true } }
                );

                if (result.modifiedCount > 0) {
                    // Mesajlar gerçekten güncellendiyse emit et.
                    io.to(conversationId).emit("receiveMarkAsSeen", {
                        conversationId,
                        userId
                    });
                    console.log(`Updated ${result.modifiedCount} messages as seen`);
                }
            } catch (error) {
                console.error("Error marking messages as seen:", error);
            }
        });

        // Kullanıcı çıkış yaparsa
        socket.on("disconnect", () => {
            console.log(`❌ Kullanıcı ayrıldı: ${socket.id}`);
        });
    });
};

export default chatSocket;