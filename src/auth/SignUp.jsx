import * as React from "react";
import { Typography, Box, Grid, Avatar, Button } from "@mui/material";
import Container from "@mui/material/Container";
import {
  AccountCircle,
  Login,
  PersonAdd,
  PersonAddAlt,
} from "@mui/icons-material";
import { Formik } from "formik";
import { TextInputField, PasswordInput } from "../components";
import { Link } from "react-router-dom";
import { registerSchema } from "../shemas/registerSchema";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import useRegister from "../api/hooks/useRegister";
export default function SignUp() {
  const { handleRegister } = useRegister();
  const { loading } = useSelector((state) => state.auth);

  const themeMode = useSelector((state) => state.theme.mode);
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: themeMode === "light" ? "#fff" : "#3D3333",
        width: "100%",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        paddingY: "10px",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "#0F9D58", height: "70px", width: "70px" }}>
        <PersonAddAlt fontSize="large" />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create Account
      </Typography>
      <Formik
        initialValues={{
          name: "",
          userName: "",
          password: "",
        }}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          handleRegister(values);
        }}
      >
        {({ handleSubmit }) => (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            minWidth={"32%"}
          >
            <TextInputField
              name="name"
              placeholder="Enter Full Name"
              type="input"
              size="small"
              sx={{
                marginTop: "5px",
              }}
            />
            <TextInputField
              name="userName"
              placeholder="Enter Username"
              type="input"
              size="small"
              sx={{
                marginTop: "5px",
              }}
            />
            <TextInputField
              name="email"
              placeholder="Enter Email"
              type="inpuit"
              size="small"
              sx={{
                marginTop: "5px",
              }}
            />
            <PasswordInput
              name="password"
              placeholder="Enter password"
              size="small"
              sx={{
                marginTop: "5px",
              }}
            />
            {loading ? (
              <LoadingButton
                className="btnNext"
                fullWidth
                loading
                color="secondary"
                loadingPosition="start"
                variant="contained"
                sx={{
                  fontSize: "14px",
                  padding: "8px 40px",
                  borderRadius: "15px",
                }}
              >
                Creating Account....
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                fullWidth
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  fontSize: "14px",
                  padding: "8px 40px",
                  backgroundColor: "#0F9D58",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                  border: "none",
                  "&:hover": {
                    backgroundColor: "#0F9D58c0",
                  },
                }}
                startIcon={<PersonAdd />}
              >
                Register Account
              </Button>
            )}
            <Grid container flex={1}>
              <Grid item xs>
                <Typography>Already have an account? </Typography>
              </Grid>
              <Grid item>
                <Link to="/auth">
                  <Typography>Login Instead</Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </Box>
  );
}
