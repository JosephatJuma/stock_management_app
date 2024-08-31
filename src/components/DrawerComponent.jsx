import React, { useEffect } from "react";
import {
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {Store, Dashboard, Percent, Category, AccountBox, Settings, Logout} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {toggleShowLogout} from "../redux/slices/auth.slice";

function DrawerComponent({ drawerWidth, toggleDrawer, theme }) {
  const navigate = useNavigate();
  const [active, setActive] = React.useState("Dashboard");
const dispatch=useDispatch()
  const handleChange = (itemName) => {
    setActive(itemName);
    toggleDrawer();
  };

  const drawerItems = [
    {
      name: "Dashboard",
      icon: <Dashboard />,
      link: "/",
    },

    {
      name: "Categories",
      icon: <Category />,
      link: "/categories",
    },
    {
      name: "Manage Products",
      icon: <Store />,
      link: "/products",
    },
    {
      name: "Manage Sales",
      icon: <Percent />,
      link: "/sales",
    },
    {
      name: "My Profile",
      icon: <AccountBox />,
      link: "/profile",
    },

    {
      name: "Settings",
      icon: <Settings />,
      link: "/settings",
    },
  ];
  return (
    <div>
      {/* This is the container of the Logo on the Drawer/Sidebar */}
      <Toolbar style={{ backgroundColor: "#0F9D58", margin: 0 }}>
        <div className="topbar-logo">
          <Typography fontWeight="bold">Stock Manager</Typography>
        </div>
      </Toolbar>

      <List sx={{ padding: 1 }}>
        {drawerItems.map((item) => {
          return (
            <React.Fragment key={item.name}>
              <Link to={item.link} className="link">
                <ListItem
                  disablePadding
                  onClick={() => handleChange(item.name)}
                  sx={
                    active === item.name && {
                      backgroundColor: "#0F9D58",
                      borderRadius: 1,
                    }
                  }
                >
                  <ListItemButton>
                    <ListItemIcon
                      style={
                        active === item.name
                          ? { color: "#fff" }
                          : theme === "light"
                          ? { color: "#0F9D58" }
                          : { color: "lightgray" }
                      }
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      style={
                        active === item.name
                          ? { color: "#fff" }
                          : theme === "light"
                          ? { color: "#0F9D58" }
                          : { color: "lightgray" }
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </React.Fragment>
          );
        })}
        <ListItem
            disablePadding

            onClick={() => dispatch(toggleShowLogout())}
            sx={
                 {
                   position:"absolute",
                   bottom:-180,
                  backgroundColor: "warning",
                  borderRadius: 1,
                   width:'90%',
                   height:40,

                }
            }
        >
          <ListItemButton>
            <ListItemIcon
            >
              <Logout/>
            </ListItemIcon>
            <ListItemText
                primary={"logout"}
                style={
                  theme==="light"?{color: "#000"}:{ color: "#fff" }
                }
            />
          </ListItemButton>
        </ListItem>
      </List>

    </div>
  );
}

export default DrawerComponent;
