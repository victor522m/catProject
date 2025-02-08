const sequelize = require('./config/db'); // Conexión a la base de datos
const User = require('./models/User');   // Modelo User
const Favorite = require('./models/Favorite'); // Modelo Favorite

// Sincronizar modelos con la base de datos
sequelize.sync() // Cambia a true si quieres reiniciar las tablas cada vez.
  .then(() => {
    console.log('Modelos sincronizados con la base de datos');
  })
  .catch(err => {
    console.error('Error al sincronizar modelos:', err);
  });
