import { React, useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";

export default function CheckLogState(props) {
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
