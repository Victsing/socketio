"use strict";
const { Model } = require("sequelize");
const jwt = require("jsonwebtoken");
module.exports = (sequelize, DataTypes) => {
  class adminChat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  adminChat.init({
      admin_id: DataTypes.STRING,
      user_id: DataTypes.STRING,
      url: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "adminChat",
      hooks: {
        beforeCreate(chat) {
          chat.url = jwt.sign({}, process.env.JWT_SECRET, {
            expiresIn: "1d",
            algorithm: "HS512"
          });
        }
      }
      /*
          hooks: adminChat.addHook("beforeCreate", async (chat) => {
            chat.url = jwt.sign({}, process.env.JWT_SECRET, {
              expiresIn: "1d",
              algorithm: "HS512"
            })
          }),
      */
    });
  return adminChat;
};