const express = require('express')
const router = express.Router();
const FollowController = require('../Controllers/FollowController')
const followController = new FollowController();


router.get('/v1/follow/count',(req,res) => followController.count(req,res));
router.get('/v1/followers',(req,res) => followController.getFollowers(req,res));
router.get('/v1/followings',(req,res) => followController.getFollowings(req,res));
router.get('/v1/follow',(req,res) => followController.follow(req,res));

  module.exports = router;