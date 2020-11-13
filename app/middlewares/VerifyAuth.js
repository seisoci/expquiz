const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { errorMessage, status } = require("../helpers/status");

dotenv.config();

/**
 * Verify Token
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object|void} response object
 */

exports.verifyToken = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    errorMessage.error = "Token not provided";
    return res.status(status.bad).send(errorMessage);
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = {
      email: decoded.email,
      name: decoded.user_id,
      is_admin: decoded.is_admin
    };
    next();
  } catch (error) {
    errorMessage.error = "Authentication Failed";
    return res.status(status.unauthorized).send(errorMessage);
  }
};

exports.findOne = (req, res) => {
  const id = req.params.id;
};
