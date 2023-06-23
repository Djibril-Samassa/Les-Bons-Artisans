import { useEffect, useState, react } from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Style from "./Product.module.css";
import { getProductsList } from "../Apis/produits";
import ProductCard from "../Composants/ProductCard";
import ProductForm from "../Formulaires/ProduitForm";

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
  // Hooks
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(null);

  //   Fonctions
  const fetchProducts = async () => {
    const response = await getProductsList();
    setProducts(response.data.data);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   Au premier
  useEffect(() => {
    fetchProducts();
  }, []);

  //   A la mise à jour de products
  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <>
      <Typography gutterBottom variant="h4" component="div">
        Produits
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        Créer un produit
      </Button>
      <div className={Style.productsContainer}>
        {products?.length > 0
          ? products.map((product, index) => {
              return <ProductCard product={product} />;
            })
          : null}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Créer un produit
          </Typography>
          <br />
          <ProductForm />
        </Box>
      </Modal>
    </>
  );
}
