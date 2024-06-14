const jwt = require("jsonwebtoken");
const { Bar } = require("../models/models");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Aucun token trouvé" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const bar = await Bar.findByPk(decoded.id);

    if (!bar) {
      return res.status(401).json({ error: "Token invalide" });
    }

    req.bar = bar;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token Invalide" });
  }
};

module.exports = authenticate;
