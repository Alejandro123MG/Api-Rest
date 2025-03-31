const https =require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();

const options = {
    key: fs.readFileSync(path.join(__dirname, 'certificado/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certificado/cert.pem'))
};

app.get('/', (req, res) => {    
    res.send('¡Hola mundo!');
}); 

https.createServer(options, app).listen(3443, () => {
    console.log('Servidor HTTPS en el puerto 3443');
}
);
