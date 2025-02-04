// Cargar variables de entorno desde .env
require('dotenv').config();

const sequelize = require('./src/config/db');

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa con PostgreSQL');
    process.exit(0); // Salir del proceso con éxito
  })
  .catch(err => {
    console.error('Error al conectar con PostgreSQL:', err);
    process.exit(1); // Salir del proceso con un error
  });
