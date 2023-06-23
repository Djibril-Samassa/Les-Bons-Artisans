const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Importation du modèle de données
const Produit = require("./Model/ProduitModel");
const User = require("./Model/UserModel");
const TokenMiddleware = require("./AuthMiddleware");
const app = express();
const secret =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4NzQ2NjYwMCwiaWF0IjoxNjg3NDY2NjAwfQ.oZfOB4j_mn1GnKmcupDDKOP5pw7Iiojog9oGyHLnLvA";

// Utilisation des Middlewares
app.use(express.json());
app.use(cors());

// Initialisation du serveur sur le port 8000
app.listen(8000, () => {
  console.log("connexion au serveur => OK");
});

// Connexion du back à la base de données
mongoose
  .connect(
    "mongodb+srv://djibrilsamassa:TQYHJ3R2vaubY3Xn@lesbonsartisans.vqvgpbe.mongodb.net/",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("connexion à la base de données => OK");
  });

// Routes

// Récupérer la liste des produits
app.get("/produits", TokenMiddleware, async (req, res) => {
  Produit.find().then((produitList) => {
    res.send({
      data: produitList,
      message: "Liste des produits récupérés avec suucès",
    });
  });
});

// Récupérer un produit avec l'id
app.get("/produit/:produitId", async (req, res) => {
  try {
    // Récupérer le produit avec le bon id
    const produit = await Produit.findById(req.params.produitId);
    return res
      .status(200)
      .json({ data: produit, message: "Produit récupéré avec succès." });
  } catch (err) {
    return res.status(400).json({ message: "Aucun produit n'a été trouvé." });
  }
});

// Créer un produit
app.post("/produit/creation", TokenMiddleware, async (req, res) => {
  const { name, type, price, rating, warranty_years, available } = req.body;
  try {
    // Vérifier si un produit avec le même nom existe déjà => C'est le clé unique pour chaque produit
    const produit = await Produit.findOne({ name });
    if (produit) {
      return res
        .status(400)
        .json({ message: "Un produit avec ce nom existe déjà." });
    }
    // Enregistrer le produit dans la base de données
    const nouveauProduit = await Produit.create(req.body);
    res.status(201).json({
      message: "Le produit a été créé avec succès.",
      produit: nouveauProduit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur s'est produite lors de la création du produit.",
    });
  }
});

// Supprimer un produit
app.delete(
  "/produit/suppresion/:produitId",
  TokenMiddleware,
  async (req, res) => {
    const produitId = req.params.produitId;

    try {
      // Vérifier si le produit existe avant de le supprimer
      const produit = await Produit.findById(produitId);
      if (!produit) {
        return res.status(404).json({ message: "Le produit n'existe pas." });
      }

      // Supprimer le produit
      await Produit.findByIdAndDelete(produitId);
      res
        .status(200)
        .json({ message: "Le produit a été supprimé avec succès." });
    } catch (err) {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la suppression du produit.",
      });
    }
  }
);

// Modifier un produit
app.post(
  "/produit/modification/:produitId",
  TokenMiddleware,
  async (req, res) => {
    const produitId = req.params.produitId;
    const editedProduit = req.body;

    try {
      // Vérifier si le produit existe avant de le supprimer
      const produit = await Produit.findById(produitId);

      // Mettre à jour le produit
      await Produit.findByIdAndUpdate(produitId, editedProduit);
      res
        .status(200)
        .json({ message: "Le produit a été modifié avec succès." });
    } catch (err) {
      res.status(400).json({
        message:
          "Une erreur s'est produite lors de la modification du produit.",
      });
    }
  }
);

// Inscription
app.post("/inscription", async (req, res) => {
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
app.post("/connexion", async (req, res) => {
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
    res.json({ token: token, message: "Connecté avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur s'est produite lors de la connexion." });
  }
});

// Déconnexion
app.post("/deconnexion", async (req, res) => {
  delete req.headers["authorization"];

  res.status(200).json({ message: "Déconnecté avec succès" });
});
