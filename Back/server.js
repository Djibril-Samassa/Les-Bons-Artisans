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

app.get("/", async (req, res) => {
  res.send("Hello word");
});

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
  Produit.findById(req.params.produitId).then((produit) => {
    res.send({
      data: produit,
      message: "Produit récupéré avec succès",
    });
  });
});

// Créer un produit
app.post("/produit/creation", async (req, res) => {
    console.log(req.body)
});

// Supprimer un produit
app.post("/produit/suppresion/:produitId", async (req, res) => {});

// Modifier un produit
app.post("/produit/modification/:produitId", async (req, res) => {});
