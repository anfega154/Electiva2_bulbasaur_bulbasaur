const Tweet = require('../../Tweet/Models/Tweets')
const RepositoryBase = require('../../../infrastucture/database/Repository');

class TweetRepository extends RepositoryBase {
    constructor() {
        super(Tweet);
    }

    async create(tweet) {
        try {
            return await this.model.create(tweet);
        } catch (error) {
            throw error;
        }
    }

    async getTweets(userId, page, limit ) {
        try {
            const query = `
                SELECT t.created_at AS date, t.content, t.userid
                FROM Tweets AS t
                INNER JOIN users AS u ON t.userid = u.id
                LEFT JOIN followers AS f1 ON f1.followingid = t.userid
                LEFT JOIN followers AS f2 ON f2.followerid = t.userid
                WHERE (f1.followerid = :followerId AND f2.followingid = :followerId)
                LIMIT :limit OFFSET :offset
            `;
            const offset = (page - 1) * limit;
            const results = await this.model.sequelize.query(query, {
                replacements: { followerId: userId, limit: parseInt(limit), offset: parseInt(offset) },
                type: this.model.sequelize.QueryTypes.SELECT
            });
    
            return results;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TweetRepository;