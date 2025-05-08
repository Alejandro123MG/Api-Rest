const express = require('express');
const { body, query, validationResult } = require('express-validator');
const usuarioController = require('../controllers/usuarioController.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: Operaciones relacionadas con usuarios individuales
 */

/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Consulta usuario(s)
 *     description: Obtiene un usuario específico por ID o lista todos los usuarios si no se proporciona ID
 *     tags: [Usuario]
 *     parameters:
 *       - in: query
 *         name: usuario_id
 *         schema:
 *           type: integer
 *         description: ID del usuario a buscar (opcional)
 *     x-codeSamples:
 *       - lang: "javascript"
 *         source: |
 *           fetch('/usuario')
 *             .then(response => response.json())
 *             .then(data => console.log(data));
 *       - lang: "python"
 *         source: |
 *           import http.client
 *           conn = http.client.HTTPConnection("localhost", 3001)
 *           conn.request("GET", "/usuario")
 *           response = conn.getresponse()
 *           print(response.read().decode("utf-8"))
 *     responses:
 *       200:
 *         description: Datos del usuario o lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/Usuario'
 *                 - type: array
 *                   items:
 *                     $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error en los parámetros de entrada
 *       500:
 *         description: Error del servidor 
*/
router.get(
    '/',
    [
        query('usuario_id').optional().isInt().withMessage('El ID de usuario debe ser un número entero'),
    ],
    usuarioController.consultaUsuario
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         usuario_id:
 *           type: integer
 *           example: 1
 *         usuario_nombre:
 *           type: string
 *           example: "Alejandro"
 *         usuario_apellido:
 *           type: string
 *           example: "Pérez"
 *         usuario_usuario:
 *           type: string
 *           example: "Alejandroperez"
 *         usuario_email:
 *           type: string
 *           format: email
 *           example: "Alejandro@example.com"
 *     UsuarioInput:
 *       type: object
 *       required:
 *         - usuario_nombre
 *         - usuario_apellido
 *         - usuario_usuario
 *         - usuario_clave
 *         - usuario_email
 *       properties:
 *         usuario_nombre:
 *           type: string
 *           example: "Alejandro"
 *         usuario_apellido:
 *           type: string
 *           example: "Pérez"
 *         usuario_usuario:
 *           type: string
 *           example: "Alejandroperez"
 *         usuario_clave:
 *           type: string
 *           format: password
 *           example: "miclave123"
 *         usuario_email:
 *           type: string
 *           format: email
 *           example: "Alejandro@example.com"
 */

module.exports.router = router;
