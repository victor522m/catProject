const express = require('express');
const { showHomePage, getRandomCatJson, showRandomCat, showBreeds, showBreedDetails} = require('../controllers/catController');

const router = express.Router();

// Ruta principal para mostrar el carrusel con gatos y el buscador de razas
router.get('/', showHomePage);

// Ruta para renderizar la vista principal con una imagen aleatoria
router.get('/random', showRandomCat);

// Ruta para devolver una imagen aleatoria como JSON (para AJAX)
router.get('/random/json', getRandomCatJson);

// Ruta para mostrar solo la lista de razas (opcional)
router.get('/breeds', showBreeds);

// Nueva ruta para mostrar los detalles de una raza
router.get('/breeds/:id', showBreedDetails);

module.exports = router;
