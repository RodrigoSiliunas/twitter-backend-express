const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");

// Definição do modelo Tweet
const Tweet = sequelize.define("Tweet", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.STRING(255), // Limita o tamanho do texto a 255 caracteres
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
});

module.exports = Tweet;
