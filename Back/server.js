// Import des Dépendances
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Import des routes et produit pour socket.io
const produitsRouter = require("./Routes/produitsrouter");
const usersRouter = require("./Routes/usersrouter");
const Produit = require("./Models/ProduitsModel");

const app = express();
const server = http.createServer(app);
const port = 8000;

// Utilisation des Middlewares
app.use(express.json());
app.use(cors());

app.use("/produits", produitsRouter);
app.use("/users", usersRouter);

// Initialisation du port du serveur
server.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
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

// Initialisation de socket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  // Quand un produit est crée
  socket.on("produit_action", async () => {
    try {
      // On renvoie la liste des produits à jour
      const newList = await Produit.find();
      socket.emit("newProductList", {
        message: "voila la nouvelle liste",
        data: newList,
      });
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération de la liste des produits :",
        error
      );
    }
  });
});
