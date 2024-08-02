import * as React from "react";
import {
  Container,
  Avatar,
  Button,
  Checkbox,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Key, Login, Password } from "@mui/icons-material";
import { Formik } from "formik";
import { TextInputField, PasswordInput, FormSubmitButton } from "../components";
import { companies } from "../utils/companies";
import { loginSchema } from "../shemas/loginSchema";
import useLogin from "../api/hooks/useLogin";
import { useSelector } from "react-redux";
export default function SignIn() {
  const { handleLogin } = useLogin();
  const { loading } = useSelector((state) => state.auth);

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "#0F9D58", height: "70px", width: "70px" }}>
        <Key fontSize="large" />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Formik
        initialValues={{
          userName: "",
          password: "",
          companyName: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          handleLogin(values);
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
            {/* <SelectField
              labelName="Select Company"
              name="companyId"
              //validate={validateSelect}
              fullWidth
              size="small"
              sx={{
                marginTop: "5px",
              }}
              MenuItems={companies.map((company) => ({
                value: company.id,
                name: company.name,
              }))}
            /> */}

            <TextInputField
              name="companyName"
              placeholder="Enter Company Name"
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
            <PasswordInput
              name="password"
              placeholder="Enter password"
              //type="password"
              size="small"
              sx={{
                marginTop: "5px",
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" />}
              label="Remember me"
            />
            {/* <Button
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
              endIcon={<Login />}
            >
              Sign In
            </Button> */}
            <FormSubmitButton
              handleSubmit={handleSubmit}
              loading={loading}
              title=" Sign In"
              loadingTitle={"Signing In..."}
              icon={<Login />}
            />
            <Grid container>
              <Grid item xs>
                <Link to="/auth/reset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              {/* <Grid item>
                <Link to={"/auth/signup"}>
                  <Typography>Create Account</Typography>
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        )}
      </Formik>
    </Box>
  );
}
