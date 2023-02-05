import {io}  from "socket.io-client"

const socketConnection = user => new io("http://localhost:4000",{
  autoConnect: false,
  withCredentials: true
})

export default socketConnection