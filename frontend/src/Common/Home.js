import React from 'react';
import { Typography, Grid, Box, Button, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import config from '../Config/config';

function Home() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box style={{ minHeight: '100%', width: '100%' }}>
            <Box display={{ xs: 'none', sm: 'block' }} style={{ minHeight: '100%', width: '100%' }}>
                <Grid container style={{ height: '100vh' }}>
                    <Grid container item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', minHeight: '50px', height: '8vh' }}>
                        <Grid item xs={6} sm={4} md={2} lg={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src="/telemedicine_logo.png" alt="logo" style={{ height: '50px', minWidth: '130px' }} />
                        </Grid>
                        <Grid item xs={3} sm={5} md={7} lg={7}></Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                            <Button color="primary" variant="contained" component="span" style={{ background: '#3b5482', fontWeight: 'bold' }}>
                                <Link to="/doctor" style={{ textDecoration: 'none', color: '#ffffff' }}>For Doctors</Link>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={12} md={12} lg={12} style={{ minHeight: '200px', height: '40vh', background: 'linear-gradient(45deg, #1CD8D2 30%, #93EDC7 90%)' }}>
                        <Grid item xs={9} sm={8} md={8} lg={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box style={{ textAlign: 'center' }}>
                                <Typography style={{ color: '#3b5482', fontSize: '3.75em', fontWeight: 'bold' }}>Digital Health</Typography>
                                <Typography style={{ color: '#ffffff', fontSize: '1.70em', fontWeight: 'bold' }}>Smart way to health</Typography>
                                <Button variant='contained' style={{ marginBottom: '10px', marginTop: '20px', background: '#3b5482', fontWeight: 'bold' }}>
                                    <Link to="/patient" style={{ textDecoration: 'none', color: '#ffffff' }}>Consult Now</Link>
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={3} sm={4} md={4} lg={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src="/clipart1.png" alt="clipart 1" style={{ height: '40vh', width: '40vh', minHeight: '200px', minWidth: '200px' }} />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={12} md={12} lg={12} style={{ minHeight: '150px', width: '100vw', height: '25vh' }}>
                        <Grid item xs={5} sm={5} md={3} lg={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '150px', height: '25vh' }}>
                            <img src="/clipart2.png" alt="clipart 2" style={{ height: '25vh', width: '30vh', minHeight: '150px', minWidth: '180px' }} />
                        </Grid>
                        <Grid item xs={7} sm={7} md={9} lg={9} style={{ paddingLeft: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25em', color: '#888', minHeight: '150px', height: '25vh' }}>
                            Healthcare at your fingertips. Get the best medical care from your homes.
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={12} md={12} lg={12} style={{ minHeight: '150px', height: '25vh' }}>
                        <Grid item xs={7} sm={7} md={9} lg={9} style={{ paddingLeft: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25em', color: '#888', minHeight: '150px', height: '25vh' }}>
                            Trustworthy health tips and medical advice from our expert doctors to guide you better every day
                        </Grid>
                        <Grid item xs={5} sm={5} md={3} lg={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '150px', height: '25vh' }}>
                            <img src="/clipart3.png" alt="clipart 3" style={{ height: '25vh', width: '30vh', minHeight: '150px', minWidth: '180px' }} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b5482', fontSize: '1em', fontWeight: 'bold', background: '#eee', minHeight: '50px', height: '5vh' }}>
                        Stay Healthy | Stay Safe
                    </Grid>
                </Grid>
            </Box>
            <Box display={{ xs: 'block', sm: 'none' }} style={{ minHeight: '100%', width: '100%' }}>
                <Grid container style={{ height: '100vh' }}>
                    <Grid container item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', minHeight: '50px', height: '8vh' }}>
                        <Grid item xs={6} sm={4} md={2} lg={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src="/telemedicine_logo.png" alt="telemedicine-logo" style={{ height: '50px', minWidth: '130px' }} />
                        </Grid>
                        <Grid item xs={3} sm={5} md={7} lg={7}></Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                            <label htmlFor="forDoctorsButton">
                                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="primary" component="span" style={{ height: '35px', width: '20%', color: '#3b5482', fontWeight: 'bold' }}><MenuIcon /></Button>
                                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                                    <MenuItem>
                                        <Link to="/doctor" style={{ textDecoration: 'none', color: '#3b5482' }}>
                                            For Doctors
                                        </Link>
                                    </MenuItem>
                                </Menu>
                            </label>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={12} md={12} lg={12} style={{ minHeight: '200px', height: '40vh', background: 'linear-gradient(45deg, #1CD8D2 30%, #93EDC7 90%)', }}>
                        <Grid item xs={7} sm={7} md={7} lg={7} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box style={{ textAlign: 'center' }}>
                                <Typography style={{ color: '#3b5482', fontSize: '2em', fontWeight: 'bold' }}>Digital Health</Typography>
                                <Typography style={{ color: '#ffffff', fontSize: '1em', fontWeight: 'bold' }}>Smart way to health</Typography>
                                <Button variant='contained' style={{ marginBottom: '10px', marginTop: '20px', background: '#3b5482', fontWeight: 'bold' }}>
                                    <Link to="/patient" style={{ textDecoration: 'none', color: 'white' }}>Consult Now</Link>
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={5} sm={5} md={5} lg={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src="/clipart1.png" alt="clipart 1" style={{ height: '40vw', width: '40vw' }} />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={12} md={12} lg={12} style={{ minHeight: '150px', width: '100vw', height: '25vh' }}>
                        <Grid item xs={5} sm={5} md={5} lg={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '150px', height: '25vh' }}>
                            <img src="/clipart2.png" alt="clipart 2" style={{ height: '40vw', width: '40vw' }} />
                        </Grid>
                        <Grid item xs={7} sm={7} md={7} lg={7} style={{ paddingLeft: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1em', color: '#888', minHeight: '150px', height: '25vh' }}>
                            Healthcare at your fingertips. Get the best medical care from your homes.
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={12} md={12} lg={12} style={{ minHeight: '150px', height: '25vh' }}>
                        <Grid item xs={7} sm={7} md={7} lg={7} style={{ paddingLeft: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1em', color: '#888', minHeight: '150px', height: '25vh' }}>
                            Trustworthy health tips and medical advice from our expert doctors to guide you better every day
                        </Grid>
                        <Grid item xs={5} sm={5} md={5} lg={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '150px', height: '25vh' }}>
                            <img src="/clipart3.png" alt="clipart 3" style={{ height: '40vw', width: '40vw' }} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b5482', fontSize: '0.85em', fontWeight: 'bold', background: '#eee', minHeight: '50px', height: '5vh' }}>
                        Stay Healthy | Stay Safe
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Home;