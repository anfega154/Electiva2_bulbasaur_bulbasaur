const express = require('express')
const router = express.Router();
const UserController = require('../../../infrastucture/api/v1/User/Usercontroller')
const TweetController = require('../../../infrastucture/api/v1/Tweet/Tweetcontroller')
const check = require('../../../Utils/Middlewares/User/Createuser')
const checkLogin = require('../../../Utils/Middlewares/Auth/Login')
const userController = new UserController();
const tweetController = new TweetController();


router.get('/v1/user', (req, res) => userController.getUser(req, res));
router.post('/v1/user',check.createUsermiddleware,(req, res) => userController.createUser(req, res));
router.post('/v1/login',checkLogin.loginMiddleware,(req,res) => userController.login(req,res));
router.post('/v1/tweets',(req,res) => tweetController.createTweet(req,res));
router.get('/v1/tweets',(req,res) => tweetController.getAll(req,res));

  module.exports = router;