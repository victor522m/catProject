const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false, // Desactiva el registro para hacer la salida más limpi
  }
);

sequelize.authenticate()
  .then(() => console.log('Conexión exitosa con PostgreSQL'))
  .catch(err => console.error('Error al conectar con PostgreSQL:', err));

module.exports = sequelize;
