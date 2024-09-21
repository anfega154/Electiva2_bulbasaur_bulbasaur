const express = require('express')
const router = express.Router();
const UserController = require('../Controllers/Usercontroller')
const userController = new UserController();
const check = require('../../../Utils/Middlewares/User/Createuser')
const checkToken = require('../../../Utils/Middlewares/Auth/AuthMiddleware')


router.get('/v1/user', checkToken,(req, res) => userController.getUser(req, res));
router.post('/v1/user',check.createUsermiddleware,(req, res) => userController.createUser(req, res));

module.exports = router;