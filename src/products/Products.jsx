import React, { useEffect } from "react";
import useProducts from "../api/hooks/useProducts";
import { toggleShowEditProductModal } from "../redux/slices/products.slice";
import ProductsTable from "./components/ProductsTable";
import { useSelector, useDispatch } from "react-redux";
import { FormModal } from "../components";
import EditProductForm from "./components/EditProductForm";

import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#000",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),

    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function CustomizedTabs({ products }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Define the content for each tab
  const tabContent = [
    <ProductsTable data={products} />,
    <div>You will see Statistics here soon</div>,
    <div>Content for Expiry</div>,
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={
          {
            //bgcolor: "#2e1534"
            // bgcolor: "#0F9D58",
          }
        }
      >
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="List of Products" />
          <StyledTab label="Stats" />
          <StyledTab label="Expiry" />
        </StyledTabs>
        <Box sx={{ p: 1 }} />
      </Paper>
      <Box sx={{ pt: 2 }}>{tabContent[value]}</Box>
    </Box>
  );
}

function Products() {
  const dispatch = useDispatch();
  const { products, showEditProductModal, selectedProduct } = useSelector(
    (state) => state.products
  );
  const { handleFetchProducts } = useProducts();
  useEffect(() => {
    if (Object.keys(products).length === 0) {
      handleFetchProducts();
    }
  }, []);
  return (
    <div>
      <CustomizedTabs products={products} />

      <FormModal
        open={showEditProductModal}
        handleClose={() => dispatch(toggleShowEditProductModal())}
        title={`Edit ${selectedProduct?.name}`}
        maxWidth="md"
        fullScreen={true}
      >
        <EditProductForm />
      </FormModal>
    </div>
  );
}

export default Products;
