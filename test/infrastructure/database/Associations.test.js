const User = require('../../../src/v1/Tweet/Models/Tweets');
const Follower = require('../../../src/v1/Follow/Models/Follower');
const Tweet = require('../../../src/v1/Tweet/Models/Tweets');

jest.mock('../../../src/v1/Follow/Models/Follower');
jest.mock('../../../src/v1/Tweet/Models/Tweets');
jest.mock('../../../src/v1/Tweet/Models/Tweets');

describe('Model Associations', () => {
    beforeAll(() => {
        User.hasMany(Follower, { foreignKey: 'followerid', as: 'following' });
        User.hasMany(Follower, { foreignKey: 'followingid', as: 'followers' });
        User.hasMany(Tweet, { foreignKey: 'userid' });
        
        Follower.belongsTo(User, { foreignKey: 'followerid', as: 'follower' });
        Follower.belongsTo(User, { foreignKey: 'followingid', as: 'following' });
        Tweet.belongsTo(User, { foreignKey: 'userid' });
    });
    describe('User has many Followers (following)', () => {
        test('User has many Followers (following)', () => {
            expect(User.hasMany).toHaveBeenCalledWith(Follower, { foreignKey: 'followerid', as: 'following' });
        });
    });
    
    describe('User has many Followers (followers)', () => {
        test('User has many Followers (followers)', () => {
            expect(User.hasMany).toHaveBeenCalledWith(Follower, { foreignKey: 'followingid', as: 'followers' });
        });     
    });
    
    describe('User has many Tweets', () => {
        test('User has many Tweets', () => {
            expect(User.hasMany).toHaveBeenCalledWith(Tweet, { foreignKey: 'userid' });
        });      
    });
  
    describe('Follower belongs to User (follower)', () => {
        test('Follower belongs to User (follower)', () => {
            expect(Follower.belongsTo).toHaveBeenCalledWith(User, { foreignKey: 'followerid', as: 'follower' });
        });   
    })

    describe('Follower belongs to User (following)', () => {
        test('Follower belongs to User (following)', () => {
            expect(Follower.belongsTo).toHaveBeenCalledWith(User, { foreignKey: 'followingid', as: 'following' });
        });      
    })
    
    describe('Tweet belongs to User', () => {
        test('Tweet belongs to User', () => {
            expect(Tweet.belongsTo).toHaveBeenCalledWith(User, { foreignKey: 'userid' });
        });     
    })
});
