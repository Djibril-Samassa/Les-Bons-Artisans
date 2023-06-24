import { React, useEffect, useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Rating,
  Typography,
} from "@mui/material";
import { Login, createAccount } from "../Apis/users";
import { useNavigate } from "react-router-dom";

export default function UserForm() {
  // Hooks et variables
  const [type, setType] = useState("connexion");
  const [userData, setUserData] = useState({
    email: null,
    password: null,
    confirmPassword: null,
  });

  //Fonctions

  const Redirect = useNavigate();

  const changeFormType = () => {
    if (type === "inscription") {
      setType("connexion");
    } else if (type === "connexion") {
      setType("inscription");
    } else {
      alert("une erreur s'est produite");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const checkPasswords = () => {
    if (userData.password === userData.confirmPassword) {
      return true;
    } else {
      alert("Les mots de passe ne correspondent pas");
      return false;
    }
  };

  const Signup = async (e) => {
    e.preventDefault();
    const data = userData;
    const isPasswordMatch = checkPasswords();
    if (isPasswordMatch) {
      const response = await createAccount(data);
      if (response.status === "201") {
        alert(response.data.message);
      } else {
        alert(response.response.data.message);
      }
    }
  };

  const Signin = async (e) => {
    e.preventDefault();
    const response = await Login(userData);
    if (response.status === 200) {
      alert(response.data.message);
      const username = response.data.user;
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      Redirect("/");
    } else {
      alert(response.response.data.message);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        type === "inscription"
          ? Signup(e)
          : type === "connexion"
          ? Signin(e)
          : alert("Une erreur s'est produite");
      }}
    >
      <Typography gutterBottom variant="h4" component="div">
        Authentification
      </Typography>
      <FormGroup
        sx={{
          "& > :not(:last-child)": { marginBottom: "10px" },
          "> div": { marginTop: "10px" },
        }}
      >
        {/* Adresse e-mail */}
        <FormControl>
          <InputLabel>Adresse e-mail</InputLabel>
          <Input
            name="email"
            value={userData.mail}
            onChange={(event) => handleInputChange(event)}
            required
            inputProps={{ type: "email" }}
          />
        </FormControl>

        {/* Mot de passe */}
        <FormControl>
          <InputLabel>Mot de passe</InputLabel>
          <Input
            name="password"
            value={userData.password}
            onChange={(event) => handleInputChange(event)}
            required
            inputProps={{ type: "password", minLength: 8 }}
          />
        </FormControl>

        {type === "inscription" ? (
          <>
            {/* Confirmation mot de passe */}
            <FormControl>
              <InputLabel>Confirmer mot de passe</InputLabel>
              <Input
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={(event) => handleInputChange(event)}
                required
                inputProps={{ type: "password" }}
              />
            </FormControl>
          </>
        ) : null}

        <FormControl>
          <Button type="submit" variant="contained">
            {type === "inscription" ? "Inscription" : "Connexion"}
          </Button>

          <Button
            onClick={() => {
              changeFormType();
            }}
          >
            {type === "inscription" ? "Se connecter" : "S'inscrire"}
          </Button>
        </FormControl>
      </FormGroup>
    </form>
  );
}
