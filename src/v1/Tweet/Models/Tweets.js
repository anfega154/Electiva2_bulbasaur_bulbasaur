const { DataTypes } = require('sequelize');
const sequelize = require('../../../infrastucture/database/conection');
const crypto = require('crypto');
const User = require('../../User/Models/User');

const Tweet = sequelize.define('Tweet', {
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: User,
        key: 'id',
    },
},
}, {
  tableName: 'tweets',
  timestamps: false,
});

module.exports = Tweet;