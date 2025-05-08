// index.js
import express from 'express';

const app = express();
app.use(express.json());

app.get('/usuario', (req, res) => {
  res.json({ nombre: 'Juan' });
});

export default app; 

// Solo inicia el servidor si ejecutas este archivo directamente
if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000/usuario');
  });
}
