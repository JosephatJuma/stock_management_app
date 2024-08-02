import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Menu, AddBox, PercentRounded } from "@mui/icons-material";
import AccountMenu from "./ActionMenu";
import { useDispatch, useSelector } from "react-redux";
import AddMenu from "./AddMenu";

import { toggleShowAddProductModal } from "../redux/slices/products.slice";
import { toggleShowAddSaleModal } from "../redux/slices/sales.slice";
function Header(props) {
  const dispatch = useDispatch();
  const [greeting, setGreeting] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 0 && currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${props.drawerWidth}px)` },
        ml: { sm: `${props.drawerWidth}px` },
        backgroundColor: props.themeMode === "light" && "white",
        color: "black",
        height: "70px",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.toggleDrawer}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <Menu sx={{ color: "#0F9D58" }} />
        </IconButton>
        <Typography variant="h6" fontWeight="bold" color="#0F9D58">
          {greeting}
          {/* {user?.name.split(' ')[1]} */}
        </Typography>
        <div style={{ display: "flex" }}>
          <AddMenu />
          <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
            <Button
              sx={{
                backgroundColor: "#0F9D58",
                margin: 1,
                ":hover": { backgroundColor: "#0F9D58c0" },
              }}
              endIcon={<AddBox />}
              variant="contained"
              onClick={() => dispatch(toggleShowAddProductModal())}
            >
              New Stock
            </Button>
            <Button
              sx={{
                backgroundColor: "#0F9D58",
                margin: 1,
                ":hover": { backgroundColor: "#0F9D58c0" },
              }}
              endIcon={<PercentRounded />}
              variant="contained"
              onClick={() => dispatch(toggleShowAddSaleModal())}
            >
              New Sale
            </Button>
          </Box>
          <AccountMenu />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
