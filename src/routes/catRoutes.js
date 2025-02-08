const express = require('express');
const router = express.Router();
const { showHomePage, getRandomCatJson, showRandomCat, showBreeds, showBreedDetails, getBreedById } = require('../controllers/catController');
const { registerUser, renderUserHomePage, renderRegisterPage, renderLoginPage, loginUser, getFavoritesByUser, addFavorite, deleteFavoriteFromUser } = require('../controllers/userController');
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
router.get('/register', (req, res) => {
    const error = req.flash('error');
    res.render('register', { error: error.length > 0 ? error[0] : null });
  });
router.post('/register', registerUser); // Registro de usuario

router.get('/login', (req, res) => {
  const error = req.flash('error');
  const success = req.flash('success');
  res.render('login', { error: error.length > 0 ? error[0] : null, success: success.length > 0 ? success[0] : null });
});

router.post('/login', loginUser); // Inicio de sesión

router.get('/userHome', renderUserHomePage); // Renderiza la página principal del usuario

// Rutas protegidas para favoritos
router.get('/favorites', authenticateToken, getFavoritesByUser);
router.post('/favorites', authenticateToken, addFavorite);
router.delete('/favorites/:favoriteId', authenticateToken, deleteFavoriteFromUser);
router.get('/favorites', authenticateToken, getFavoritesByUser);



module.exports = router;

