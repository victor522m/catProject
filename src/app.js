require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./config/db'); // Conexión a la base de datos
const catRoutes = require('./routes/catRoutes'); // Rutas relacionadas con gatos y usuarios
const favoritesRoutes = require('./routes/favoritesRoutes'); // Importa las rutas de favoritos

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
app.use('/', catRoutes); // Rutas relacionadas con gatos y usuarios
app.use('/api', favoritesRoutes); // Rutas de favoritos protegidas

// Verificar conexión a la base de datos e iniciar el servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa con PostgreSQL');

    // Sincronizar la base de datos con los modelos
    return sequelize.sync({ force: true }); // `force: true` elimina y vuelve a crear las tablas
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con PostgreSQL:', error);
  });

module.exports = app;

