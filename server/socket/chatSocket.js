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
        socket.on("message", ({ conversationId, message }) => {
            io.to(conversationId).emit("receiveMessage", message);
            console.log(`📩 Yeni mesaj:`, message);
        });

        // Kullanıcı çıkış yaparsa
        socket.on("disconnect", () => {
            console.log(`❌ Kullanıcı ayrıldı: ${socket.id}`);
        });
    });
};

export default chatSocket;