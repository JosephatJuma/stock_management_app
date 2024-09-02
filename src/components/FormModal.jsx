import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
  Typography,
  AppBar,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

function FormModal(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullScreen={false}
      maxWidth={"lg"}
    >
      <AppBar sx={{ position: "relative", backgroundColor: "#0F9D58" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <DialogTitle id="scroll-dialog-title">{props.title}</DialogTitle>

          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <CloseRounded />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
}

export default FormModal;
