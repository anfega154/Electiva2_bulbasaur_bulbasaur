const Tweet = require('../../Tweet/Models/Tweets')
const RepositoryBase = require('../../../infrastucture/database/Repository');
const follow = require('../../Follow/Models/Follower')

class TweetRepository extends RepositoryBase {
    constructor() {
        super(Tweet);
        this.follow = follow
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
    
            // First, get the IDs of users the current user is following
            const followingRecords = await this.follow.findAll({
                where: { followerid: userId }, // Use lowercase "followerid"
            });
            
            // Check if followingRecords is an array and map the followingIds
            const followingIds = Array.isArray(followingRecords)
                ? followingRecords.map(follow => follow.followingId)
                : [];
            
            // Include the user's own ID in the list to also fetch their tweets
            const userAndFollowingIds = [userId, ...followingIds];
    
            // Then, get the tweets from those users
            const tweets = await this.model.findAll({
                whereIn: {
                    userid: userAndFollowingIds
                },
                attributes: ['created_at', 'content', 'userid'],
                order: [['created_at', 'DESC']],
                limit: parseInt(limit),
                offset: parseInt(offset)
            });
    
            return tweets;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}


module.exports = TweetRepository;