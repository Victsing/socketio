const Redis = require('ioredis')
require("dotenv").config()
//const redisClient = new Redis()
const redisClient = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST, {
  password: process.env.REDIS_PASSWORD
});
module.exports = redisClient