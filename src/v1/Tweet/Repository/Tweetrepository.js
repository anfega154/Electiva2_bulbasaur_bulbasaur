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

    async list() {
        try {
            return await this.model.findAll();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TweetRepository;