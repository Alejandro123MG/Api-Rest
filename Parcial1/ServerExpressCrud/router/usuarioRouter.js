const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController.js');

router.get('/', usuarioController.consultaUsuario);

router.delete('/', usuarioController.eliminarUsuario);

router.post('/', usuarioController.insertarUsuario);

module.exports.router = router;