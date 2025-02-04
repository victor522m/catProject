const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Acceso denegado' });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });

    req.userId = user.id; // Extrae el ID del usuario del token y lo guarda en la solicitud
    next();
  });
}

module.exports = authenticateToken;
