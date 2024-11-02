const express = require('express');
const BaseController = require('../../../infrastucture/api/BaseControlller');
const HttpStatus = require('../../../Utils/helpers/Httpstatus')
const tweetService = require('../Services/TweetsService')
const { getIdOnsession} = require('../../../Utils/Middlewares/Auth/TokenMiddleware')

class TweetController extends BaseController {
    constructor() {
        super();
    }


     async createTweet(req,res) {
        try {
        const userid = getIdOnsession(req);
        req.body.userid = userid;
        await tweetService.add(req.body)
         const message = res.t('messages.Tweet_created_successfully');
         this.success(res,null,message)
        } catch (err) {
         this.error(res, err, HttpStatus.BAD_REQUEST);
        }
     }

       async getTweetsByUser(req, res) {
        try {
            const userid = getIdOnsession(req);
            const {page = 1 , limit = 10} = req.query;
            const tweets = await tweetService.getTweets(userid,page,limit);
            const message = res.t('messages.Tweets_retrieved_successfully');
            this.success(res, tweets, message);
        } catch (err) {
            this.error(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getMyFeed(req, res) {
        try {
            const userid = getIdOnsession(req);
            const {page = 1 , limit = 10} = req.query;
            const tweets = await tweetService.getMyFeed(userid,page,limit);
            const message = res.t('messages.Tweets_retrieved_successfully');
            this.success(res, tweets, message);
        } catch (err) {
            console.error(err)
            this.error(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

module.exports = TweetController;