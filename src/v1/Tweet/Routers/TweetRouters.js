const express = require('express')
const router = express.Router();
const TweetController = require('../../../v1/Tweet/Controllers/Tweetcontroller')
const tweetController = new TweetController();

router.post('/v1/tweets',(req,res) => tweetController.createTweet(req,res));
router.get('/v1/tweets',(req,res) => tweetController.getAll(req,res));
module.exports = router;