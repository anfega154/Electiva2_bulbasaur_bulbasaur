const TweetRepository = require('../Repository/Tweetrepository');
const tweetRepository = new TweetRepository();

const add = async (data) => {
    try {
        await tweetRepository.create(data);
    } catch (error) {
        throw error;
    }
}

const getAll = async () => {
    try {
        return await tweetRepository.list()
    } catch (error) {
        throw (error);
    }
}

module.exports = {
    add,
    getAll
};