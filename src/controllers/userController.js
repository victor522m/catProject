const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Favorite = require('../models/Favorite');
const { getAllBreeds } = require('../models/catModel'); // Importa la función  
const { getBreedImage } = require('../models/catModel'); // Importa la función 
const Breed = require('../models/breed'); 








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
    if (existingUser){
      req.flash('error', 'El correo electrónico ya está registrado.');
      return res.redirect('/register');
    } //return res.status(400).json({ message: 'El usuario ya existe' });

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const user = await User.create({ username, email, password: hashedPassword });
    //res.status(201).json({ message: 'Usuario registrado exitosamente', user });
    console.log("Usuario creado exitosamente")
    // Redirigir al usuario a la página de inicio de sesión después de registrarse
    req.flash('success', 'Registro exitoso. Por favor, inicie sesión.');
    res.redirect('/login');
  } catch (error) {
    req.flash('error', 'Error al registrar el usuario.');
    res.redirect('/register');
    //res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
};

// Iniciar sesión
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user){
      req.flash('error', 'Usuario no encontrado');
      return res.redirect('/login');

      //return res.status(404).json({ message: 'Usuario no encontrado' });
    } 

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      req.flash('error', 'Contraseña incorrecta');
      return res.redirect('/login');
      //return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
   // res.json({ token });
   res.redirect(`/userHome?token=${token}`); // Redirigir al usuario a su página principal después de iniciar sesión
  } catch (error) {
    req.flash('error', 'Error al iniciar sesión');
    res.redirect('/login');
    //res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


exports.renderUserHomePage = async (req, res) => {
  try {
    const token = req.query.token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findByPk(decoded.id);
    const favorites = await Favorite.findAll({ where: { userId: user.id } });

    const breeds = await Breed.findAll(); // Obtener la lista de razas desde la base de datos

    res.render('userHome', { username: user.username, favorites, breeds });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Obtener los favoritos de un usuario
exports.getFavoritesByUser = async (req, res) => {
  const userId = req.userId;

  try {
      const favorites = await Favorite.findAll({
          where: { userId },
          attributes: ['id', 'breedId', 'breedName', 'createdAt', 'updatedAt']
      });
      res.json(favorites);
  } catch (error) {
      console.error('Error al obtener favoritos:', error);
      res.status(500).json({ message: 'Error al obtener favoritos', error });
  }
};




// Agregar un favorito
exports.addFavorite  = async (req, res) => {
  const { breedId, breedName } = req.body;
  const userId = req.userId; // Asegúrate de que req.userId esté definido correctamente

  console.log('Datos recibidos en el backend: ', { breedId, breedName, userId });

  try {
      const favorite = await Favorite.create({
          userId,
          breedId,
          breedName
      });

      res.status(201).json(favorite);
  } catch (error) {
      console.error('Error al agregar favorito:', error);
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
