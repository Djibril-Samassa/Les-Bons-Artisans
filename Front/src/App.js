import axios from "./Axios";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./Pages/Accueil";
import Products from "./Pages/Products";
import {
  getProductsList,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
} from "./Apis/produits";

import { createAccount, Login, Logout } from "./Apis/users";

function App() {
  const data = {
    email: "testapi@gmail.com",
    password: "mdp",
  };

  const test = async () => {
    const response = await getProductsList();
    console.log(response);
  };

  const inscription = async () => {
    const response = await createAccount(data);
    console.log(response);
  };

  const connexion = async () => {
    const response = await Login(data);
    console.log(response);
    localStorage.setItem("token", response.data.token);
  };

  const deconnexion = async () => {
    const response = await Logout();
    console.log(response);
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
