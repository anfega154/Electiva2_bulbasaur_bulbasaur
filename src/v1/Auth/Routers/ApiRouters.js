const express = require('express')
const router = express.Router();
const checkLogin = require('../../../Utils/Middlewares/Auth/Login')
const AuthController = require('../../Auth/Controllers/AuthController')
const authController = new AuthController()


router.post('/v1/login',checkLogin.loginMiddleware,(req,res) => authController.login(req,res));

module.exports = router;