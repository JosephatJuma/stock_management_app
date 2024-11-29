import React from "react";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ErrorAlert, SuccessAlert } from "../components";
import { setError, setSuccess } from "../redux/slices/notification.slice";
import { useSelector, useDispatch } from "react-redux";
import { Box, CssBaseline, Drawer, Paper } from "@mui/material";
function Auth() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  const themeMode = useSelector((state) => state.theme.mode);
  return (
    <Box
      sx={{
        display: "flex",

        backgroundColor: "#0F9D58c0",
        minHeight: "100vh",
        backgroundImage: 'url("")',
      }}
    >
      <CssBaseline />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundImage: "url('../assets/svgs/bottom.svg')",
          backgroundSize: "cover",
        }}
      >
        <Outlet />
        <SuccessAlert
          message={notification.success}
          close={() => dispatch(setSuccess(""))}
        />
        <ErrorAlert
          error={notification.error}
          close={() => dispatch(setError(""))}
        />
      </Container>
    </Box>
  );
}

export default Auth;
