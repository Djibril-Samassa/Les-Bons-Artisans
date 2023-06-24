const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TokenMiddleware = require("../Middlewares/AuthMiddleware");
const User = require("../Models/UsersModel");

// Clé du token
const secret =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4NzQ2NjYwMCwiaWF0IjoxNjg3NDY2NjAwfQ.oZfOB4j_mn1GnKmcupDDKOP5pw7Iiojog9oGyHLnLvA";

// Inscription
router.post("/inscription", async (req, res) => {
  const { email, password } = req.body;
  // Vérifier si l'adresse email est déjà liée à un compte
  const user = await User.findOne({ email });
  if (user) {
    res.status(401).json({
      message: "Cette adresse e-mail est déjà liée à un compte.",
    });
  } else {
    try {
      // Si non créer un compte
      const hashedpassword = await bcrypt.hash(password, 12);
      User.create({
        email: email,
        password: hashedpassword,
      });
    } catch (err) {
      res.status(400).json({
        message: "Une erreur est survenue.",
      });
    }
    res.status(201).json({
      message: "Compte crée avec succès.",
    });
  }
});

// Connexion
router.post("/connexion", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Voir si l'utilisateur existe bien
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Adresse e-mail ou mot de passe invalide." });
    }
    // Vérifier le mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Adresse e-mail ou mot de passe invalid." });
    }

    // Génération du token
    const token = jwt.sign({ userId: user._id }, secret, {
      expiresIn: "12h",
    });

    // Envoyer le token au front
    res.json({
      token: token,
      message: "Connecté avec succès",
      user: user.email,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur s'est produite lors de la connexion." });
  }
});

// Déconnexion
router.post("/deconnexion", TokenMiddleware, async (req, res) => {
  delete req.headers["authorization"];

  res.status(200).json({ message: "Déconnecté avec succès" });
});

module.exports = router;
