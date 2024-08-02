import * as React from "react";
import { MenuItem, Divider } from "@mui/material";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { ListItemIcon, Menu, Button, Box, Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowAddSaleModal } from "../redux/slices/sales.slice";
import { toggleShowAddProductModal } from "../redux/slices/products.slice";
import { KeyboardArrowDown, AddBox, PercentRounded } from "@mui/icons-material";

export default function AddMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          alignItems: "center",
          textAlign: "center",
          mr: 2,
          display: { sm: "block", xs: "block", md: "none" },
        }}
      >
        <Tooltip title="Add Sale/Stock">
          <IconButton
            //className="rotate-icon"
            onClick={handleClick}
            size="small"
            sx={{ mr: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar backgroundColor="#0F9D58">
              <KeyboardArrowDown />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={anchorEl ? true : false}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Typography sx={{ padding: "16px" }}>What to do</Typography>
        <Divider />

        <MenuItem onClick={() => dispatch(toggleShowAddProductModal())}>
          <ListItemIcon>
            <AddBox fontSize="small" />
          </ListItemIcon>
          New Stock
        </MenuItem>
        <MenuItem onClick={() => dispatch(toggleShowAddSaleModal())}>
          <ListItemIcon>
            <PercentRounded fontSize="small" />
          </ListItemIcon>
          New Sale
        </MenuItem>
        <Divider />
      </Menu>
    </React.Fragment>
  );
}
