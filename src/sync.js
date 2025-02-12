const sequelize = require('./config/db'); // Conexión a la base de datos

const Breed = require('./models/Breed'); // Ajusta la ruta según tu estructura de archivos
const catModel = require('./models/catModel'); // Ajusta la ruta según tu estructura de archivos
const Favorite = require('./models/Favorite'); // Ajusta la ruta según tu estructura de archivos
const User = require('./models/User'); // Ajusta la ruta según tu estructura de archivos
// Sincronizar modelos con la base de datos
async function initializeDatabase() { 
  try {
    await sequelize.sync({}); // a true Esto reinicializa la base de datos (¡Advertencia: esto eliminará todos los datos existentes!)
    console.log('Base de datos inicializada correctamente desde db.js.');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
}

initializeDatabase();