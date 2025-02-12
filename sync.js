const sequelize = require('./config/db'); // Conexión a la base de datos
//C:\Users\victo\Desktop\catProject\src\models\Favorite.js
const User = require('./src/models/User');   // Modelo User
const Favorite = require('./src/models/Favorite'); // Modelo Favorite
const Breed = require('./src/models/Breed'); // Ajusta la ruta según tu estructura de archivos
const catModel = require('./src/models/catModel'); // Ajusta la ruta según tu estructura de archivos
// Sincronizar modelos con la base de datos
async function initializeDatabase() { 
  try {
    await sequelize.sync({ force: true }); // Esto reinicializa la base de datos (¡Advertencia: esto eliminará todos los datos existentes!)
    console.log('Base de datos inicializada correctamente.');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
}

initializeDatabase();