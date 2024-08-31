import React from 'react';
import {Box, Container, Grid, Typography, Card, CardContent, Button, Avatar, Link, IconButton} from '@mui/material';
import { styled } from '@mui/system';
import {useSelector} from "react-redux";
import {CameraAlt} from "@mui/icons-material"
const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}));

const ProfilePage = () => {

    const {user}=useSelector((state) => state.auth);
    console.log(user)
    return (
        <Box sx={{ minHeight: '80vh',  }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Grid container spacing={4}>
                    {/* Left column */}
                    <Grid item xs={12} md={4}>
                        <Card elevation={3} sx={{ height: '100%' }}>
                            <CardContent>
                                <Avatar
                                    src="https://via.placeholder.com/200x200"
                                    alt="Profile Picture"
                                    sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                                />
                               <IconButton sx={{}}>
                                   <CameraAlt/>
                               </IconButton>
                                <Typography variant="h5" textAlign="center" gutterBottom>
                                    {user?.name}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" textAlign="center">
                                    Full Stack Developer
                                </Typography>
                                <Box mt={2}>
                                    <StyledButton variant="outlined" fullWidth>
                                        Follow
                                    </StyledButton>
                                    <StyledButton variant="contained" fullWidth sx={{ mt: 1 }}>
                                        Message
                                    </StyledButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right column */}
                    <Grid item xs={12} md={8}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    About Me
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {user?.about || "Add about you"}
                                </Typography>
                                <Box mt={3}>
                                    <Link href="#" underline="none" color="inherit">
                                        Email: {user?.email?.emailAddress}
                                    </Link>
                                    <br />
                                    <Link href="#" underline="none" color="inherit">
                                        Username: @{user?.userName}
                                    </Link>
                                </Box>
                            </CardContent>
                        </Card>

                        {/*<Box mt={3}>*/}
                        {/*    <Card elevation={3}>*/}
                        {/*        <CardContent>*/}
                        {/*            <Typography variant="h6" gutterBottom>*/}
                        {/*                Skills*/}
                        {/*            </Typography>*/}
                        {/*            <Box display="flex" flexWrap="wrap" gap={1}>*/}
                        {/*                <Chip label="JavaScript" />*/}
                        {/*                <Chip label="React" />*/}
                        {/*                <Chip label="Node.js" />*/}
                        {/*                <Chip label="MongoDB" />*/}
                        {/*                <Chip label="TypeScript" />*/}
                        {/*            </Box>*/}
                        {/*        </CardContent>*/}
                        {/*    </Card>*/}
                        {/*</Box>*/}

                        <Box mt={3}>
                            <Card elevation={3}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Company
                                    </Typography>
                                    <CompanyCard company={user?.company}/>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

const Chip = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    fontWeight: theme.typography.fontWeightMedium,
    '& + &': {
        marginLeft: theme.spacing(1),
    },
}));

const CompanyCard = ({company}) => (
    <Box mb={2}>
        <Typography variant="subtitle1"> {company?.name}</Typography>
        <Typography variant="body2" color="text.secondary">
            {company?.name}
        </Typography>
        <StyledButton variant="outlined" fullWidth>
            Edit
        </StyledButton>
    </Box>
);

export default ProfilePage;
