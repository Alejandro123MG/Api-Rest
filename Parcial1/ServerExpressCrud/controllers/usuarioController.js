require('dotenv').config(); 
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


function consultaUsuario (req, res)  {
    console.log(req.query.usuario_id); // Cambiado a usuario_id

    let consulta = '';
    let usuario_id = req.query.usuario_id; // Cambiado a usuario_id

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
            res.json({ resultado: results });
        } else {
            res.json({ Error: "No hay registros" });
        }
    });
}
module.exports = {consultaUsuario}; 
