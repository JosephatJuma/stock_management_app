import React, { useState } from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  Collapse,
  Divider,
  IconButton,
  Paper,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import { ExpandLess, ExpandMore, MoreHoriz } from "@mui/icons-material";

const MessageBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Lorem, ipsum dolo tis quis error!",
      sender: "John",
    },
    { id: 2, text: "Hi! How are you?", sender: "Jane" },
    { id: 3, text: "Please send me the report", sender: "Jesca Lopex" },
    { id: 4, text: "Hi! How are you?", sender: "Doe" },
    { id: 5, text: "Hi! How are you?", sender: "Doe" },
    { id: 6, text: "Hi! How are you?", sender: "Doe" },
    { id: 7, text: "Hi! How are you?", sender: "Doe" },
    { id: 8, text: "Hi! How are you?", sender: "Doe" },
    { id: 9, text: "Hi! How are you?", sender: "Doe" },
    { id: 10, text: "Hi! How are you?", sender: "Doe" },
  ]);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        right: 20,
        height: isExpanded ? "80%" : "3.5rem",
      }}
      width={"25%"}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: 1,
            }}
          >
            <ListItem
              sx={{ height: 60 }}
              secondaryAction={
                <IconButton onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar></Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Messaging"} secondary={"Your chat"} />
            </ListItem>
          </Box>
          <Divider />
        </Box>
        <Collapse in={isExpanded}>
          <Box sx={{ p: 2, maxHeight: "80vh", overflowY: "auto" }}>
            <List>
              {messages.map((message) => (
                <div key={message.id}>
                  <ListItem
                    sx={{ height: 60 }}
                    secondaryAction={
                      <>
                        <MoreHoriz />
                      </>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={message?.sender}
                      secondary={message?.text}
                      primaryTypographyProps={{}}
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
};

export default MessageBox;
