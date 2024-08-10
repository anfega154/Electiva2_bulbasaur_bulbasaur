const express = require('express')
const router = express.Router();
const UserController = require('../../../infrastucture/api/v1/Usercontroller')
const check = require('../../../Utils/Middlewares/User/Createuser')
const checkLogin = require('../../../Utils/Middlewares/Auth/Login')
const userController = new UserController();


router.get('/v1/user', (req, res) => userController.getUser(req, res));
router.post('/v1/user',check.createUsermiddleware,(req, res) => userController.createUser(req, res));
router.post('/v1/login',checkLogin.loginMiddleware,(req,res) => userController.login(req,res));

router.get("/",(req,res)=>{

    res.status(200).json({
      status: " success",
      mensaje: "Bienvenido"
    });
  })

  module.exports = router;