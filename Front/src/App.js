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

function App() {
  const data = {
    name: "ancien test 6494a29a07d11c1263671888 => modifié",
    type: "phone",
  };
  
  const test = async () => {
    const response = await editProduct("6494a29a07d11c1263671888", data);
    console.log(response);
  };

  const connexion = () => {
    axios
      .post(`http://localhost:8000/users/connexion`, data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deconnexion = () => {
    axios
      .post("http://localhost:8000/users/deconnexion")
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem("token");
      })
      .catch((err) => {
        console.log(err);
      });
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
          Test Back
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
