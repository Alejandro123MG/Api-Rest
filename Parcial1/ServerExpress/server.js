const express = require('express');
const app = express();
const port = 3000;

app.use('/',(req,res,next) => {
    console.log("peticon recibida");
    next();
}, (req, res, next) => {
    console.log("2da funcion middleware");
    next();
});

//middleware
app.use(express.json());
app.use(express.text());

app.get('/', (req, res, next) => {
    res.sendFile(__dirname+'/public/index.html');
});

app.post('/', (req, res) => {
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