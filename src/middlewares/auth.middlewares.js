// authenticationMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user.models.js');

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer','');
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decoded.user.id});
    // console.log(user);
    if (!user) {
      throw new Error("User not found");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

module.exports = authenticateUser;
