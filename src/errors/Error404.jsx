import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Error404SVG from "../assets/svgs/404.svg";

function Error404() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f3f4f6",
        padding: 2,
      }}
    >
      <img
        src={Error404SVG}
        alt="404 Illustration"
        style={{ width: "100%", maxWidth: "200px", marginBottom: "20px" }}
      />

      <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 3, color: "#6b7280" }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{
          paddingX: 3,
          paddingY: 1.5,
          fontSize: "1rem",
          textTransform: "none",
          backgroundColor: "#0F9D58",
          ":hover": {
            backgroundColor: "#0F9D58c0",
          },
        }}
      >
        Go Back Home
      </Button>
    </Box>
  );
}

export default Error404;
