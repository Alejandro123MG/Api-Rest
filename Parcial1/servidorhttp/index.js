const http = require("http");

const PORT = 3001;

const server = http.createServer((req, res) => {
    if (req.url === "/sin-cors") {
        // No incluye encabezado CORS (esto causará un error)
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Respuesta sin CORS");
    } else if (req.url === "/con-cors") {
        // Incluye encabezado CORS (esto funcionará)
        res.writeHead(200, {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*"
        });
        res.end("Respuesta con CORS");
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Ruta no encontrada");
    }
});

server.listen(PORT, () => {
    console.log(`Servidor 2 escuchando en http://localhost:${PORT}`);
});
