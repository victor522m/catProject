const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' }); // Enviar respuesta JSON con estado 401
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' }); // Enviar respuesta JSON con estado 403
    }

    req.userId = user.id; // Extrae el ID del usuario del token y lo guarda en la solicitud
    next();
  });
}

module.exports = authenticateToken;

