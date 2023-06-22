import axios from "axios";
import { useEffect } from "react";
import "./App.css";

function App() {
  const data = {
    name: "A16dd4548dza,dzpa,dzoandoijnzandzdzaz1 Phone1",
    type: "phone",
    price: 200.05,
    rating: 3.8,
    warranty_years: 1,
    available: true,
  };
  const test = () => {
    axios
      .delete(
        `http://localhost:8000/produit/suppresion/649483efb17c11df7aa1bad4`
      )
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message);
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
      </header>
    </div>
  );
}

export default App;
