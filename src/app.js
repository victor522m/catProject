require('dotenv').config();
const express = require('express');
const path = require('path');
const catRoutes = require('./routes/catRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para manejar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '../public')));

// Conectar las rutas
app.use('/', catRoutes);

// Ruta raíz (Home)
app.get('/', (req, res) => {
  res.redirect('/cats/random');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
