const models = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = models.user;

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1800s'})
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1y'})
}
const createUser = async (req, res) => {
  try {
    const users = await user.create(req.body);
    return res.status(201).json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await user.findAll({});
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await user.findOne({ where: { id: id } });
    if (user) {
      return res.status(200).json({ users });
    }
    return res.status(404).send("User with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await user.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedUser = await user.findOne({ where: { id: id } });
      return res.status(200).json({ user: updatedUser });
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await user.destroy({
      where: { id: id }
    });
    if (deleted) {
      return res.status(204).send("User deleted");
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const authenticate = async (req, res) => {
  try {
    const emailValue = req.body.email;
    const searchedUser = await user.findOne({
      where: { email: emailValue }
    });
    if (searchedUser) {
      if (await searchedUser.validPassword(req.body.password)) {
        // if (bcrypt.compareSync(req.body.password, searchedUser.password)) {
        const token = jwt.sign({ id: searchedUser.id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" });
        const refreshToken = jwt.sign({ id: searchedUser.id },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1y" });
        res.json({
          status: "success",
          message: "user found!!!",
          data: { user: searchedUser, token: token, refreshToken: refreshToken }
        });
      } else {
        res.json({
          status: "error",
          message: "Invalid email/password!!!",
          data: null
        });
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  authenticate
};