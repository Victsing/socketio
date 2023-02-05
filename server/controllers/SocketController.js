const redisCLient = require('../redis')

module.exports.authorizeUser = (socket, next) => {
  if (!socket.request.session || !socket.request.session.user) {
    console.log("Bad Request");
    next(new Error("Not authorized"))
  }else {
    next()
  }
}

module.exports.initializeUser = async socket => {
  socket.user = { ...socket.request.session.user };
  await redisCLient.hset(
    `userid:${socket.user.username}`,
    "userid",
    socket.user.userid
  );
  const friendList = await redisCLient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );
  console.log(`${socket.user.username} friends:`, friendList);
  socket.emit("friends", friendList);
};

module.exports.addFriend = async (socket, friendName, cb) => {
  if (friendName === socket.user.username) {
    cb({ done: false, errorMsg: "Cannot add self!" });
    return;
  }
  const friendUserID = await redisCLient.hget(
    `userid:${friendName}`,
    "userid"
  );
  const currentFriendList = await redisCLient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );
  if (!friendUserID) {
    cb({ done: false, errorMsg: "User doesn't exist!" });
    return;
  }
  if (currentFriendList && currentFriendList.indexOf(friendName) !== -1) {
    cb({ done: false, errorMsg: "Friend already added!" });
    return;
  }

  await redisCLient.lpush(`friends:${socket.user.username}`, friendName);
  cb({ done: true });
};