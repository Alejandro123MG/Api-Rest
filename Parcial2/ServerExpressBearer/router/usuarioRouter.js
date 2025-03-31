const express = require('express');
const { body, query, validationResult } = require('express-validator');
const usuarioController = require('../controllers/usuarioController.js');

const router = express.Router();

router.get(
    '/',
    [
        query('usuario_id').optional().isInt().withMessage('El ID de usuario debe ser un número entero'),
    ],
    usuarioController.consultaUsuario
);

router.delete(
    '/',
    [
        query('usuario_id').isInt().withMessage('El ID de usuario debe ser un número entero'),
    ],
    usuarioController.eliminarUsuario
);

router.post(
    '/',
    [
        body('usuario_nombre').notEmpty().withMessage('El nombre es obligatorio'),
        body('usuario_apellido').notEmpty().withMessage('El apellido es obligatorio'),
        body('usuario_usuario').notEmpty().withMessage('El usuario es obligatorio'),
        body('usuario_clave').notEmpty().withMessage('La clave es obligatoria'),
        body('usuario_email').isEmail().withMessage('Debe ser un email válido'),
    ],
    usuarioController.insertarUsuario
);

module.exports.router = router;
