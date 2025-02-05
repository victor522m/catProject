const express = require('express');
const router = express.Router();
const { showHomePage, getRandomCatJson, showRandomCat, showBreeds, showBreedDetails, getBreedById } = require('../controllers/catController');
const { registerUser, renderUserHomePage, renderRegisterPage, renderLoginPage, loginUser, getFavoritesByUser, addFavoriteToUser, deleteFavoriteFromUser } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

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

// Ruta para obtener la información de una raza por ID
router.get('/api/breeds/:id', getBreedById);

// Rutas para usuarios
router.get('/register', renderRegisterPage); // Renderiza la vista de registro
router.post('/register', registerUser); // Registro de usuario
router.get('/login', renderLoginPage); // Renderiza la vista de inicio de sesión
router.post('/login', loginUser); // Inicio de sesión
router.get('/userHome', renderUserHomePage); // Renderiza la página principal del usuario

// Rutas protegidas para favoritos
router.get('/favorites', authenticateToken, getFavoritesByUser);
router.post('/favorites', authenticateToken, addFavoriteToUser);
router.delete('/favorites/:favoriteId', authenticateToken, deleteFavoriteFromUser);


// Rutas protegidas para favoritos
router.get('/favorites', authenticateToken, getFavoritesByUser);
router.post('/favorites', authenticateToken, addFavoriteToUser);
router.delete('/favorites/:favoriteId', authenticateToken, deleteFavoriteFromUser);
module.exports = router;

