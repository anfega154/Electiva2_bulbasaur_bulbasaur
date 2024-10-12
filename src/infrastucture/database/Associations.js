const User = require('../../v1/User/Models/User');
const Follower = require('../../v1/Follow/Models/Follower');
const Tweet = require('../../v1/Tweet/Models/Tweets')

User.hasMany(Follower, { foreignKey: 'followerid', as: 'following' });
User.hasMany(Follower, { foreignKey: 'followingid', as: 'followers' });
User.hasMany(Tweet,{foreignKey:'userid'})

Follower.belongsTo(User, { foreignKey: 'followerid', as: 'follower' });
Follower.belongsTo(User, { foreignKey: 'followingid', as: 'following' });
Tweet.belongsTo(User,{foreignKey:'userid'})