import axios from "../Axios";

// Création de compte
export const createAccount = (data) => {
  return axios
    .post("http://localhost:8000/users/inscription", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

// Connexion
export const Login = (data) => {
  return axios
    .post("http://localhost:8000/users/connexion", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

// Déconnexion
export const Logout = () => {
  return axios
    .post("http://localhost:8000/users/deconnexion")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
