const express = require('express')
const router = express.Router();
const UserController = require('../../../infrastucture/api/v1/User/Usercontroller')
const TweetController = require('../../../infrastucture/api/v1/Tweet/Tweetcontroller')
const FollowController = require('../../../infrastucture/api/v1/Follow/FollowController')
const check = require('../../../Utils/Middlewares/User/Createuser')
const checkLogin = require('../../../Utils/Middlewares/Auth/Login')
const userController = new UserController();
const tweetController = new TweetController();
const followController = new FollowController();


router.get('/v1/user', (req, res) => userController.getUser(req, res));
router.post('/v1/user',check.createUsermiddleware,(req, res) => userController.createUser(req, res));
router.post('/v1/login',checkLogin.loginMiddleware,(req,res) => userController.login(req,res));
router.post('/v1/tweets',(req,res) => tweetController.createTweet(req,res));
router.get('/v1/tweets',(req,res) => tweetController.getAll(req,res));
router.get('/v1/follow',(req,res) => followController.follow(req,res));
router.get('/v1/follow/count',(req,res) => followController.count(req,res));
router.get('/v1/followers',(req,res) => followController.getFollowers(req,res));

  module.exports = router;