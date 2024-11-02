const Tweet = require('../../Tweet/Models/Tweets')
const RepositoryBase = require('../../../infrastucture/database/Repository');
const follow = require('../../Follow/Models/Follower')
const User = require('../../User/Models/User')

class TweetRepository extends RepositoryBase {
    constructor() {
        super(Tweet);
        this.follow = follow
        this.userModel = User
    }

    async create(tweet) {
        try {
            return await this.model.create(tweet);
        } catch (error) {
            throw error;
        }
    }

    async getTweetsByUser(userId, page, limit) {
        try {
            const offset = (page - 1) * limit;
    
            const results = await this.model.findAll({
                where: { userid: userId },
                attributes: ['created_at', 'content', 'userid'],
                order: [['created_at', 'DESC']],
                limit: parseInt(limit),
                offset: parseInt(offset)
            });
    
            return results;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getFeedTweets(userId, page, limit) {
        try {
            const offset = (page - 1) * limit;
    
            const followingRecords = await this.follow.findAll({
                where: { followerid: userId },
            });
            
            const followingIds = Array.isArray(followingRecords)
                ? followingRecords.map(follow => follow.followingId)
                : [];
            
            const userAndFollowingIds = [userId, ...followingIds];
    
            const tweets = await this.model.findAll({
                whereIn: {
                    userid: userAndFollowingIds
                },
                attributes: ['id', 'created_at', 'content'],
                order: [['created_at', 'DESC']],
                limit: parseInt(limit),
                offset: parseInt(offset),
                include: [{
                    model: this.userModel,
                    attributes: ['id', 'name', 'username', 'avatarurl']
                }]
            });
    
            return tweets;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}


module.exports = TweetRepository;