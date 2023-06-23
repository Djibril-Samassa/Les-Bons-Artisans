const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TokenMiddleware = require("./Middlewares/AuthMiddleware");
const app = express();

// Import des routes
const produitsRouter = require("./Routes/produitsrouter");
const usersRouter = require("./Routes/usersrouter");

// Utilisation des Middlewares
app.use(express.json());
app.use(cors());

app.use("/produits", produitsRouter);
app.use("/users", usersRouter);

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
