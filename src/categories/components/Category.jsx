import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";

import {Folder,  MoreVert} from "@mui/icons-material";

export default function Category({ category }) {
  return (
    <List sx={{ padding: 1 }}>
      <ListItem
        secondaryAction={
          <>
            <IconButton edge="end" aria-label="delete">
              <MoreVert />
            </IconButton>
            {/* <IconButton edge="end" aria-label="edit">
              <Delete />
            </IconButton> */}
          </>
        }
      >
        <ListItemAvatar>
          <Avatar>
            <Folder />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={category?.name}
          secondary={`${category?.products?.length} Products`}
        />
      </ListItem>
      <Divider />
    </List>
  );
}
