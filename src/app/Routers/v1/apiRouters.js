const express = require('express')
const router = express.Router();
const UserController = require('../../../infrastucture/api/v1/Usercontroller')
const userController = new UserController();


router.get('/v1/user', (req, res) => userController.getUser(req, res));
router.post('/v1/user', (req, res) => userController.createUser(req, res));

router.get("/",(req,res)=>{

    res.status(200).json({
      status: " success",
      mensaje: "Bienvenido"
    });
  })

  module.exports = router;