import React from "react";
import { Formik } from "formik";
import { Grid, Button } from "@mui/material";
import TextInputField from "../components/TextInputField";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { Save } from "@mui/icons-material";
import useBatches from "../api/hooks/useBatches";
function AddBatchForm() {
  const { submitting } = useSelector((state) => state.batches);
  const { company } = useSelector((state) => state.auth);
  const { handleAddBatch } = useBatches();
  const validationSchema = yup.object({
    name: yup.string().required("Batch name is required"),
    batchNumber: yup
      .number("Batch Number must be a number")
      .required("Batch number is required"),
    totalInvestment: yup
      .number("Total Investment must be a number")
      .min(1, "Minimum price should be 1")
      .required("Total investment is required"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          batchNumber: 0,
          totalInvestment: 1,
          companyId: company?.id,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleAddBatch(values);
        }}
      >
        {({ handleSubmit }) => (
          <form className="form-wrap" onSubmit={handleSubmit} method="POST">
            <Grid container className="form-grid" spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <div className="form-input">
                  <label htmlFor="name">
                    Batch Name
                    <span className="asterisks">*</span>
                  </label>

                  <TextInputField
                    name="name"
                    placeholder="Flu camp"
                    type="input"
                    size="small"
                    sx={{
                      marginTop: "5px",
                    }}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className="form-input">
                  <label htmlFor="batchNumber">
                    Batch Number
                    <span className="asterisks">*</span>
                  </label>

                  <TextInputField
                    name="batchNumber"
                    placeholder="e.g 10"
                    type="number"
                    size="small"
                    sx={{
                      marginTop: "5px",
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div>
                  <label htmlFor="totalInvestment">
                    Total Amount Invested<span className="asterisks">*</span>
                  </label>
                  <TextInputField
                    name="totalInvestment"
                    placeholder="Enter Unit price"
                    type="number"
                    size="small"
                    sx={{
                      marginTop: "5px",
                    }}
                  />
                </div>
              </Grid>
            </Grid>

            <div className="form-grid">
              {submitting ? (
                <LoadingButton
                  className="btnNext"
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
                  Saving
                </LoadingButton>
              ) : (
                <Button
                  type="submit"
                  className="submit-btn"
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
                  endIcon={<Save />}
                >
                  Save
                </Button>
              )}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AddBatchForm;
