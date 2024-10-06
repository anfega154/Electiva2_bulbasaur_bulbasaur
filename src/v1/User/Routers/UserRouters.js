const express = require('express')
const router = express.Router();
const UserController = require('../Controllers/Usercontroller')
const userController = new UserController();
const check = require('../../../Utils/Middlewares/User/Createuser')
const checkToken = require('../../../Utils/Middlewares/Auth/AuthMiddleware')

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Obtiene la información de todos los usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuarios recuperados exitosamente
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
 *                   example: Usuarios recuperados exitosamente
 *                 body:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       username:
 *                         type: string
 *                         example: "johndoe"
 *                       email:
 *                         type: string
 *                         example: "johndoe@example.com"
 *       500:
 *         description: Error al obtener los usuarios
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
 *                   example: Error al obtener los usuarios.
 */
router.get('/v1/user', checkToken, (req, res) => userController.getUser(req, res));

/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     summary: Crea un nuevo usuario
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - email
 *             - password
 *           properties:
 *             username:
 *               type: string
 *               description: Nombre de usuario
 *               example: "johndoe"
 *             email:
 *               type: string
 *               description: Correo electrónico
 *               example: "johndoe@example.com"
 *             password:
 *               type: string
 *               description: Contraseña del usuario
 *               example: "password123"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
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
 *                   example: Usuario creado exitosamente
 *       400:
 *         description: Error al crear el usuario
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
 *                   example: Error en los datos proporcionados.
 */
router.post('/v1/user', check.createUsermiddleware, (req, res) => userController.createUser(req, res));

module.exports = router;