const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res, next) => {
    res.sendFile(__dirname+'/public/index.html');
    
    
});

app.listen(port, () => {
    console.log(`corriendo servidor http://localhost:${port}`);
});