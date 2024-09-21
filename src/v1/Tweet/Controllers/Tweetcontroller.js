const express = require('express');
const BaseController = require('../../../infrastucture/api/BaseControlller');
const HttpStatus = require('../../../Utils/helpers/Httpstatus')
const tweetService = require('../Services/TweetsService')

class TweetController extends BaseController {
    constructor() {
        super();
    }


     async createTweet(req,res) {
        try {
        await tweetService.add(req.body)
         const message = res.t('messages.Tweet_created_successfully');
         this.success(res,null,message)
        } catch (err) {
         this.error(res, err, HttpStatus.BAD_REQUEST);
        }
     }

       async getAll(req, res) {
        try {
            const tweets = await tweetService.getAll();
            const message = res.t('messages.Tweets_retrieved_successfully');
            this.success(res, tweets, message);
        } catch (err) {
            this.error(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

module.exports = TweetController;