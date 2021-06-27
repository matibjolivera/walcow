const jwt = require("jsonwebtoken");

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Acceso denegado" });
  try {
    console.log("ok");
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next(); // continuamos
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = verifyToken;
