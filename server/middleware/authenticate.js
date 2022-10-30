const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { SECRET_KEY } = require("../config/config");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const verifyToken = jwt.verify(token, SECRET_KEY);
    const rootUser = await User.findOne({ _id: verifyToken._id, token: token });

    if (rootUser) {
      const { email, name, mobile, country, quiz } = rootUser;
      req.status = 200;
      req.user = { email, name, mobile, country, quiz };
      req.message = "Valid Access";
    } else {
      req.status = 400;
      req.user = {};
      req.message = "Invalid Access";
    }
  } catch (err) {
    req.status = 400;
    req.user = {};
    req.message = "Invalid Access"
  }
  next();
};

module.exports = authenticate;
