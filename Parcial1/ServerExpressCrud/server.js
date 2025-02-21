require('dotenv').config();
const express = require('express');
xmlparser = require('express-xml-bodyparser');
const multer  = require('multer'); 
const path = require('path');


const routerUsuario = require('./router/usuarioRouter.js');

const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());
app.use(express.text());
app.use(xmlparser());
  
app.use('/usuario', routerUsuario.router);

app.use((req,res)=>{
    res.status(404);
    res.send("error 404");
})



app.listen(port, () => {
    console.log(`corriendo servidor http://localhost:${port}`);
});