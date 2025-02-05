// routes/favoritesRoutes.js

const express = require('express');
const router = express.Router();
const { getFavoritesByUser } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

// Rutas protegidas para favoritos
router.get('/favorites', authenticateToken, getFavoritesByUser);

module.exports = router;

