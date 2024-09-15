const User = require('../../v1/User/Models/User');
const Follower = require('../../v1/Follow/Models/Follower');

User.hasMany(Follower, { foreignKey: 'followerid', as: 'following' });
User.hasMany(Follower, { foreignKey: 'followingid', as: 'followers' });

Follower.belongsTo(User, { foreignKey: 'followerid', as: 'follower' });
Follower.belongsTo(User, { foreignKey: 'followingid', as: 'following' });