const { DataTypes } = require('sequelize');
const sequelize = require('../../infrastucture/database/conection');
const crypto = require('crypto');

const Tweet = sequelize.define('Tweet', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'tweets',
  timestamps: false,
});

module.exports = Tweet;