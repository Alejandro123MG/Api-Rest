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


/*function consultaUsuario (req, res)  {
    console.log(req.query.usuario_id); 

    let consulta = '';
    let usuario_id = req.query.usuario_id; 

    if (typeof usuario_id === 'undefined' || isNaN(usuario_id)) {
        consulta = 'SELECT * FROM usuario';
    } else {
        consulta = 'SELECT * FROM usuario WHERE usuario_id = ?';
    }

    console.log(consulta);

    connection.query(consulta, [usuario_id], function (error, results, fields) {
        if (error) {
            res.json({ Error: "Error en la consulta" });
            return;
        }

        if (results.length > 0) {
            //res.json({ resultado: results });

            var resource = halson({ resultado: results })
            .addLink('self', '/usuario')

            res.json(resource);

        } else {
            res.json({ Error: "No hay registros" });
        }
    });
}*/


function consultaUsuario(req, res, next) {
    try {
        let usuario_id = req.query.usuario_id;
        let consulta = usuario_id && !isNaN(usuario_id)
            ? 'SELECT * FROM usuario WHERE usuario_id = ?'
            : 'SELECT * FROM usuari';

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


function eliminarUsuario(req, res) {
    let usuario_id = req.query.usuario_id;

    if (!usuario_id || isNaN(usuario_id)) {
        res.status(400).json({ Error: "ID de usuario no válido" });
        return;
    }

    let consulta = 'DELETE FROM usuario WHERE usuario_id = ?';

    connection.query(consulta, [usuario_id], function (error, results) {
        if (error) {
            res.status(500).json({ Error: "Error al eliminar el usuario", Detalle: error });
            return;
        }

        if (results.affectedRows > 0) {
            res.json({ mensaje: "Usuario eliminado correctamente" });
        } else {
            res.status(404).json({ Error: "Usuario no encontrado" });
        }
    });
}


function insertarUsuario(req, res) {
    const { usuario_nombre, usuario_apellido, usuario_usuario, usuario_clave, usuario_email } = req.body;

    if (!usuario_nombre || !usuario_apellido || !usuario_usuario || !usuario_clave || !usuario_email) {
        res.status(400).json({ Error: "Todos los campos son obligatorios" });
        return;
    }

    let consulta = `INSERT INTO usuario (usuario_nombre, usuario_apellido, usuario_usuario, usuario_clave, usuario_email) 
                    VALUES (?, ?, ?, ?, ?)`;

    connection.query(consulta, [usuario_nombre, usuario_apellido, usuario_usuario, usuario_clave, usuario_email], 
        function (error, results) {
            if (error) {
                res.status(500).json({ Error: "Error al insertar el usuario", Detalle: error });
                return;
            }

            res.status(201).json({ mensaje: "Usuario insertado correctamente", usuario_id: results.insertId });
        }
    );
}

module.exports = { consultaUsuario, eliminarUsuario, insertarUsuario };
