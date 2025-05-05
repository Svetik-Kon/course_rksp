const jwt = require('jsonwebtoken');

function verifyToken(requiredRole = null) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Нет токена' });

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super-secret-key');
      req.user = decoded;

      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ error: 'Недостаточно прав' });
      }

      next();
    } catch (err) {
      res.status(403).json({ error: 'Неверный токен' });
    }
  };
}

module.exports = verifyToken;
