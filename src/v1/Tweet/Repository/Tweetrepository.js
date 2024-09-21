const tweets = require('../../../Utils/helpers/Mocks/tweets')
class TweetRepository {
    constructor() {
        this.tweets = tweets.tweetsList;
    }

    create(tweet) {
        this.tweets.push(tweet.toJSON());
    }

    list() {
        return this.tweets;
    }
}

module.exports = TweetRepository;