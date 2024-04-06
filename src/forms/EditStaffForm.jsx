import React from "react";
import { Formik } from "formik";
import { Grid, Button, Box } from "@mui/material";
import TextInputField from "../components/TextInputField";
import SelectField from "../components/SelectField";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { useSelector } from "react-redux";

function EditStaffForm(props) {
  const editting = useSelector((state) => state.staff.submitting);
  const userList = useSelector((state) => state.staff.userList);
  const selectedStaff = useSelector((state) => state.staff.selectedStaff);

  const loading = useSelector((state) => state.staff.loading);
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    role: yup.string().required("Role is required"),
    supervisorId: yup.string().required("You must select the supervisor"),
  });

  function validateSelect(value) {
    let error;
    if (!value) {
      error = "Required";
    } else {
      error = "";
    }
    return error;
  }

  return (
    <div>
      <Formik
        initialValues={{
          name: selectedStaff.name,
          role: selectedStaff.role,
          supervisorId: selectedStaff.supervisorId,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          props.handleEdit(values, selectedStaff.id);
        }}
      >
        {({ handleSubmit }) => (
          <form className="form-wrap" onSubmit={handleSubmit} method="POST">
            <Grid container className="form-grid" spacing={2}>
              <Grid item xs={6}>
                <div className="form-input">
                  <label htmlFor="name">
                    Staff Name
                    <span className="asterisks">*</span>
                  </label>

                  <TextInputField
                    name="name"
                    placeholder="E.g Juma Josephat"
                    type="input"
                    size="small"
                    sx={{
                      marginTop: "5px",
                    }}
                  />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className="form-input">
                  <label htmlFor="role">
                    Staff Role
                    <span className="asterisks">*</span>
                  </label>

                  <TextInputField
                    name="role"
                    placeholder="E.g Software Developer"
                    type="input"
                    size="small"
                    sx={{
                      marginTop: "5px",
                    }}
                  />
                </div>
              </Grid>
            </Grid>
            <div>
              <label htmlFor="supervisorId">
                Reports To<span className="asterisks">*</span>
              </label>

              {loading ? (
                // Render a loading indicator or message while data is being fetched
                <p>Just a moment...</p>
              ) : (
                // Render the SelectField component when options are available
                <SelectField
                  labelName="Select Supervisor"
                  name="supervisorId"
                  validate={validateSelect}
                  fullWidth
                  size="small"
                  sx={{
                    marginTop: "5px",
                  }}
                  MenuItems={userList.map((user) => ({
                    value: user.id,
                    label: user.role,
                    name: user.name,
                    disabled: user.id === selectedStaff.id,
                  }))}
                />
              )}
            </div>

            <div className="form-grid">
              {editting ? (
                <LoadingButton
                  className="btnNext"
                  loading
                  color="secondary"
                  loadingPosition="start"
                  variant="contained"
                  sx={{
                    fontSize: "14px",
                    pEditing: "8px 40px",
                    borderRadius: "15px",
                  }}
                >
                  Editting
                </LoadingButton>
              ) : (
                <Button
                  type="submit"
                  className="submit-btn"
                  sx={{
                    fontSize: "14px",
                    pEditing: "8px 40px",
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
                  Submit
                </Button>
              )}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditStaffForm;
