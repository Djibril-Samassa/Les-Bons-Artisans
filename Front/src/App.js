import axios from "./Axios";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./Pages/Accueil";
import Products from "./Pages/Products";
import LoginPage from "./Pages/Login";
import CheckLogState from "./Composants/CheckLogState";
import NotFound from "./Composants/NotFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<CheckLogState page={Accueil} />} />
          <Route path="/products" element={<CheckLogState page={Products} />} />
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
