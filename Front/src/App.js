import axios from "axios";
import { useEffect } from "react";
import "./App.css";

function App() {
  const data = {
    name: "test zajzdadzadzamodif",
    type: "phone aïe",
    price: 200.05,
    rating: 3.8,
    warranty_years: 1,
    available: true,
  };
  const test = () => {
    axios
      .post(`http://localhost:8000/produit/creation/`, data)
      .then((res) => {
        console.log(res.data);
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
      </header>
    </div>
  );
}

export default App;
