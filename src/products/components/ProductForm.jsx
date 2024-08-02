import React, { useEffect } from "react";
import { Formik, FieldArray, Field } from "formik";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Grid,
  IconButton,
  Typography,
  Paper,
  FormControlLabel,
  Tooltip,
  Switch,
} from "@mui/material";
import useCategories from "../../api/hooks/useCategories";
import { Add, Close, Save } from "@mui/icons-material";
import { useSelector } from "react-redux";
import * as yup from "yup";
import useProducts from "../../api/hooks/useProducts";

import { LoadingButton } from "@mui/lab";
const validationSchema = yup.object().shape({
  products: yup.array().of(
    yup.object().shape({
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
    })
  ),
});

const initialValues = {
  products: [
    {
      productName: "",
      quantity: 0,
      categoryId: "",
      unitPrice: 0,
      manufactureDate: "",
      expDate: "",
      batch: "",
      rate: 1.5,
      sellingPrice: 0,
      isAutomated: true,
    },
  ],
};

const ProductForm = () => {
  const { handleFetchCategories } = useCategories();
  const { handleAddProduct } = useProducts();
  const { categories, loading } = useSelector((state) => state.categories);
  const { submitting } = useSelector((state) => state.products);

  useEffect(() => {
    !categories.length > 0 && handleFetchCategories();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleAddProduct(values);
      }}
    >
      {({ handleSubmit, values, errors, touched, setFieldValue }) => {
        useEffect(() => {
          // Iterate over each product
          values.products.forEach((product, index) => {
            // Check if unitPrice is not empty
            if (
              product.isAutomated &&
              product.unitPrice !== 0 &&
              product.rate !== 0
            ) {
              // Calculate the new selling price

              // Update the selling price for the current item
              setFieldValue(
                `products[${index}].sellingPrice`,
                product?.unitPrice * product?.rate
              );
            }
          });
        }, [values.products, setFieldValue]);
        return (
          <Grid>
            <form onSubmit={handleSubmit}>
              <FieldArray
                name="products"
                render={({ remove, push }) => (
                  <div>
                    {values.products.map((product, index) => (
                      <Paper
                        sx={{ padding: 1, borderRadius: 1, marginTop: 1 }}
                        key={index}
                      >
                        {index > 0 && (
                          <IconButton onClick={() => remove(index)}>
                            <Close />
                          </IconButton>
                        )}
                        <Grid container spacing={2} xs={12} sm={12} md={12}>
                          <Grid item xs={6} sm={4} md={2}>
                            <InputLabel style={{ fontSize: "0.8rem" }}>
                              Product Name <span className="asterisks">*</span>
                            </InputLabel>
                            <Field name={`products[${index}].name`}>
                              {({ field }) => (
                                <TextField
                                  {...field}
                                  variant="standard"
                                  fullWidth
                                  type="input"
                                  placeholder="Product Name"
                                  size="small"
                                  error={errors.products?.[index]?.name}
                                  helperText={errors.products?.[index]?.name}
                                />
                              )}
                            </Field>
                          </Grid>
                          <Grid item xs={6} sm={4} md={2}>
                            <InputLabel style={{ fontSize: "0.8rem" }}>
                              Category
                            </InputLabel>
                            <Field name={`products[${index}].categoryId`}>
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
                                          touched.products?.[index]
                                            ?.categoryId &&
                                          errors.products?.[index]?.categoryId
                                        }
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
                                        {touched.products?.[index]
                                          ?.categoryId &&
                                          errors.products?.[index]?.categoryId}
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
                            <Field name={`products[${index}].unitPrice`}>
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
                                  error={
                                    touched.products?.[index]?.unitPrice &&
                                    errors.products?.[index]?.unitPrice
                                  }
                                  helperText={
                                    touched.products?.[index]?.unitPrice &&
                                    errors.products?.[index]?.unitPrice
                                  }
                                />
                              )}
                            </Field>
                          </Grid>
                          <Grid item xs={6} sm={4} md={1}>
                            <InputLabel style={{ fontSize: "0.8rem" }}>
                              Quantity<span className="asterisks">*</span>
                            </InputLabel>
                            <Field name={`products[${index}].quantity`}>
                              {({ field }) => (
                                <TextField
                                  {...field}
                                  variant="standard"
                                  fullWidth
                                  type="number"
                                  size="small"
                                  error={
                                    touched.products?.[index]?.quantity &&
                                    errors.products?.[index]?.quantity
                                  }
                                  helperText={
                                    touched.products?.[index]?.quantity &&
                                    errors.products?.[index]?.quantity
                                  }
                                />
                              )}
                            </Field>
                          </Grid>
                          <Grid item xs={6} sm={4} md={1}>
                            <InputLabel style={{ fontSize: "0.8rem" }}>
                              Rate <span className="asterisks">*</span>
                            </InputLabel>
                            <Field name={`products[${index}].rate`}>
                              {({ field }) => (
                                <TextField
                                  {...field}
                                  variant="standard"
                                  fullWidth
                                  type="number"
                                  size="small"
                                  error={
                                    touched.products?.[index]?.rate &&
                                    errors.products?.[index]?.rate
                                  }
                                  helperText={
                                    touched.products?.[index]?.rate &&
                                    errors.products?.[index]?.rate
                                  }
                                />
                              )}
                            </Field>
                          </Grid>
                          <Grid item xs={6} sm={4} md={2}>
                            <InputLabel style={{ fontSize: "0.8rem" }}>
                              Selling Price <span className="asterisks">*</span>
                            </InputLabel>

                            <Field name={`products[${index}].sellingPrice`}>
                              {({ field }) => (
                                <TextField
                                  {...field}
                                  variant="standard"
                                  fullWidth
                                  type="number"
                                  //disabled={values.products?.[index]?.isAutomated}
                                  InputProps={{
                                    startAdornment: (
                                      <Tooltip
                                        title={
                                          values.products?.[index]?.isAutomated
                                            ? "Make it manual"
                                            : "Make it automatic"
                                        }
                                      >
                                        <FormControlLabel
                                          control={
                                            <Switch
                                              checked={
                                                values.products?.[index]
                                                  ?.isAutomated
                                              }
                                              onChange={() => {
                                                setFieldValue(
                                                  `products[${index}].isAutomated`,
                                                  !product.isAutomated
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
                                  error={
                                    touched.products?.[index]?.sellingPrice &&
                                    errors.products?.[index]?.sellingPrice
                                  }
                                  helperText={
                                    touched.products?.[index]?.sellingPrice &&
                                    errors.products?.[index]?.sellingPrice
                                  }
                                />
                              )}
                            </Field>
                          </Grid>
                          <Grid item xs={6} sm={4} md={2}>
                            <InputLabel style={{ fontSize: "0.8rem" }}>
                              Expiry Date<span className="asterisks">*</span>
                            </InputLabel>
                            <Field name={`products[${index}].expDate`}>
                              {({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  type="date"
                                  variant="standard"
                                  size="small"
                                  error={
                                    touched.products?.[index]?.expDate &&
                                    errors.products?.[index]?.expDate
                                  }
                                  helperText={
                                    touched.products?.[index]?.expDate &&
                                    errors.products?.[index]?.expDate
                                  }
                                />
                              )}
                            </Field>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                    <Button
                      variant="outlined"
                      sx={{
                        fontSize: "14px",
                        padding: "8px 40px",
                        borderColor: "#0F9D58",
                        color: "#0F9D58",
                        borderRadius: "5px",
                        cursor: "pointer",

                        margin: 1,
                      }}
                      endIcon={<Add />}
                      onClick={() =>
                        push({
                          id: values.products.length + 1,
                          quantity: 0,
                          unitPrice: 0,
                          rate: 1.5,
                          sellingPrice: 0,
                          expDate: "",
                          productId: "",
                          isAutomated: true,
                        })
                      }
                    ></Button>
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
                        Adding{" "}
                        {values.products.length > 1 ? "Products" : "Product"}
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
                        Submit{" "}
                        {values.products.length > 1 ? "Products" : "Product"}
                      </Button>
                    )}
                  </div>
                )}
              />
            </form>
          </Grid>
        );
      }}
    </Formik>
  );
};

export default ProductForm;
