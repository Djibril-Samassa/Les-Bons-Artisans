import axios from "../Axios";

// Récupérer liste des produits
export const getProductsList = () => {
  return axios
    .get(`http://localhost:8000/produits/produitsList`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

// Récupérer un produit à partir de l'id
export const getProductById = (id) => {
  return axios
    .get(`http://localhost:8000/produits/produit/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

// Créer un produit
export const createProduct = (data) => {
  return axios
    .post("http://localhost:8000/produits/creation", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

// Modifier un produit
export const editProduct = (id, data) => {
  return axios
    .post(`http://localhost:8000/produits/modification/${id}`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

// Supprimer un produit
export const deleteProduct = (id) => {
  return axios
    .delete(`http://localhost:8000/produits/suppresion/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
