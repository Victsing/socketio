const {v4: uuidv4} = require("uuid")
'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const bcrypt = require("bcrypt");
const { hashSync } = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  user.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    userid: DataTypes.STRING
  },         {
    sequelize,
    modelName: 'user',
    hooks: {
      beforeCreate(user) {
        (user.userid = uuidv4())
        if (user.password) {
          user.password = hashSync(user.password, 10);
        }
      },
      beforeUpdate(user) {
        if (user.password) {
          user.password = bcrypt.hashSync(user.password, 10);
        }
      }
    },
  });
  return user;
};