const { body, query, validationResult } = require('express-validator');
require('dotenv').config();
const mysql = require('mysql2');
const halson = require('halson');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

function consultaUsuario(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        let usuario_id = req.query.usuario_id;
        let consulta = usuario_id && !isNaN(usuario_id)
            ? 'SELECT * FROM usuario WHERE usuario_id = ?'
            : 'SELECT * FROM usuario';

        connection.query(consulta, [usuario_id], (error, results) => {
            if (error) return next(error);

            if (results.length > 0) {
                const resource = halson({ resultado: results }).addLink('self', '/usuario');
                res.json(resource);
            } else {
                res.status(404).json({ error: "No hay registros" });
            }
        });
    } catch (err) {
        next(err);
    }
}

function eliminarUsuario(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        let usuario_id = req.query.usuario_id;

        let consulta = 'DELETE FROM usuario WHERE usuario_id = ?';

        connection.query(consulta, [usuario_id], (error, results) => {
            if (error) return next(error);

            if (results.affectedRows > 0) {
                res.json({ mensaje: "Usuario eliminado correctamente" });
            } else {
                res.status(404).json({ Error: "Usuario no encontrado" });
            }
        });
    } catch (err) {
        next(err);
    }
}

function insertarUsuario(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        const { usuario_nombre, usuario_apellido, usuario_usuario, usuario_clave, usuario_email } = req.body;

        let consulta = `INSERT INTO usuario (usuario_nombre, usuario_apellido, usuario_usuario, usuario_clave, usuario_email) 
                        VALUES (?, ?, ?, ?, ?)`;

        connection.query(consulta, [usuario_nombre, usuario_apellido, usuario_usuario, usuario_clave, usuario_email], 
            (error, results) => {
                if (error) return next(error);

                res.status(201).json({ mensaje: "Usuario insertado correctamente", usuario_id: results.insertId });
            }
        );
    } catch (err) {
        next(err);
    }
}

module.exports = { consultaUsuario, eliminarUsuario, insertarUsuario };
