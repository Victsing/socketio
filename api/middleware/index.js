const jwt = require('jsonwebtoken')

const authenticationToken= async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
    if (err) {
      return res.sendStatus(401)
    }
    req.user = user
    next()
  })
}

const authenticationRefreshToken = async(req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
    if (err) {
      return res.sendStatus(401)
    }
    delete user.iat
    delete user.exp
    const refreshedToken = authenticationToken(user)
    res.send({
      refreshToken: refreshedToken
    })
  })
}


module.exports = {
  authenticationToken,
  authenticationRefreshToken
}