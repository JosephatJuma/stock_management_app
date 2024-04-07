import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowLogout } from "../redux/slices/auth.slice";
import useLogin from "../api/hooks/useLogin";
import { Logout } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LogoutConfirmDialogue() {
  const dispatch = useDispatch();
  const { showLogout } = useSelector((state) => state.auth);
  const { handleLogout } = useLogin();

  return (
    <Dialog
      open={showLogout}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => dispatch(toggleShowLogout())}
      aria-describedby="alert-dialog-slide-description"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <DialogTitle>{"Confirm Logout"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Logout sx={{ color: "red", marginRight: "5px" }} />
          Are you sure you want to logout?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogout} variant="contained" color="warning">
          Logout
        </Button>
        <Button
          onClick={() => dispatch(toggleShowLogout())}
          variant="outlined"
          color="secondary"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
