import React from "react";
import { Container, Box, CssBaseline, Typography, Switch } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ErrorAlert, SuccessAlert } from "../components";
import { setError, setSuccess } from "../redux/slices/notification.slice";
import { useSelector, useDispatch } from "react-redux";
import { changeMode } from "../redux/slices/themeSlice";
import {
  Brightness1,
  Brightness2,
  Brightness3,
  Brightness4,
} from "@mui/icons-material";

function Auth() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const themeMode = useSelector((state) => state.theme.mode);

  const handleThemeToggle = () => {
    // Dispatch action to toggle theme mode (e.g., dark/light mode)
    dispatch({ type: "theme/toggleMode" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: themeMode === "dark" ? "#000000c0" : "#0F9D58c0",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundImage: "url('../assets/svgs/bottom.svg')",
          backgroundSize: "cover",
          flex: 1,
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

      <Box
        component="footer"
        sx={{
          textAlign: "center",
          padding: 2,
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Stock Manager.
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Brightness4 />
          <Typography variant="body2" sx={{ mr: 1 }}>
            Change Theme
          </Typography>
          <Switch
            checked={themeMode === "dark"}
            onChange={() =>
              dispatch(changeMode(themeMode === "dark" ? "light" : "dark"))
            }
            inputProps={{ "aria-label": "theme toggle" }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Auth;
