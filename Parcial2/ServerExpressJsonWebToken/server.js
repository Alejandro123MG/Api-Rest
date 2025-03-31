require('dotenv').config();
const express = require('express');
const xmlparser = require('express-xml-bodyparser');
const multer  = require('multer'); 
const path = require('path');
const winston = require('winston');
const pug = require('pug');
const jwt = require('jsonwebtoken'); 
const fs = require('fs');

const routerUsuario = require('./router/usuarioRouter.js');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.text());
app.use(xmlparser());
  
app.use('/usuario', routerUsuario.router);

const logger = winston.createLogger({ 
    level: 'error', 
    format: winston.format.json(), 
    transports: [ 
        new winston.transports.File({ filename: path.join(__dirname, 'logs', 'error.log') }) 
    ] 
});

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: `¡Algo salió mal! Error: ${err.message}` });
    logger.error(err.message, { stack: err.stack });
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/ruta', (req, res) => {  
    let opciones = { 
        titulo: "Titulo de la plantilla", 
        subtitulo: "Subtitulo en la plantilla" 
    }; 
    res.render('plantilla', opciones);
});

// Ruta para generar el token
app.post('/login', (req, res) => {
    let privateKey = fs.readFileSync(path.join(__dirname, '/llaves/privada.pem'), 'utf-8');
    const token = jwt.sign(req.body, privateKey, { algorithm: 'RS256', expiresIn: '1h' });
    console.log(token);
    res.json({ token: token });
});

// Middleware para verificar el token
function verificarToken(req, res, next) {
    const publica = fs.readFileSync(path.join(__dirname, '/llaves/publica.pem'), 'utf-8');
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No tienes permiso para acceder a este recurso' });
    }
    const token = req.headers.authorization.split(" ")[1]; // Asumiendo formato "Bearer <token>"
    
    jwt.verify(token, publica, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        next();
    });
}

// Ruta protegida que requiere un token válido
app.get('/sistema', verificarToken, (req, res) => {
    res.json({ mensaje: "Acceso concedido a ruta sistema" });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
