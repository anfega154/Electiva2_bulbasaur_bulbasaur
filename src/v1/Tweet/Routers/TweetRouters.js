const express = require('express')
const router = express.Router();
const TweetController = require('../../../v1/Tweet/Controllers/Tweetcontroller')
const tweetController = new TweetController();
const check = require('../../../Utils/Middlewares/Tweets/TweetValidate')
const checkToken = require('../../../Utils/Middlewares/Auth/AuthMiddleware')

router.post('/v1/tweets',checkToken , check.tweetMiddleware,(req, res) => tweetController.createTweet(req,res));
router.get('/v1/tweets',checkToken ,(req,res) => tweetController.getTweets(req,res));
module.exports = router;     