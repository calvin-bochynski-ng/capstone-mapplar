const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    req.body = { ...req.body, main_usr_id: decoded.id };
  } catch (error) {
    return res.status(401).send("Invalid auth token");
  }
  next();
};

module.exports = authorize;
