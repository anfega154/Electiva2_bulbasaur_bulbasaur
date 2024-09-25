const express = require('express')
const router = express.Router();
const FollowController = require('../Controllers/FollowController')
const followController = new FollowController();
const checkToken = require('../../../Utils/Middlewares/Auth/AuthMiddleware')

/**
 * @swagger
 * /api/v1/follow/byusername:
 *   get:
 *     summary: Valida el username y si existe lo puede seguir
 *     parameters:
 *       - in: query
 *         name: followerid
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario que quiere seguir a otro
 *       - in: query
 *         name: usernamefollowingid
 *         schema:
 *           type: string
 *         required: true
 *         description: Username del usuario a seguir
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acción exitosa, el usuario ahora sigue al otro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: success action
 *                 body:
 *                   type: string
 *                   example: "squarol now is following adri"
 *       400:
 *         description: Error, el usuario ya sigue a este perfil o algún problema con los datos enviados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: El usuario ya sigue a este perfil.
 *       401:
 *         description: Error de autenticación, token no válido o no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Token inválido o no proporcionado
 */
router.get('/v1/follow/byusername', checkToken, (req, res) => followController.followByUsername(req, res));
router.get('/v1/follow/count',checkToken,(req,res) => followController.count(req,res));
router.get('/v1/followers',checkToken,(req,res) => followController.getFollowers(req,res));
router.get('/v1/followings',checkToken,(req,res) => followController.getFollowings(req,res));
router.get('/v1/follow',checkToken,(req,res) => followController.follow(req,res));
router.get('/v1/follwersandfollowings',checkToken,(req,res) => followController.followersAndFollowings(req,res));

  module.exports = router;