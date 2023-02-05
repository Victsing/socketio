const express = require("express");
const models = require("../models");
const validateForm = require("../controllers/validateForm");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const user = models.user;
const {v4: uuidv4} = require("uuid")
router.route("/login")
  .get(async (req, res) =>{
    if (req.session.user && req.session.user.username){
      res.json({loggedIn: true, username: req.session.user.username})
    }else {
      res.json({loggedIn: false})
    }
  } )
  .post(async (req, res) => {
  validateForm(req, res);
    const { username, password } = req.body

    const users = await user.findOne({
      where: {
        username: username
      }
    })
    if (users) {
      const isSame = await bcrypt.compare(password, users.password)
      if (isSame) {
        req.session.user = {
          username: req.body.username,
          id: users.id,
          userid: users.userid
        };
        // res.status(201).send(users)
        return res.json({loggedIn: true, username: req.body.username})
      }
    }
    else{
      // res.status(401).send("Authentication failed")
      return res.json({loggedIn: false, status: "Wrong username or password"})
    }
});

router.post("/register", async (req, res) => {
  await validateForm(req, res);
  try {
    const { id } = req.params;
    const users = await user.create(req.body)
    req.session.user = {
      username: req.body.username,
      id: users.id,
      userid: users.userid
    };
    // return res.json(201).json({ users });
    return res.json({loggedIn: true, username: req.body.username})
  } catch (error) {
    // return res.status(500).json({ error: error.message });
    return res.json({loggedIn: false, status: "UserName taken"})
  }

});
module.exports = router;