import axios from "./Axios";
import { useEffect } from "react";
import "./App.css";

function App() {
  const data = {
    email: "testdz@gmail.com",
    password: "TesteurPasswordUnhashed",
  };
  const test = () => {
    axios
      .get(`http://localhost:8000/produits/produitsList`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
