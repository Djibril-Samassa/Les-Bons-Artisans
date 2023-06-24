import React, { useEffect } from "react";
import UserForm from "../Formulaires/UserForm";
import { useNavigate } from "react-router-dom";
import { Box, Modal, Typography } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function LoginPage() {
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est déjà connecté
  const checkIfLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token !== null;
  };

  useEffect(() => {
    const isLoggedIn = checkIfLoggedIn();
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <Modal
        open={true}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <UserForm />
        </Box>
      </Modal>
    </div>
  );
}
