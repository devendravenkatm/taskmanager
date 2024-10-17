// middleware/auth.js
exports.protect = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    try {
      const decoded = jwt.verify(token.split(' ')[1], 'your_jwt_secret'); // Adjust to handle 'Bearer <token>'
      req.user = decoded.id;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
  