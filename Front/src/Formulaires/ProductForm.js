import React, { useEffect, useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Rating,
} from "@mui/material";
import { createProduct, editProduct } from "../Apis/produits";
import socket from "../socket";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function ProductForm(props) {
  // Hooks et variablesx
  const variants = {
    hidden: { y: -200 },
    visible: { y: 0 },
  };
  const [isEditing, setIsEditing] = useState(props.isEditing);

  // Dans le cas d'une modification on attribut les valeurs du produit modifier comme valuer par défaut au lieu de lui faire tout réécrire
  const [productData, setProductData] = useState({
    creator_id: props.id,
    creator_name: props.creator_name,
    name: isEditing ? props.product.name : "",
    type: isEditing ? props.product.type : "phone",
    price: isEditing ? props.product.price : null,
    warranty_years: isEditing ? props.product.warranty_years : null,
    available: isEditing ? props.product.available : true,
    rating: isEditing ? props.product.rating : 0,
  });

  // Fonctions
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Si c'est une création
    if (!isEditing) {
      const response = await createProduct(productData);
      if (response.status === 201) {
        socket.emit("produit_action");
        toast.success(response.data.message);
      } else {
        toast.error(response.response.data.message);
      }
    }
    // Si c'est une modification
    else {
      const id = props.product._id;
      const response = await editProduct(id, productData);
      if (response.status === 200) {
        socket.emit("produit_action");
        props.finsihEdit();
        toast.success(response.data.message);
      } else {
        toast.error(response.response.data.message);
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.2 }}
    >
      <form onSubmit={handleSubmit}>
        <FormGroup
          sx={{
            "& > :not(:last-child)": { marginBottom: "10px" },
            "> div": { marginTop: "10px" },
          }}
        >
          <FormControl>
            {/* Nom */}
            <InputLabel>Nom du produit</InputLabel>
            <Input
              name="name"
              value={productData.name}
              onChange={(event) => handleInputChange(event)}
              required
            />
          </FormControl>
          {/* Prix */}
          <FormControl>
            <InputLabel>Prix</InputLabel>
            <Input
              name="price"
              inputProps={{ type: "number" }}
              value={productData.price}
              onChange={(event) => handleInputChange(event)}
              required
            />
          </FormControl>

          {/* Disponibilité */}
          <FormLabel id="demo-radio-buttons-group-label">Disponible</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="available"
            value={productData.available.toString()}
            onChange={(event) => handleInputChange(event)}
          >
            <FormControlLabel value="true" control={<Radio />} label="Oui" />
            <FormControlLabel value="false" control={<Radio />} label="Non" />
          </RadioGroup>

          {/* Type */}
          <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="type"
            value={productData.type}
            onChange={(event) => handleInputChange(event)}
          >
            <FormControlLabel
              value="phone"
              control={<Radio required />}
              label="Téléphone"
            />
            <FormControlLabel
              value="laptop"
              control={<Radio required />}
              label="PC Portable"
            />
            <FormControlLabel
              value="tv"
              control={<Radio required />}
              label="Télévision"
            />
          </RadioGroup>

          {/* Garantie */}
          <FormControl>
            <InputLabel>Garantie</InputLabel>
            <Input
              name="warranty_years"
              value={productData.warranty_years}
              onChange={(event) => handleInputChange(event)}
              required
              inputProps={{ type: "number" }}
            />
          </FormControl>

          {/* Notation */}
          <Rating
            name="rating"
            value={productData.rating}
            onChange={(event, value) =>
              handleInputChange({ target: { name: "rating", value } })
            }
            precision={0.5}
            size="large"
            required
          />

          <FormControl>
            <Button type="submit" variant="contained">
              {isEditing ? "Modifier" : "Créer"} le produit
            </Button>
          </FormControl>
        </FormGroup>
      </form>
    </motion.div>
  );
}
