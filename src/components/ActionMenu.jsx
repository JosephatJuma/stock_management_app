import * as React from "react";
import { MenuItem, Divider } from "@mui/material";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { ListItemIcon, Menu, Button, Box, Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { changeMode } from "../redux/slices/themeSlice";

import { toggleShowLogout } from "../redux/slices/auth.slice";
import {
  Settings,
  Person,
  Brightness4,
  Logout,
  Person2,
} from "@mui/icons-material";

export default function AccountMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Settings">
          <IconButton
            //className="rotate-icon"
            onClick={handleClick}
            size="small"
            sx={{ mr: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar>
              <Person />
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
        <Typography sx={{ padding: "16px" }}>Configerations</Typography>
        <Divider />
        <MenuItem
          onClick={
            themeMode === "light"
              ? () => dispatch(changeMode("dark"))
              : () => dispatch(changeMode("light"))
          }
        >
          <ListItemIcon>
            <Brightness4 fontSize="small" />
          </ListItemIcon>
          {themeMode === "light" ? " Dark Theme" : "Light Theme"}
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Person2 fontSize="small" />
          </ListItemIcon>
          Manage Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => dispatch(toggleShowLogout())}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
