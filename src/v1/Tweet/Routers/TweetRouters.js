const express = require('express')
const router = express.Router();
const TweetController = require('../../../v1/Tweet/Controllers/Tweetcontroller')
const tweetController = new TweetController();
const check = require('../../../Utils/Middlewares/Tweets/TweetValidate')
const checkToken = require('../../../Utils/Middlewares/Auth/AuthMiddleware')

/**
 * @swagger
 * /api/v1/tweets:
 *   post:
 *     summary: Crea un nuevo tweet
 *     parameters:
 *       - in: body
 *         name: tweet
 *         schema:
 *           type: object
 *           required:
 *             - content
 *           properties:
 *             content:
 *               type: string
 *               description: Contenido del tweet
 *               example: "Este es un tweet de prueba"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Tweet creado exitosamente
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
 *                   example: Tweet creado exitosamente
 *       400:
 *         description: Error en la creación del tweet, datos no válidos
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
 *                   example: Error al crear el tweet.
 */
router.post('/v1/tweets',checkToken , check.tweetMiddleware,(req, res) => tweetController.createTweet(req,res));

/**
 * @swagger
 * /api/v1/tweets:
 *   get:
 *     summary: Obtiene los tweets de un usuario
 *     parameters:
 *       - in: query
 *         name: userid
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario cuyos tweets se desean obtener
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Página de resultados
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de tweets por página
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tweets recuperados exitosamente
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
 *                   example: Tweets recuperados exitosamente
 *                 body:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       content:
 *                         type: string
 *                         example: "Este es un tweet de prueba"
 *       400:
 *         description: Error en la petición de los tweets
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
 *                   example: Error al obtener los tweets.
 */
router.get('/v1/tweets', checkToken, (req, res) => tweetController.getTweetsByUser(req, res));
/**
 * @swagger
 * /api/v1/tweets/feed:
 *   get:
 *     summary: Obtiene el feed del usuario logueado
 *     parameters:
 *       - in: query
 *         name: userid
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario logueado
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Página de resultados
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de tweets por página
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Feed del usuario recuperado exitosamente
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
 *                   example: Feed recuperado exitosamente
 *                 body:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       content:
 *                         type: string
 *                         example: "Este es un tweet del feed"
 *       400:
 *         description: Error al recuperar el feed del usuario
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
 *                   example: Error al obtener el feed del usuario.
 */
router.get('/v1/tweets/feed', checkToken, (req, res) => tweetController.getMyFeed(req, res));
module.exports = router;     