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
/**
 * @swagger
 * /api/v1/follow/count:
 *   get:
 *     summary: Obtiene la cantidad de seguidores y seguidos de un usuario
 *     parameters:
 *       - in: query
 *         name: userid
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario para obtener la cuenta de seguidores y seguidos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Número de seguidores y seguidos obtenido con éxito
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
 *                   type: object
 *                   properties:
 *                     followers:
 *                       type: integer
 *                       example: 150
 *                     followings:
 *                       type: integer
 *                       example: 200
 *       400:
 *         description: Error al obtener los datos
 */
router.get('/v1/follow/count',checkToken,(req,res) => followController.count(req,res));

/**
 * @swagger
 * /api/v1/followers:
 *   get:
 *     summary: Obtiene la lista de seguidores de un usuario
 *     parameters:
 *       - in: query
 *         name: userid
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario para obtener la lista de seguidores
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de página para la paginación (por defecto es 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Límite de seguidores por página (por defecto es 10)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de seguidores obtenida con éxito
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       followerid:
 *                         type: integer
 *                         example: 123
 *                       username:
 *                         type: string
 *                         example: follower_user
 *       400:
 *         description: Error al obtener la lista de seguidores
 */
router.get('/v1/followers',checkToken,(req,res) => followController.getFollowers(req,res));

/**
 * @swagger
 * /api/v1/followings:
 *   get:
 *     summary: Obtiene la lista de usuarios a los que sigue un usuario
 *     parameters:
 *       - in: query
 *         name: userid
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario para obtener la lista de seguidos
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de página para la paginación (por defecto es 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Límite de usuarios por página (por defecto es 10)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios seguidos obtenida con éxito
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       followingid:
 *                         type: integer
 *                         example: 456
 *                       username:
 *                         type: string
 *                         example: followed_user
 *       400:
 *         description: Error al obtener la lista de usuarios seguidos
 */
router.get('/v1/followings',checkToken,(req,res) => followController.getFollowings(req,res));

/**
 * @swagger
 * /api/v1/follow:
 *   get:
 *     summary: Permite a un usuario seguir a otro
 *     parameters:
 *       - in: query
 *         name: followerid
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario que sigue
 *       - in: query
 *         name: followingid
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a ser seguido
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
 *                   example: "User 1 now follows User 2"
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
router.get('/v1/follow',checkToken,(req,res) => followController.follow(req,res));

/**
 * @swagger
 * /api/v1/follwersandfollowings:
 *   get:
 *     summary: Obtiene tanto los seguidores como los usuarios seguidos, y filtra aquellos que no son seguidos de vuelta
 *     parameters:
 *       - in: query
 *         name: userid
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario para obtener los seguidores y seguidos
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de página para la paginación (por defecto es 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Límite de usuarios por página (por defecto es 10)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Seguidores y seguidos obtenidos con éxito, con filtros de no seguidos de vuelta
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
 *                   type: object
 *                   properties:
 *                     followers:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           followerid:
 *                             type: integer
 *                             example: 123
 *                           username:
 *                             type: string
 *                             example: follower_user
 *                     followings:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           followingid:
 *                             type: integer
 *                             example: 456
 *                           username:
 *                             type: string
 *                             example: followed_user
 *                     followersNotFollowedBack:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           followerid:
 *                             type: integer
 *                             example: 789
 *                           username:
 *                             type: string
 *                             example: unfollowed_follower
 *                     followingsNotFollowers:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           followingid:
 *                             type: integer
 *                             example: 101
 *                           username:
 *                             type: string
 *                             example: unreciprocal_following
 *       400:
 *         description: Error al obtener los seguidores y seguidos
 */
router.get('/v1/follwersandfollowings',checkToken,(req,res) => followController.followersAndFollowings(req,res));

  module.exports = router;