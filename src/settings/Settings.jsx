import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, TextField, Button, Switch, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';
import {useSelector, useDispatch} from "react-redux";
import {changeMode} from "../redux/slices/themeSlice";
const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const Settings = () => {
  const dispatch=useDispatch()
  const {user}=useSelector((state) => state.auth);
  const themeMode = useSelector((state) => state.auth.mode);
  const [accountSettings, setAccountSettings] = useState({
    username: user?.userName,
    email: user?.email?.emailAddress,
  });

  const [privacySettings, setPrivacySettings] = useState({
    publicProfile: false,
    allowMessages: true,
  });

  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'username':
      case 'email':
        setAccountSettings(prevState => ({ ...prevState, [name]: value }));
        break;
      case 'publicProfile':
      case 'allowMessages':
        setPrivacySettings(prevState => ({ ...prevState, [name]: !prevState[name] }));
        break;
      case 'emailNotifications':
      case 'pushNotifications':
        setNotificationPreferences(prevState => ({ ...prevState, [name]: !prevState[name] }));
        break;
      default:
        console.log(`Unhandled input change for ${name}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send the settings to a backend API
    console.log('Settings submitted:', accountSettings, privacySettings, notificationPreferences);
  };

  return (
      <Box sx={{ minHeight: '100vh',  }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h6" gutterBottom>Account Settings</Typography>
          <Card elevation={3}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={accountSettings.username}
                        onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={accountSettings.email}
                        onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6" mt={3}>Privacy Settings</Typography>
                <FormControlLabel
                    control={<Switch checked={privacySettings.publicProfile} onChange={handleInputChange} name="publicProfile" />}
                    label="Public Profile"
                />
                <FormControlLabel
                    control={<Switch checked={privacySettings.allowMessages} onChange={handleInputChange} name="allowMessages" />}
                    label="Allow Messages from Anyone"
                />

                <Typography variant="h6" mt={3}>Notification Preferences</Typography>
                <FormControlLabel
                    control={<Switch checked={notificationPreferences.emailNotifications} onChange={handleInputChange} name="emailNotifications" />}
                    label="Email Notifications"
                />
                <FormControlLabel
                    control={<Switch checked={notificationPreferences.pushNotifications} onChange={handleInputChange} name="pushNotifications" />}
                    label="Push Notifications"
                />

                <StyledButton variant="contained" disabled={user?.userName===accountSettings?.username || user?.email?.emailAddress === accountSettings?.email  } type="submit" fullWidth sx={{ mt: 2 }}>
                  Save Changes
                </StyledButton>
              </form>
            </CardContent>
          </Card>
          <Typography variant="h6" mt={4} gutterBottom>Theme Settings</Typography>
          <Card elevation={3}>
            <CardContent>
              <FormControlLabel
                  control={
                    <Switch
                        checked={themeMode !== 'light'}
                        onChange={
                          themeMode === "light"
                              ? () => dispatch(changeMode("dark"))
                              : () => dispatch(changeMode("light"))
                        }
                        name="theme-mode-switch"
                    />
                  }
                  label={ 'Dark Mode'}
              />
            </CardContent>
          </Card>
        </Container>
      </Box>
  );
};

export default Settings;
