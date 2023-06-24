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
      <Button
        onClick={() => {
          Redirect("/products");
        }}
        variant="contained"
      >
        Accèder à la page produits
      </Button>
    </div>
  );
}
