import { Server } from "socket.io";
import chatSocket from "../socket/chatSocket.js";

const socketConfig = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // Frontend URL
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("Yeni bir kullanıcı bağlandı:", socket.id);

        socket.on("disconnect", () => {
            console.log("Bir kullanıcı ayrıldı:", socket.id);
        });
    });

    chatSocket(io);

    return io;
};

export default socketConfig;