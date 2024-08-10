const { DataTypes } = require('sequelize');
const sequelize = require('../../infrastucture/database/conection');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;
require ('./Associations')
