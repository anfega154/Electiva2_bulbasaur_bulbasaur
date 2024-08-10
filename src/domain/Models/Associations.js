const User = require('./User');
const Follower = require('./Follower');

User.hasMany(Follower, { foreignKey: 'followerid', as: 'following' });
User.hasMany(Follower, { foreignKey: 'followingid', as: 'followers' });

Follower.belongsTo(User, { foreignKey: 'followerid', as: 'follower' });
Follower.belongsTo(User, { foreignKey: 'followingid', as: 'following' });