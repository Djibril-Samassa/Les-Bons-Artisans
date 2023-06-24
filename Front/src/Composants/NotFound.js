import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function NotFound() {
  const Redirect = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "90vh",
        backgroundColor: "#FF5733",
      }}
    >
      <Typography variant="h1" style={{ color: "white" }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: "white" }}>
        La page que vous cherchez n'existe pas
      </Typography>
      <Button
        onClick={() => {
          Redirect("/");
        }}
        variant="contained"
      >
        Revenir à la page d'accueil
      </Button>
    </Box>
  );
}
