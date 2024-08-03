// app/models/TrendingTopic.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const TrendingTopic = sequelize.define('TrendingTopic', {
  topic: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mentions: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = TrendingTopic;
