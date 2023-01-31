'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt');
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

        async validPassword(password) {
            return await bcrypt.compareSync(password, this.password)
        }
    }

    user.init({
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            role: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'user',
            hooks: {
                beforeCreate(user) {
                    if (user.password) {
                        user.password = bcrypt.hashSync(user.password, 10);
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
}