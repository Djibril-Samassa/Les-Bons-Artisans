import axios from "./Axios";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./Pages/Accueil";
import Products from "./Pages/Products";
import LoginPage from "./Pages/Login";
import CheckLogState from "./Composants/CheckLogState";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<CheckLogState page={Accueil} />} />
          <Route path="/products" element={<CheckLogState page={Products} /> } />
          <Route path="/auth"  element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
