const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const path=require("path")
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["POST", "GET"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", ({ roomId }) => {
    console.log(roomId);
    socket.join(roomId);
  });
  socket.on("send_message", (messageData) => {
    socket.to(messageData.roomId).emit("receive_message", messageData);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(5000, () => {
  console.log("server is running on port 5000");
});
