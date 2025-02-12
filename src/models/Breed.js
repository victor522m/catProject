const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Breed = sequelize.define('Breed', {
  id: {
    type: DataTypes.STRING, // Supongo que el ID de la API es una cadena (string)
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  weight: {
    type: DataTypes.JSON,
    allowNull: true // { imperial: '7 - 15', metric: '3 - 7' }
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lifeSpan: {
    type: DataTypes.STRING,
    allowNull: true // Ej. '12 - 15'
  },
  temperament: {
    type: DataTypes.STRING,
    allowNull: true
  },
  adaptability: {
    type: DataTypes.INTEGER,
    allowNull: true // Ej. 5
  },
  affectionLevel: {
    type: DataTypes.INTEGER,
    allowNull: true // Ej. 5
  },
  childFriendly: {
    type: DataTypes.INTEGER,
    allowNull: true // Ej. 4
  },
  dogFriendly: {
    type: DataTypes.INTEGER,
    allowNull: true // Ej. 4
  },
  energyLevel: {
    type: DataTypes.INTEGER,
    allowNull: true // Ej. 5
  },
  grooming: {
    type: DataTypes.INTEGER,
    allowNull: true // Ej. 3
  },
  healthIssues: {
    type: DataTypes.INTEGER,
    allowNull: true // Ej. 2
  },
  intelligence: {
    type: DataTypes.INTEGER,
    allowNull: true // Ej. 5
  },
  sheddingLevel: {
    type: DataTypes.INTEGER,
    allowNull: true // Ej. 3
  },
  socialNeeds: {
    type: DataTypes.INTEGER,
    allowNull: true // Ej. 5
  },
  strangerFriendly: {
    type: DataTypes.INTEGER,
    allowNull: true // Ej. 4
  },
  vocalisation: {
    type: DataTypes.INTEGER,
    allowNull: true // Ej. 3
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true, // URL de la imagen de la raza
    defaultValue: '/images/default.png' // Imagen predeterminada
  },
  cfaUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  vetstreetUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  vcahospitalsUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  wikipediaUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Breed;
