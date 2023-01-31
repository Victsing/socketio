const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const routes = require('./routes')
const bodyParser = require('body-parser')


const server = express()

const corsOptions = {
  origin: "*",
};

server.use(cors(corsOptions));
server.use(bodyParser.json())
server.use('/api', routes)

server.listen(8000, "0.0.0.0", () => {
  console.log("Server listening")
})
