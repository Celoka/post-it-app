import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET_TOKEN;


const jwtVerify = (req, res, next) => {
  const token = req.headers.authorization || req.headers['x-access-token'] ||
   req.header('authorization');
  if (!token) {
    return res.status(403).json({ message: 'No valid token provided' });
  }
  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      if (error.message === 'jwt expired') {
        return res.status(401).json({ message: 'Token has expired' });
      }
      return res.status(401).Json({ message: 'Unauthorized operation' });
    }
    req.decoded = decoded;
    next();
  });
};
export default jwtVerify;
