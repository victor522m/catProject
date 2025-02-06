const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Favorite = sequelize.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  breedId: {
    type: DataTypes.STRING, // ID de la raza favorita
    allowNull: false,
  },
  breedName: {
    type: DataTypes.STRING, // Añadir el campo breedName
    allowNull: false
  }
});

// Relación entre Usuario y Favorito
User.hasMany(Favorite, { foreignKey: 'userId' }); // Un usuario tiene muchos favoritos
Favorite.belongsTo(User, { foreignKey: 'userId' }); // Un favorito pertenece a un usuario

module.exports = Favorite;
