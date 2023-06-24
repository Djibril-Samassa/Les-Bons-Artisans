import { React, useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";

export default function CheckLogState(props) {
  // Ce composant sert à vérifier que l'utilisateur est bien connecté avant de lui laisse accéder à un composant
  // Si ce n'est pas le cas il est redirigé à la page d'authentification => Ligne 20

  // Hooks & variables
  const Page = props.page;
  const [token, setToken] = useState(null);

  //   Fonctions
  const Redirect = useNavigate();

  const checkToken = () => {
    const token = localStorage.getItem("token");
    return token !== null;
  };

  useEffect(() => {
    const isTokenValid = checkToken();
    if (!isTokenValid) {
      Redirect("/auth");
    } else {
    }
  }, []);

  return (
    <div>
      <Page />
    </div>
  );
}
