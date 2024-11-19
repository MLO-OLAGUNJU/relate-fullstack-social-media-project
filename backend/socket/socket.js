import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; //uerId: socketId

io.on("connection", (socket) => {
  console.log("User connection established", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUser", Object.keys(userSocketMap)); //[1,2,3,4,5,]

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

export { io, server, app };
