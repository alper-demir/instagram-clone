import { Server } from "socket.io";
import chatSocket from "../socket/chatSocket.js";

let io; // global

const socketConfig = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || "/",
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

export { io }
export default socketConfig 