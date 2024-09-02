import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Box, CssBaseline, Drawer, Paper } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import EditProductForm from "./products/components/EditProductForm";
//import { AddProductForm } from "./forms";
//import { AddSalesForm } from "./sales";
import { AddSalesForm } from "./sales";
import ProductForm from "./products/components/ProductForm";
import { setSuccess, setError } from "./redux/slices/notification.slice";
import {
  SuccessAlert,
  ErrorAlert,
  ConfirmAlert,
  FormModal,
  Header,
  DrawerComponent,
  LogoutConfirmDialogue,
} from "./components";

import { toggleShowAddProductModal } from "./redux/slices/products.slice";
import { toggleShowAddSaleModal } from "./redux/slices/sales.slice";
import MessageBox from "./chats/components/MessageBox";
const drawerWidth = 240;

function MainLayout(props) {
  const { window } = props;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const themeMode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const sales = useSelector((state) => state.sales);
  const showDelete = useSelector((state) => state.staff.showDeleteModal);
  const deleting = useSelector((state) => state.staff.submitting);
  const notification = useSelector((state) => state.notification);
  const errorMessage = useSelector((state) => state.staff.error);
  const selectedStaff = useSelector((state) => state.staff.selectedStaff);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",

        backgroundColor: themeMode === "light" && "#f2ebeb",
        minHeight: "100vh",
        backgroundImage: 'url("")',
      }}
    >
      <CssBaseline />
      {/* This is the AppBar */}
      <Header
        toggleDrawer={handleDrawerToggle}
        drawerWidth={drawerWidth}
        themeMode={themeMode}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              color: "white",
              backgroundColor: themeMode === "light" && "white",
            },
          }}
        >
          <DrawerComponent
            drawerWidth={drawerWidth}
            toggleDrawer={handleDrawerToggle}
            theme={themeMode}
          />
        </Drawer>
        <Drawer
          container={container}
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: themeMode === "light" ? "white" : "#2e2a2a",
              color: "white",
            },
          }}
        >
          <DrawerComponent
            drawerWidth={drawerWidth}
            theme={themeMode}
            toggleDrawer={() => {}}
          />
        </Drawer>
      </Box>
      <Box
        component="div"
        sx={{
          flexGrow: 1,
          p: 1,
          width: {
            xs: `calc(100% + ${drawerWidth}px)`,
            sm: `calc(100% + ${drawerWidth}px)`,
          },
        }}
      >
        {/* <Toolbar /> */}
        <Box
          style={{
            marginTop: 70,
            padding: 0,
            "@media (minWidth: 600px)": {
              width: "90vw",
              overflowY: "auto",
            },
          }}
        >
          <Outlet />
        </Box>
        <FormModal
          open={products.showAddProductModal}
          handleClose={() => dispatch(toggleShowAddProductModal())}
          title="Add New Product"
          fullScreen={true}
        >
          {/* <AddProductForm /> */}
          <ProductForm />
        </FormModal>
        <FormModal
          open={sales.showAddSaleModal}
          handleClose={() => dispatch(toggleShowAddSaleModal())}
          title="Add New Sale"
          maxWidth="md"
          fullScreen={true}
        >
          <AddSalesForm />
        </FormModal>

        <SuccessAlert
          message={notification.success}
          close={() => dispatch(setSuccess(""))}
        />
        <ErrorAlert
          error={notification.error}
          close={() => dispatch(setError(""))}
        />
        {/* <ConfirmAlert
          open={showDelete}
          close={() => dispatch(toggleShowDeleteModal())}
          action={() => handleDelete(selectedStaff.id)}
          message={`Do you want to delete this staff?`}
          performing={deleting}
        /> */}
        <LogoutConfirmDialogue />
      </Box>
      {/*<MessageBox />*/}
    </Box>
  );
}

MainLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.object,
};

export default MainLayout;
