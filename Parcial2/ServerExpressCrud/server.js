require('dotenv').config();
const express = require('express');
xmlparser = require('express-xml-bodyparser');
const multer  = require('multer'); 
const path = require('path');
const winston = require('winston');
const pug = require('pug');

const routerUsuario = require('./router/usuarioRouter.js');

const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());
app.use(express.text());
app.use(xmlparser());
  
app.use('/usuario', routerUsuario.router);

const logger = winston.createLogger({ 
    level: 'error', 
    format: winston.format.json(), 
    transports: [ 
    new winston.transports.File({ filename: __dirname+'/logs/error.log' }) 
      ] 
    }); 

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    res.status(500).json(`¡Algo salió mal! Error: ${err.message}`);
    logger.error(err.message, { stack: err.stack });
});


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/ruta', (req, res, next) => {  
    let opciones = { 
              titulo: "Titulo de la plantilla", 
              subtitulo: "Subtitulo en la plantilla" 
              } 
         res.render('plantilla', opciones) 
    })

app.listen(port, () => {
    console.log(`corriendo servidor http://localhost:${port}`);
});