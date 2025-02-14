const express = require('express');
xmlparser = require('express-xml-bodyparser');
const multer  = require('multer'); 
const path = require('path');
const app = express();
const port = 3001;

app.use('/',(req,res,next) => {
    console.log("--peticion recibida");
    next();
}, (req, res, next) => {
    console.log("2da funcion middleware--");
    next();
});

//middleware
app.use(express.json());
app.use(express.text());
app.use(xmlparser());

const folder = path.join(__dirname+'/archivosrec/'); //Definir una ruta para almacenar archivos que se envian del cliente
 const upload = multer({dest:folder});             
 app.use(upload.single('archivo')); 

app.get('/alumnos', (req, res) => {
    res.sendFile(__dirname+'/public/index.html');
});

app.post('/sistemas/:control', (req, res) => {
    console.log(req.body);
    res.send('hello world');
});

app.patch('/materia', (req, res) => {
    console.log(req.body);
    res.send('hello world');
});

app.post('/prefectos', (req, res) => {
        // console.log(req.body);
        // res.send('hello world');

        console.log(`Se recibio el archivo: ${req.file.originalname}`); 
        console.log(req.body); 
        console.log('Se recibio el formulario:'+JSON.stringify(req.body)); 
        res.json(req.body);
  
});

app.use((req,res)=>{
    res.status(404);
    res.send("error 404");
})

app.listen(port, () => {
    console.log(`corriendo servidor http://localhost:${port}`);
});