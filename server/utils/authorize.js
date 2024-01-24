const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];
  try {
    jwt.verify(authToken, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).send("Invalid auth token");
  }
  next();
};

module.exports = authorize;
