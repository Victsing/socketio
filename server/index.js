const express = require('express');
const {Server} =require('socket.io')
const helmet = require("helmet");
const cors = require("cors")
const app = express();
const authRouter = require("./router/auth");
const { sessionMiddleware, wrap, corsConfig } = require("./controllers/ServerControllers");
const { authorizeUser, addFriend, initializeUser } = require("./controllers/SocketController");
const server = require ("http").createServer(app)
require("dotenv").config()
const io = new Server(server, {
  cors: corsConfig
})

app.use(helmet());
app.use(cors(corsConfig))
app.use(express.json());
app.use(sessionMiddleware)
app.use("/auth", authRouter)


io.use((wrap(sessionMiddleware)))
io.use(authorizeUser)
io.on("connect", socket => {
  initializeUser(socket)
  socket.on("add_friend", (friendName, cb) => {
    addFriend(socket, friendName, cb)})
})

server.listen(4000, () => {
  console.log("Server running on port 4000")
})