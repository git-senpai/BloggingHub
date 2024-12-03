const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ msg: "Token not provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });
    req.user = info;
    next();
  });
};

module.exports = authMiddleware;
