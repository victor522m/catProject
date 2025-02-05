const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Favorite = require('../models/Favorite');
const { getAllBreeds } = require('../models/catModel'); // Importa la función getAllBreeds







exports.renderRegisterPage = (req, res) => {
  res.render('register'); // Renderiza la vista de registro
};

exports.renderLoginPage = (req, res) => {
  res.render('login'); // Renderiza la vista de inicio de sesión
};

// Registrar un nuevo usuario
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'El usuario ya existe' });

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const user = await User.create({ username, email, password: hashedPassword });
    //res.status(201).json({ message: 'Usuario registrado exitosamente', user });
    console.log("Usuario creado exitosamente")
    // Redirigir al usuario a la página de inicio de sesión después de registrarse
    res.redirect('/login');
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
};

// Iniciar sesión
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Contraseña incorrecta' });

    // Generar token JWT
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
   // res.json({ token });
   res.redirect(`/userHome?token=${token}`); // Redirigir al usuario a su página principal después de iniciar sesión
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};


exports.renderUserHomePage = async (req, res) => {
  try {
    const token = req.query.token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findByPk(decoded.id);
    const favorites = await Favorite.findAll({ where: { userId: user.id } });
    const breeds = await getAllBreeds(); // Obtener la lista de razas
    res.render('userHome', { username: user.username, favorites, breeds });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener los favoritos de un usuario
exports.getFavoritesByUser = async (req, res) => {
  try {
    const userId = req.userId; // ID del usuario autenticado (extraído del token)
    
    const favorites = await Favorite.findAll({ where: { userId } });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener favoritos getFavoritesByUser', error });
  }
};




// Agregar un favorito
exports.addFavoriteToUser = async (req, res) => {
  const { breedId } = req.body;
  const userId = req.userId; // ID del usuario autenticado

  try {
    // Crear el favorito asociado al usuario
    const favorite = await Favorite.create({ breedId, userId });
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar favorito', error });
  }
};

// Eliminar un favorito
exports.deleteFavoriteFromUser = async (req, res) => {
  const { favoriteId } = req.params;

  try {
    // Eliminar el favorito por ID
    await Favorite.destroy({ where: { id: favoriteId } });
    res.json({ message: 'Favorito eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar favorito destroy', error });
  }
};
