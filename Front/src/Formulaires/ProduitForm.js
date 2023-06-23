import { React, useState } from "react";
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
} from "@mui/material";
import { createProduct } from "../Apis/produits";

export default function ProductForm() {
  const [productData, setProductData] = useState({
    name: "",
    type: "phone",
    price: null,
    warranty_years: null,
    available: true,
    rating: 2
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Utilisation des données récupérées, par exemple :
    const dataToSend = {
      ...productData,
      price: parseInt(productData.price),
      warranty_years: parseInt(productData.warranty_years),
    };
    console.log(dataToSend);
    const response = await createProduct(productData);
  };

  return (
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
            onChange={handleInputChange}
            required
          />
        </FormControl>
        {/* Prix */}
        <FormControl>
          <InputLabel>Prix</InputLabel>
          <Input
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            required
          />
        </FormControl>

        {/* Disponibilité */}
        <FormLabel id="demo-radio-buttons-group-label">Disponible</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="available"
          value={productData.available}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
        </RadioGroup>

        {/* Garantie */}
        <FormControl>
          <InputLabel>Garantie</InputLabel>
          <Input
            name="warranty_years"
            value={productData.warranty_years}
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <FormControl>
          <Button type="submit" variant="contained">
            Terminer la création
          </Button>
        </FormControl>
      </FormGroup>
    </form>
  );
}
