import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET_TOKEN;


/**
 * @description describes a function that verifies a jwt Token
 *
 * @param { object } req requests object
 * @param { object } res response object
 * @param { function } next this runs the next block of code
 *
 * @return { object } error response when the jwt Token is not verified
 */
const jwtVerify = (req, res, next) => {
  const token = req.headers.authorization || req.headers['x-access-token'] ||
    req.header('authorization');
  if (!token) {
    return res.status(401).json({
      message: 'No valid token provided'
    });
  }
  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      if (error.message === 'jwt expired') {
        return res.status(401).json({
          message: 'Unauthorized operation'
        });
      }

      return res.status(401).Json({
        message: 'Unauthorized operation'
      });
    }
    req.decoded = decoded;
    next();
  });
};
export default jwtVerify;
