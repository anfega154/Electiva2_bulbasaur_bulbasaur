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
        return await tweetRepository.getTweetsByUser(userId,page,limit)
    } catch (error) {
        throw (error);
    }
}

const getMyFeed = async (userId,page,limit) => {
    try {
        return await tweetRepository.getFeedTweets(userId,page,limit)
    } catch (error) {
        throw (error);
    }
}

module.exports = {
    add,
    getTweets,
    getMyFeed
};