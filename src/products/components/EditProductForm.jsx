import React, { useEffect } from "react";
import { Formik, Field } from "formik";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Grid,
  Typography,
  Paper,
  FormControlLabel,
  Tooltip,
  Switch,
} from "@mui/material";
import useCategories from "../../api/hooks/useCategories";
import { Save } from "@mui/icons-material";
import { useSelector } from "react-redux";
import * as yup from "yup";
import useProducts from "../../api/hooks/useProducts";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import { FormSubmitButton } from "../../components";
const validationSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  unitPrice: yup
    .number("Price must be a currency value")
    .min(1, "Minimum price should be 100")
    .required("Unit price is required"),
  rate: yup
    .number("Rate must be a number")
    .min(1.1)
    .max(10)
    .required("Rate is required"),
  quantity: yup
    .number("Quantity must be a number")
    .min(1, "Minimum Quantity should be 1")
    .required("Quantity is required"),
  categoryId: yup.string().required("You must select the Category"),
  expDate: yup.date().required("Expiry date is required"),
  sellingPrice: yup
    .number("Selling price must be a number")
    .required("Selling price is required")
    .min(
      yup.ref("unitPrice"),
      "Selling price cannot be less than the unit price"
    ),
});

const EditProductForm = () => {
  const { handleFetchCategories } = useCategories();
  const { handleEditProduct } = useProducts();
  const { categories, loading } = useSelector((state) => state.categories);
  const { submitting, selectedProduct } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    !categories.length > 0 && handleFetchCategories();
  }, []);

  return (
    <Formik
      initialValues={{
        name: selectedProduct?.name || "",
        quantity: selectedProduct?.quantity || 0,
        categoryId: selectedProduct?.categoryId || "",
        unitPrice: selectedProduct?.unitPrice || 0,
        manufactureDate: selectedProduct?.manDate || "",
        expDate: dayjs(selectedProduct?.expiryDate).format("MM/DD/YYYY") || "",
        batch: selectedProduct?.batch || "",
        rate: selectedProduct?.rate || 1.5,
        sellingPrice: selectedProduct?.sellingPrice || 0,
        isAutomated: true,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleEditProduct(values, selectedProduct?.id);
      }}
    >
      {({ handleSubmit, values, errors, touched, setFieldValue }) => {
        useEffect(() => {
          // Iterate over each product

          // Check if unitPrice is not empty
          if (
            values.isAutomated &&
            values.unitPrice !== 0 &&
            values.rate !== 0
          ) {
            // Calculate the new selling price

            // Update the selling price for the current item
            setFieldValue(`sellingPrice`, values.unitPrice * values?.rate);
          }
        }, [values, setFieldValue]);
        return (
          <Grid>
            <form onSubmit={handleSubmit}>
              <div>
                <Paper sx={{ padding: 1, borderRadius: 1, marginTop: 1 }}>
                  <Typography>
                    Profit: {values?.sellingPrice - values?.unitPrice}
                  </Typography>

                  <Grid container spacing={2} xs={12} sm={12} md={12}>
                    <Grid item xs={6} sm={4} md={2}>
                      <InputLabel style={{ fontSize: "0.8rem" }}>
                        Product Name <span className="asterisks">*</span>
                      </InputLabel>
                      <Field name={`name`}>
                        {({ field }) => (
                          <TextField
                            {...field}
                            variant="standard"
                            fullWidth
                            type="input"
                            placeholder="Product Name"
                            size="small"
                            error={errors.name}
                            helperText={errors.name}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                      <InputLabel style={{ fontSize: "0.8rem" }}>
                        Category
                      </InputLabel>
                      <Field name={`categoryId`}>
                        {({ field }) => (
                          <div>
                            {loading ? (
                              <p>Loading categories...</p>
                            ) : (
                              <FormControl fullWidth size="small">
                                <Select
                                  {...field}
                                  variant="standard"
                                  error={
                                    touched.categoryId && errors.categoryId
                                  }

                                  // value={"Family"}
                                >
                                  {categories.map((category) => (
                                    <MenuItem
                                      key={category.id}
                                      value={category.id}
                                    >
                                      {category.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <Typography
                                  sx={{ color: "tomato" }}
                                  variant="caption"
                                >
                                  {touched.categoryId && errors.categoryId}
                                </Typography>
                              </FormControl>
                            )}
                          </div>
                        )}
                      </Field>
                    </Grid>

                    <Grid item xs={6} sm={4} md={2}>
                      <InputLabel style={{ fontSize: "0.8rem" }}>
                        Unit Price<span className="asterisks">*</span>
                      </InputLabel>
                      <Field name={`unitPrice`}>
                        {({ field }) => (
                          <TextField
                            {...field}
                            variant="standard"
                            fullWidth
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  UGX
                                </InputAdornment>
                              ),
                            }}
                            size="small"
                            error={touched.unitPrice && errors.unitPrice}
                            helperText={touched.unitPrice && errors.unitPrice}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6} sm={4} md={1}>
                      <InputLabel style={{ fontSize: "0.8rem" }}>
                        Quantity<span className="asterisks">*</span>
                      </InputLabel>
                      <Field name={`quantity`}>
                        {({ field }) => (
                          <TextField
                            {...field}
                            variant="standard"
                            fullWidth
                            type="number"
                            size="small"
                            error={touched.quantity && errors.quantity}
                            helperText={touched.quantity && errors.quantity}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6} sm={4} md={1}>
                      <InputLabel style={{ fontSize: "0.8rem" }}>
                        Rate <span className="asterisks">*</span>
                      </InputLabel>
                      <Field name={`rate`}>
                        {({ field }) => (
                          <TextField
                            {...field}
                            variant="standard"
                            fullWidth
                            type="number"
                            size="small"
                            error={touched.rate && errors.rate}
                            helperText={touched.rate && errors.rate}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                      <InputLabel style={{ fontSize: "0.8rem" }}>
                        Selling Price <span className="asterisks">*</span>
                      </InputLabel>

                      <Field name={`sellingPrice`}>
                        {({ field }) => (
                          <TextField
                            {...field}
                            variant="standard"
                            fullWidth
                            type="number"
                            //disabled={values.isAutomated}
                            InputProps={{
                              startAdornment: (
                                <Tooltip
                                  title={
                                    values.isAutomated
                                      ? "Make it manual"
                                      : "Make it automatic"
                                  }
                                >
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={
                                          values.products?.[index]?.isAutomated
                                        }
                                        onChange={() => {
                                          setFieldValue(
                                            `isAutomated`,
                                            !values.isAutomated
                                          );
                                        }}
                                        name="auto"
                                        size="small"
                                      />
                                    }
                                    //label="Auto"
                                  />
                                </Tooltip>
                              ),
                            }}
                            size="small"
                            error={touched.sellingPrice && errors.sellingPrice}
                            helperText={
                              touched.sellingPrice && errors.sellingPrice
                            }
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                      <InputLabel style={{ fontSize: "0.8rem" }}>
                        Expiry Date<span className="asterisks">*</span>
                      </InputLabel>
                      <Field name={`expDate`}>
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            type="date"
                            variant="standard"
                            size="small"
                            error={touched.expDate && errors.expDate}
                            helperText={touched.expDate && errors.expDate}
                          />
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                </Paper>
                <FormSubmitButton
                  icon={<Save />}
                  title={"Edit Product"}
                  loadingTitle={"Editing Product"}
                  loading={submitting}
                />

                {/* {submitting ? (
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
                    Adding {values.products.length > 1 ? "Products" : "Product"}
                  </LoadingButton>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    type="submit"
                    className="submit-btn"
                    sx={{
                      fontSize: "14px",
                      padding: "8px 40px",
                      borderColor: "#0F9D58",
                      color: "#fff",
                      borderRadius: "5px",
                      cursor: "pointer",
                      backgroundColor: "#0F9D58",

                      margin: 1,
                      "&:hover": {
                        backgroundColor: "#0F9D58c0",
                      },
                    }}
                    endIcon={<Save />}
                  >
                    Edit Product
                  </Button>
                )} */}
              </div>
            </form>
          </Grid>
        );
      }}
    </Formik>
  );
};

export default EditProductForm;
