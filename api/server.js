require("dotenv").config();
const express = require("express");
const compression = require("compression");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mainRouter = require("./routes");
const { adminSocket } = require("./sockets/sockets");

const app = express();
app.use(compression());
app.use(
  cors({
    origin: `http://${process.env.HOST || "localhost"}:${
      process.env.PORT_CLIENT || 8000
    }`,
    credentials: true,
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(mainRouter);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `http://${process.env.HOST || "localhost"}:${
      process.env.PORT_CLIENT || 8000
    }`,
    methods: ["GET", "POST"],
  },
});

// ADMIN SOCKET


io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data)
    console.log(`User with id:${socket.id} joined room:${data}`)
  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data)
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// app.use((req, res, next) => {
//     return res.sendStatus(500);
// })

module.exports = server;
