import { React, useState, useEffect } from "react";
import Style from "./Accueil.css";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Accueil() {
  const Redirect = useNavigate();
  return (
    <div>
      <Typography gutterBottom variant="h4" component="div">
        Test technique SAMASSA Djibril
      </Typography>
      <br />
      <Button
        onClick={() => {
          Redirect("/products");
        }}
        variant="contained"
      >
        Accéder à la page produits
      </Button>
      <br />
      <br />
      <div style={{ display: "flex" }}>
        <Typography
          style={{ margin: "0px 20px" }}
          gutterBottom
          variant="body"
          component="div"
        >
          <b>Librairies utilisées:</b>
          <br />
          <br />
          <Typography component="div">
            React JS
            <br />
            Node JS
            <br />
            Socket.io
            <br />
            React Toastify (notifications)
            <br />
            Framer Motion (animation)
            <br />
            Mongoose (interaction avec la BDD)
            <br />
            Express JS (serveur)
            <br />
            JWT token (Token d'authentification)
            <br />
            Axios (envoi de requêtes)
          </Typography>
        </Typography>
        <Typography
          style={{ margin: "0px 20px" }}
          gutterBottom
          variant="body"
          component="div"
        >
          <b>Fonctionnalités:</b>
          <br />
          <br />
          <Typography component="div">
            Inscription
            <br />
            Connexion
            <br />
            Vérification de token
            <br />
            Visualisation de la liste des produits
            <br />
            Création, modification et suppression de produit
            <br />
            Redirection en cas d'URL inexistante
            <br />
            Redirection vers la page de login en cas d'utilisateur non connecté
            <br />
            Affichage de notifications toast
            <br />
            Échange de données avec Socket.io
          </Typography>
        </Typography>
        <Typography
          style={{ margin: "0px 20px" }}
          gutterBottom
          variant="body"
          component="div"
        >
          <b>Fonctionnalités que j'aurais aimé ajouter:</b>
          <br />
          <br />
          <Typography component="div">
            Notation d'un produit par d'autres utilisateurs
            <br />
            Utilisation de Redux
            <br />
            Calcul de la moyenne des notes
            <br />
            Assignation d'un produit créé à un utilisateur
            <br />
            Possibilité de filtrer en appuyant sur le filtre de la carte
          </Typography>
        </Typography>

        <Typography
          style={{ margin: "0px 20px" }}
          gutterBottom
          variant="body"
          component="div"
        >
          <b>Remarques:</b>
          <br />
          <br />
          <Typography component="div">
            Temps : 2/3h heures le jeudi et plus de temps le vendredi et samedi
            <br />
            Ressources: Google, StackOverFlow, Youtube
            <br />
            Difficulté : Redux (car pas encore maitrisé)
            <br />
            Qualités: lisibilité, commentaires, organisation, et nommage
            cohérant
            <br />
            Le plus aimé: Matérial UI car j'ai découvert et aimé à 1000%
            <br />
          </Typography>
        </Typography>
      </div>
    </div>
  );
}
