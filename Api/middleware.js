const jwt = require("express-jwt");

exports.authenticated = jwt({ secret: "my-secret-key" });

// Check if id from token match the api user_id param
exports.authorized = (req, res, next) => {
  if (req.user.id != req.params.user_id) {
    return res.status(401).json({ message: "You are not authenticated." });
  }
  next();
};
