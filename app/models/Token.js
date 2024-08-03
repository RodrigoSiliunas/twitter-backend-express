const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");

const User = require("./User");

// Definição do modelo Tweet
const Token = sequelize.define("Token", {
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: "uuid",
    },
    allowNull: false,
    primaryKey: true,
  },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Token;
