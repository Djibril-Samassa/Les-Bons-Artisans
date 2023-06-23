const express = require("express");
const router = express.Router();
const TokenMiddleware = require("../Middlewares/AuthMiddleware");
const Produit = require("../Models/ProduitsModel");

// Récupérer la liste des produits
router.get("/produitsList", TokenMiddleware, async (req, res) => {
  Produit.find().then((produitList) => {
    res.send({
      data: produitList,
      message: "Liste des produits récupérés avec suucès",
    });
  });
});

// Récupérer un produit à partir de l'id
router.get("/produit/:produitId", async (req, res) => {
  console.log(req.params.produitId);
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
router.post("/creation", TokenMiddleware, async (req, res) => {
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
router.delete("/suppresion/:produitId", TokenMiddleware, async (req, res) => {
  const produitId = req.params.produitId;
  console.log(produitId);
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
    res.status(500).json({
      message: "Une erreur s'est produite lors de la suppression du produit.",
    });
  }
});

// Modifier un produit
router.post("/modification/:produitId", TokenMiddleware, async (req, res) => {
  const produitId = req.params.produitId;
  const editedProduit = req.body;

  try {
    // Vérifier si le produit existe avant de le supprimer
    const produit = await Produit.findById(produitId);

    // Mettre à jour le produit
    await Produit.findByIdAndUpdate(produitId, editedProduit);
    res.status(200).json({ message: "Le produit a été modifié avec succès." });
  } catch (err) {
    res.status(400).json({
      message: "Une erreur s'est produite lors de la modification du produit.",
    });
  }
});


module.exports = router;
