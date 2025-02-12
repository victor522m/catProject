const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'storage', 'cat.sqlite') 
});

sequelize.authenticate()
  .then(() => console.log('Conexión exitosa con SQLite desde db.js'))
  .catch(err => console.error('Error al conectar con SQLite:', err));

module.exports = sequelize;
