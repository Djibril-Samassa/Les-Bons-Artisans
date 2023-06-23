import axios from "./Axios";
import { useEffect } from "react";
import "./App.css";
import {
  getProductsList,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
} from "./Api/produits";

import { createAccount, Login, Logout } from "./Api/users";

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
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p
          onClick={() => {
            test();
          }}
        >
          test
        </p>
        <p
          onClick={() => {
            connexion();
          }}
        >
          Connexion
        </p>
        <p
          onClick={() => {
            deconnexion();
          }}
        >
          Déconnexion
        </p>
      </header>
    </div>
  );
}

export default App;
