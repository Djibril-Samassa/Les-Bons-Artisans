// Import des Dépendances
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

// Import des routes
const produitsRouter = require("./Routes/produitsrouter");
const usersRouter = require("./Routes/usersrouter");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 8000;

// Utilisation des Middlewares
app.use(express.json());
app.use(cors());

app.use("/produits", produitsRouter);
app.use("/users", usersRouter);

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
