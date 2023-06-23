import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import { motion } from "framer-motion";
import Style from "./ProductCard.module.css";

export default function ProductCard(props) {
  // Hooks
  const [product, setProduct] = useState(props.product);
  const disponibilite = product.available ? "Disponible ✅" : "Indisponible ❌";

  // Animation
  const variants = {
    hidden: { x: -200 }, // Position initiale, en dehors de l'écran à gauche
    visible: { x: 0 }, // Position finale, à gauche
  };

  // Fonctions
  const handleNavigateToProduct = () => {};

  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      <Card sx={{ width: 350, margin: "20px" }}>
        <CardMedia
          sx={{ height: 140 }}
          image="https://source.unsplash.com/random/200x200?sig=1"
          title="photo générée"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {product.price} €
          </Typography>
          <Rating
            name="product-rating"
            value={product.rating}
            precision={0.5}
            readOnly
          />
          <Typography variant="body2" color="text.secondary">
            {disponibilite}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              handleNavigateToProduct();
            }}
            size="small"
            sx={{ marginLeft: "auto", marginRight: "auto" }}
          >
            Voir le produit
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
}
