require('dotenv').config();
const express = require('express');
const xmlparser = require('express-xml-bodyparser');
const path = require('path');
const winston = require('winston');
const mongoose = require('mongoose');
const routerFutbolista = require('./router/futbolistaRouter.js');

const swaggerUI     = require('swagger-ui-express'); 
const swaggerJsDoc  = require('swagger-jsdoc');
const swaggerConfig = require('./swagger-config.json');

const app = express();
const port = process.env.PORT;

// Conexión a MongoDB sin opciones obsoletas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error al conectar a MongoDB:", err));

// Middleware
app.use(express.json());
app.use(express.text());
app.use(xmlparser());

app.use('/futbolista', routerFutbolista.router);

// Logger de errores con Winston
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, 'logs/error.log') })
  ]
});

 const swaggerOptions = {
        ...swaggerConfig,
        apis: [path.join(__dirname, swaggerConfig.apis[0])]
      };


    const swaggerDocs = swaggerJsDoc(swaggerOptions); 
    app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));

    app.get("/api-docs-json", (req, res) => res.json(swaggerDocs));


// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(`¡Algo salió mal! Error: ${err.message}`);
  logger.error(err.message, { stack: err.stack });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
