import express from 'express';
import redis from 'redis';

const app = express();
const CACHE_DURATION = 10; 
const CACHE_KEY = 'numero_aleatorio';

// Crear un cliente de Redis
const redisClient = redis.createClient({
    url: 'redis://localhost:6379'
});

// Manejo de errores de Redis
redisClient.on('error', (err) => {
    console.error('Error en Redis:', err);
});

// Conectar al cliente de Redis
await redisClient.connect().catch(err => {
    console.error('Error conectando a Redis:', err);
    process.exit(1);
});

console.log('Conectado a Redis correctamente');

// Ruta para obtener número con caché
app.get('/numero', async (req, res) => {
    try {
        // Intentar obtener el valor desde Redis
        let cachedValue = await redisClient.get(CACHE_KEY);
        
        if (cachedValue) {
            // Si existe un valor en caché, lo devolvemos
            console.log(`Valor obtenido del caché: ${cachedValue}`);
            return res.json({ num: parseInt(cachedValue), cached: true });
        } else {
            // Si no hay valor en caché, generamos uno nuevo
            const nuevoNumero = Math.floor(Math.random() * 100);
            console.log(`Número generado: ${nuevoNumero}`);
            
            // Guardar en Redis con expiración
            await redisClient.set(CACHE_KEY, nuevoNumero.toString(), {
                EX: CACHE_DURATION // tiempo de expiración en segundos
            });
            
            return res.json({ num: nuevoNumero, cached: false });
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(3000, () => {
    console.log('Servidor ejecutándose en el puerto 3000');
});

// Manejar el cierre de la aplicación
process.on('SIGINT', async () => {
    console.log('Cerrando conexión a Redis...');
    await redisClient.quit();
    process.exit(0);
});