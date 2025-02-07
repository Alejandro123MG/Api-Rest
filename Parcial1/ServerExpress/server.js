const express = require('express');
const app = express();
const port = 3000;

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

app.use((req,res)=>{
    res.status(404);
    res.send("error 404");
})

app.listen(port, () => {
    console.log(`corriendo servidor http://localhost:${port}`);
});