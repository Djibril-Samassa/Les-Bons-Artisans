const mongoose = require("mongoose");

const ProduitSchema = new mongoose.Schema({
  creator_name: {
    type: String,
    required: true,
  },
  creator_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  warranty_years: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
});

const Produit = mongoose.model("produit", ProduitSchema);
module.exports = Produit;
