const jwt = require('jsonwebtoken');
const { resMess } = require('../util/respondMessage');
const User = require('../models/User');

const authenticateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json(new resMess(false, 'Access token not found'));
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json(new resMess(false, 'Access token not found'));
    }

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (error, payload) => {
        if (error) {
          return res.status(403).json(new resMess(false, 'Invalid token'));
        }
        let user = await User.findById(payload._id).exec();
        req.userId = user._id;
        next();
      }
    );
  } catch (error) {
    return res.status(500).json(new resMess(false, error.message));
  }
};

module.exports = authenticateJWT;
