const Tweet = require('../../../domain/entities/TweetEntity');
const TweetRepository = require('../../../domain/repositories/TweetRepository');
const tweetRepository = new TweetRepository();

const add = (data) => {
    try {
        let date = new Date();
        const tweet = new Tweet(date, data.content, data.userid);
        tweetRepository.create(tweet);
    } catch (error) {
        throw error;
    }
}
const getAll = () => {
    try {
        return tweetRepository.list();
    } catch (error) {
        throw (error);
    }
}

module.exports = {
    add,
    getAll
};