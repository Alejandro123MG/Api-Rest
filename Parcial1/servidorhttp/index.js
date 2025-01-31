var http = require('http');

let server = http.createServer((req, res) => {
    res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
    res.end('Hello World\n');
});
server.listen(3000, ()=>{
    console.log('Server running at http://localhost:3000/');
});