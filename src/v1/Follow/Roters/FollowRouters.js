const express = require('express')
const router = express.Router();
const FollowController = require('../Controllers/FollowController')
const followController = new FollowController();
const checkToken = require('../../../Utils/Middlewares/Auth/AuthMiddleware')


router.get('/v1/follow/count',checkToken,(req,res) => followController.count(req,res));
router.get('/v1/followers',checkToken,(req,res) => followController.getFollowers(req,res));
router.get('/v1/followings',checkToken,(req,res) => followController.getFollowings(req,res));
router.get('/v1/follow',checkToken,(req,res) => followController.follow(req,res));

  module.exports = router;