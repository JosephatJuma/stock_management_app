import * as React from "react";
import { Avatar, Button, Grid, Box, Typography } from "@mui/material";
import { resetSchema } from "../shemas/resetSchema";
import { Link } from "react-router-dom";
import { LockOutlined, LockOpen } from "@mui/icons-material";
import { Formik } from "formik";
import { TextInputField, FormSubmitButton } from "../components";
import useRegister from "../api/hooks/useRegister";
import { useSelector } from "react-redux";

export default function ForgotPassword() {
  const { handleRequestpasswordreset } = useRegister();
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
        // borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        paddingY: "10px",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "#0F9D58", height: "70px", width: "70px" }}>
        <LockOutlined fontSize="large" />
      </Avatar>
      <Typography component="h1" variant="h5">
        Password Reset
      </Typography>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={resetSchema}
        onSubmit={(values) => {
          handleRequestpasswordreset(values);
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
              name="email"
              placeholder="Enter Your Email"
              type="input"
              size="small"
              sx={{
                marginTop: "5px",
              }}
            />

            <FormSubmitButton
              handleSubmit={handleSubmit}
              loading={loading}
              title="Reset my Password"
              loadingTitle={"Sending Link"}
              icon={<LockOpen />}
            />

            <Grid container sx={{ marginY: "10px" }}>
              <Grid item xs>
                <Typography variant="body2">Remember password?</Typography>
              </Grid>
              <Grid item>
                <Link to={"/auth"}>
                  <Typography>Login here</Typography>
                </Link>
              </Grid>
            </Grid>
            {/* <Grid container>
              <Grid item xs>
                <Typography variant="body2">
                  Don't have an account yet?
                </Typography>
              </Grid>
              <Grid item>
                <Link to={"/auth/signup"}>
                  <Typography>Create Account</Typography>
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        )}
      </Formik>
    </Box>
  );
}
