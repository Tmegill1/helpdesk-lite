const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

module.exports = (req, res, next) => {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null; 
  
    if (!token) return res.status(401).json({ error: "Missing token" });
  
    try {
      const payload = jwt.verify(token, jwtSecret);
      req.user = payload; 
      next();
    } catch {
      res.status(401).json({ error: "Invalid token" });
    }
  };