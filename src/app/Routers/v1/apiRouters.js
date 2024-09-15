const express = require('express')
const router = express.Router();
const TweetController = require('../../../infrastucture/api/v1/Tweet/Tweetcontroller')
const FollowController = require('../../../infrastucture/api/v1/Follow/FollowController')
const tweetController = new TweetController();
const followController = new FollowController();

router.post('/v1/tweets',(req,res) => tweetController.createTweet(req,res));
router.get('/v1/tweets',(req,res) => tweetController.getAll(req,res));
router.get('/v1/follow',(req,res) => followController.follow(req,res));
router.get('/v1/follow/count',(req,res) => followController.count(req,res));
router.get('/v1/followers',(req,res) => followController.getFollowers(req,res));
router.get('/v1/followings',(req,res) => followController.getFollowings(req,res));

  module.exports = router;