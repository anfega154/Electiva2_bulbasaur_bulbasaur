const TweetRepository = require('../Repository/Tweetrepository');
const tweetRepository = new TweetRepository();

const add = async (data) => {
    try {
        await tweetRepository.create(data);
    } catch (error) {
        throw error;
    }
}

const getTweets = async (userId,page,limit) => {
    try {
        return await tweetRepository.getTweets(userId,page,limit)
    } catch (error) {
        throw (error);
    }
}

module.exports = {
    add,
    getTweets
};