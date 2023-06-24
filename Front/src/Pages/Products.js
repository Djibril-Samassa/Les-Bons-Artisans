import { useEffect, useState, react } from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Style from "./Product.module.css";
import { getProductsList } from "../Apis/produits";
import ProductCard from "../Composants/ProductCard";
import ProductForm from "../Formulaires/ProduitForm";
import CardActions from "@mui/material/CardActions";
import { getProductById } from "../Apis/produits";
import socket from "../socket";
import { Logout } from "../Apis/users";
import { useNavigate } from "react-router-dom";

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

export default function Products() {
  // Hooks et variables
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState(null);
  const [cardKey, setCardKey] = useState(0);

  // Fonctions
  const Redirect = useNavigate();

  const fetchProducts = async () => {
    const response = await getProductsList();
    if (response.status === 200) {
      setProducts(response.data.data);
    } else {
      alert(response.response.data.message);
    }
  };

  const handleDeconnect = async () => {
    const response = await Logout();
    if (response.status === 200) {
      alert(response.data.message);
      await localStorage.clear();
      Redirect("/auth");
    } else {
      alert(response.response.data.message);
    }
  };

  // Renders
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    socket.on("newProductList", (data) => {
      const newList = data.data;
      setProducts(newList);
      setShowForm(false);
      setCardKey((prevKey) => prevKey + 1);
    });
  }, [socket]);

  return (
    <>
      <Typography gutterBottom variant="h4" component="div">
        Produits
      </Typography>
      <CardActions>
        <Button
          variant="contained"
          onClick={() => {
            setShowForm(true);
          }}
        >
          Créer un produit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDeconnect();
          }}
        >
          deconnexion
        </Button>
      </CardActions>
      {/* Afficher la liste des produits */}
      <div className={Style.productsContainer}>
        {products?.length > 0
          ? products.map((product, index) => {
              return (
                <ProductCard key={index + "_" + cardKey} product={product} />
              );
            })
          : null}
      </div>

      {/* Afficher le formulaire de création de produit */}
      <Modal
        open={showForm}
        onClose={() => {
          setShowForm(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Créer un produit
          </Typography>
          <br />
          <ProductForm isEditing={false} />
          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              sx={{ justifyContent: "center" }}
              onClick={() => {
                setShowForm(false);
              }}
              color="error"
            >
              Annuler
            </Button>
          </CardActions>
        </Box>
      </Modal>
    </>
  );
}
