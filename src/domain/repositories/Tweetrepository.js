class TweetRepository {
    constructor() {
        this.tweets = [];
    }

    create(tweet) {
        this.tweets.push(tweet.toJSON());
        console.log(this.tweets);
    }

    list() {
        return this.tweets;
    }
}

module.exports = TweetRepository;