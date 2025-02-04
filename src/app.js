require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./config/db'); // Conexión a la base de datos
const catRoutes = require('./routes/catRoutes'); // Rutas relacionadas con gatos y usuarios

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
app.use('/', catRoutes); // Asegúrate de que las rutas están correctamente conectadas

// Verificar conexión a la base de datos e iniciar el servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa con PostgreSQL');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con PostgreSQL:', error);
  });
