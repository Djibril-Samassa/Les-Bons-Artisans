const jwt = require("jsonwebtoken");
const secret =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4NzQ2NjYwMCwiaWF0IjoxNjg3NDY2NjAwfQ.oZfOB4j_mn1GnKmcupDDKOP5pw7Iiojog9oGyHLnLvA";

// Vérifier à chaque requête que l'utilisateur soit bien connecté
function authentification(req, res, next) {
  const token = req.header("Authorization");
  // Si ce n'est pas le cas
  if (!token) {
    return res.status(401).json({ message: "L'accès n'est pas autorisé" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    // Si le token est invalide
    return res.status(401).json({ message: "Token invalide." });
  }
}

module.exports = authentification;
