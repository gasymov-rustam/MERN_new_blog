import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: 'Forbidden Access', error });
    }
  } else {
    console.log(error);
    return res.status(403).json({ message: 'Forbidden', error });
  }
};
