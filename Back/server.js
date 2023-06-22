const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Importation du modèle de données
const Produit = require("./Model/ProduitModel");

const app = express();

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
app.get("/produits", async (req, res) => {
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
    console.error(err);
    return res.status(400).json({ message: "Aucun produit n'a été trouvé." });
  }
});

// Créer un produit
app.post("/produit/creation", async (req, res) => {
  const { nom, type, price, rating, warranty_years, available } = req.body;
  try {
    // Vérifier si un produit avec le même nom existe déjà => C'est le clé unique pour chaque produit
    const produit = await Produit.findOne({ nom });
    if (produit) {
      return res
        .status(400)
        .json({ message: "Un produit avec ce nom existe déjà." });
    }

    // Créer un nouveau produit
    const nouveauProduit = new Produit({
      nom,
      description,
      prix,
    });

    // Enregistrer le produit dans la base de données
    const produitEnregistre = await nouveauProduit.save();
    res.status(201).json({
      message: "Le produit a été créé avec succès.",
      produit: produitEnregistre,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la création du produit.",
    });
  }
});

// Supprimer un produit
app.delete("/produit/suppresion/:produitId", async (req, res) => {
  const produitId = req.params.produitId;

  try {
    // Vérifier si le produit existe avant de le supprimer
    const produit = await Produit.findById(produitId);
    if (!produit) {
      return res.status(404).json({ message: "Le produit n'existe pas." });
    }

    // Supprimer le produit
    await Produit.findByIdAndDelete(produitId);
    res.status(200).json({ message: "Le produit a été supprimé avec succès." });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la suppression du produit.",
    });
  }
});

// Modifier un produit
app.post("/produit/modification/:produitId", async (req, res) => {});
