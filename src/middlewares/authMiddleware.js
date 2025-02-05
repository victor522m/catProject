const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.redirect('/login'); // Redirigir a la página de inicio de sesión si no hay token
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.redirect('/login'); // Redirigir a la página de inicio de sesión si el token es inválido
    }

    req.userId = user.id; // Extrae el ID del usuario del token y lo guarda en la solicitud
    next();
  });
}

module.exports = authenticateToken;
