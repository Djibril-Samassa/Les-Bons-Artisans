import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import { motion } from "framer-motion";
import Style from "./ProductCard.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { deleteProduct } from "../Apis/produits";
import socket from "../socket";
import ProductForm from "../Formulaires/ProductForm";
import { toast } from "react-toastify";

export default function ProductCard(props) {
  // Hooks et variables
  const [edit, setEdit] = useState(false);
  const [askDelete, setAskDelete] = useState(false);
  const [product, setProduct] = useState(props.product);
  const disponibilite = product.available ? "Disponible ✅" : "Indisponible ❌";
  const type =
    product.type === "phone"
      ? "Téléphone 📱"
      : product.type === "laptop"
      ? "Pc 💻"
      : product.type === "tv"
      ? "Tv 📺"
      : "produit";

  // Animation et style
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  const variants = {
    hidden: { x: -200 }, // Position initiale, en dehors de l'écran à gauche
    visible: { x: 0 }, // Position finale, à gauche
  };

  // Fonctions
  // Supprimer un produit
  const handleDelete = async (id) => {
    const response = await deleteProduct(id);
    if (response.status === 200) {
      socket.emit("produit_action");
    } else {
      toast.error(response.response.data.message);
    }
  };

  useEffect(() => {
    socket.on("newProductList", (data) => {
      setProduct(product);
    });
  }, [socket]);

  useEffect(() => {
    setProduct(props.product);
  }, [props]);

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
            {product.name} ({type})
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
          <Typography variant="body1" color="text.secondary">
            Garanti{product.type === "tv" ? "e" : null} {product.warranty_years}{" "}
            an{product.warranty_years <= 1 ? null : "s"}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={() => {
              setEdit(true);
            }}
            size="small"
          >
            Modifier
          </Button>
          <Button
            onClick={() => {
              setAskDelete(true);
            }}
            variant="outlined"
            color="error"
          >
            Supprimer
          </Button>
        </CardActions>
      </Card>
      {/* Modal de suppression */}
      <Modal
        open={askDelete}
        onClose={() => {
          setAskDelete(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Supprimer {product.name} ?
          </Typography>
          <br />

          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              onClick={() => {
                handleDelete(product._id);
              }}
              variant="outlined"
              color="error"
            >
              Supprimer
            </Button>
            <Button
              onClick={() => {
                setAskDelete(false);
              }}
              variant="outlined"
            >
              Annuler
            </Button>
          </CardActions>
        </Box>
      </Modal>

      {/* Modal de modification */}
      <Modal
        open={edit}
        onClose={() => {
          setEdit(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Modifier {product.name}
          </Typography>
          <br />
          <ProductForm
            finsihEdit={() => {
              setEdit(false);
            }}
            isEditing={true}
            product={product}
          />
          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              onClick={() => {
                setEdit(false);
              }}
              color="error"
            >
              Annuler
            </Button>
          </CardActions>
        </Box>
      </Modal>
    </motion.div>
  );
}
