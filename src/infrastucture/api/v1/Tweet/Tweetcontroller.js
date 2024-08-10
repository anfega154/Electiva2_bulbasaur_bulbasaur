const express = require('express');
const BaseController = require('../../BaseControlller');
const HttpStatus = require('../../../../Utils/helpers/Httpstatus')
const tweetService = require('../../../../app/services/Tweet/TweetsService')

class TweetController extends BaseController {
    constructor() {
        super();
    }


     createTweet(req,res) {
        try {
        tweetService.add(req.body)
         const message = res.t('messages.Tweet_created_successfully');
         this.success(res,null,message)
        } catch (err) {
         this.error(res, err, HttpStatus.BAD_REQUEST);
        }
     }

       getAll(req, res) {
        try {
            const tweets = tweetService.getAll();
            const message = res.t('messages.user_retrieved_successfully');
            this.success(res, tweets, message);
        } catch (err) {
            this.error(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

module.exports = TweetController;