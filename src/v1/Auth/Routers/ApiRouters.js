const express = require('express')
const router = express.Router();
const checkLogin = require('../../../Utils/Middlewares/Auth/Login')
const AuthController = require('../../Auth/Controllers/AuthController')
const authController = new AuthController()

/**
 * @swagger
 * /v1/login:
 *   post:
 *     summary: Valida los datos de sesión y obtiene el token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword123
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve el token de sesión
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
 *                   example: login success
 *                 body:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiYW5kcmVzQGdtYWlsLmVzIiwiaWF0IjoxNzI2ODg5MTIzLCJleHAiOjE3MjY4OTI3MjN9.VS3tktqkitOzLnwxFlsqGIX7QmsKmbpJETKk0IQQkfc
 *       400:
 *         description: Error en los datos enviados o credenciales incorrectas
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
 *                   example: Invalid email or password
 */
router.post('/v1/login', checkLogin.loginMiddleware, (req, res) => authController.login(req, res));

module.exports = router;