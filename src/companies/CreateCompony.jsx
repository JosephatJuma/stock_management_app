import * as React from "react";
import { Container, Avatar, Button, Box, Typography } from "@mui/material";
import { Business, Add, CloudUpload } from "@mui/icons-material";
import { Formik } from "formik";
import { TextInputField } from "../components";
import { styled } from "@mui/material/styles";
import useCompany from "../api/hooks/useCompany";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function CreateCompony() {
  const { handleCreateCompany } = useCompany();
  const { loading, user } = useSelector((state) => state.auth);

  const themeMode = useSelector((state) => state.theme.mode);

  return (
    <Container component="main" maxWidth="xs">
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
        <Avatar
          sx={{ m: 1, bgcolor: "#0F9D58", height: "80px", width: "80px" }}
        >
          <Business fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create your company profile
        </Typography>
        <Formik
          initialValues={{
            name: "",
            location: "",
            creatorId: user?.id,
          }}
          //validationSchema={validationSchema}
          onSubmit={(values) => {
            handleCreateCompany(values);
          }}
        >
          {({ handleSubmit }) => (
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, padding: "20px" }}
              minWidth={"100%"}
            >
              <TextInputField
                name="name"
                placeholder="Enter company name"
                type="input"
                size="small"
                sx={{
                  marginTop: "5px",
                }}
              />
              <TextInputField
                name="Location"
                placeholder="Enter company location"
                type="input"
                size="small"
                sx={{
                  marginTop: "5px",
                }}
              />

              <Button
                component="label"
                fullWidth
                variant="contained"
                startIcon={<CloudUpload />}
                sx={{
                  fontSize: "14px",
                  padding: "8px 40px",
                  marginY: "10px",
                  backgroundColor: "#0F9D58",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                  border: "none",
                  "&:hover": {
                    backgroundColor: "#0F9D58c0",
                  },
                }}
              >
                Upload Logo
                <VisuallyHiddenInput type="file" />
              </Button>
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
                  endIcon={<Add />}
                >
                  Create Company
                </Button>
              )}
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
