const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log(`app is running on ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected successfull");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

// Cấu hình Socket.IO để lắng nghe các kết nối từ client
io.on("connection", (socket) => {
  console.log("A client connected");

  // Xử lý tin nhắn từ client
  socket.on("message", (data) => {
    console.log("Received message:", data);

    // Gửi tin nhắn đến tất cả các client khác
    socket.broadcast.emit("message", data);
  });

  // Xử lý khi client ngắt kết nối
  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

const UserRouter = require("../server/routers/user.router");
app.use("/api/v1/users/", UserRouter);

const AuthRouter = require("../server/routers/auth.router");
app.use("/api/v1/auth/", AuthRouter);

const ChatGPTRouter = require("../server/routers/chat.router");
app.use("/api/v1/chatGPT/", ChatGPTRouter);

const PostRouter = require("../server/routers/post.router");
app.use("/api/v1/posts/", PostRouter);
