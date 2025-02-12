const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.redirect('/'); // Redirige a la página de inicio si no hay token
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.redirect('/'); // Redirige a la página de inicio si el token es inválido o ha expirado
    }

    req.userId = user.id; // Extrae el ID del usuario del token y lo guarda en la solicitud
    next();
  });
}

module.exports = authenticateToken;

