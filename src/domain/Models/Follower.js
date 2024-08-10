const { DataTypes } = require('sequelize');
const sequelize = require('../../infrastucture/database/conection');
const User = require('./User');

const Follower = sequelize.define('Follower', {
    followerid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    followingid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'followers',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['followerid', 'followingid']
        }
    ]
});

module.exports = Follower;
