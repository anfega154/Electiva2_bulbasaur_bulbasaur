const crypto = require('crypto');

class TweetEntity {
    constructor(date, content, userId) {
        this.id = crypto.randomBytes(16).toString('hex');
        this.date = date;
        this.content = content;
        this.userId = userId;
    }

    toJSON() {
        return {
            id: this.id,
            date: this.date,
            content: this.content,
            userId: this.userId
        };
    }
}

module.exports = TweetEntity;