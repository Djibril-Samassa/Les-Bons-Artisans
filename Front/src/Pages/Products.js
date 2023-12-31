import { useEffect, useState, react } from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Style from "./Product.module.css";
import { getProductsList } from "../Apis/produits";
import ProductCard from "../Composants/ProductCard";
import ProductForm from "../Formulaires/ProductForm";
import CardActions from "@mui/material/CardActions";
import { getProductById } from "../Apis/produits";
import socket from "../socket";
import { Logout } from "../Apis/users";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const [filteredList, setFilteredList] = useState(null);
  const [cardKey, setCardKey] = useState(0);
  const [filter, setFilter] = useState(null);

  // Fonctions
  const Redirect = useNavigate();

  // Récupération des produits
  const fetchProducts = async () => {
    const response = await getProductsList();
    if (response.status === 200) {
      setProducts(response.data.data);
      setFilteredList(response.data.data);
    } else {
      toast.error(response.response.data.message);
    }
  };

  const handleDeconnect = async () => {
    const response = await Logout();
    if (response.status === 200) {
      toast.success(response.data.message);
      await localStorage.clear();
      Redirect("/auth");
    } else {
      toast.error(response.response.data.message);
    }
  };

  // Filtrer les produits
  const filterProducts = (type) => {
    const productType = type;
    const filteredL = products.filter((product) => {
      return product.type === productType;
    });
    setFilteredList(filteredL);
    setFilter(productType);
  };

  // Si le filtre est activé on affiche tous les produits
  const disableFilter = () => {
    setFilteredList(products);
    setFilter(null);
  };

  // Renders
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    socket.on("newProductList", (data) => {
      const newList = data.data;
      fetchProducts();
      setProducts(newList);
      setShowForm(false);
      setCardKey((prevKey) => prevKey + 1);
      setFilter(null);
    });
  }, [socket]);

  const user = JSON.parse(localStorage?.user);

  return (
    <>
      <Typography>{user.firstname}</Typography>
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
      <br />
      <CardActions>
        <Button
          variant={filter === "phone" ? "contained" : null}
          onClick={() => {
            filterProducts("phone");
          }}
        >
          Téléphone
        </Button>
        <Button
          variant={filter === "laptop" ? "contained" : null}
          // variant="contained"
          onClick={() => {
            filterProducts("laptop");
          }}
        >
          Pc portable
        </Button>
        <Button
          variant={filter === "tv" ? "contained" : null}
          // variant="contained"
          onClick={() => {
            filterProducts("tv");
          }}
        >
          Télévision
        </Button>
        {filter !== null ? (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              disableFilter();
            }}
          >
            Retirer le filtre
          </Button>
        ) : null}
      </CardActions>
      {/* Afficher la liste des produits */}
      <div className={Style.productsContainer}>
        {filteredList?.length > 0
          ? filteredList.map((product, index) => {
              return (
                <ProductCard
                  key={index + "_" + cardKey}
                  product={product}
                  creator_id={user.id}
                />
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
          <ProductForm
            creator_name={user.firstname}
            id={user.id}
            isEditing={false}
          />
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
