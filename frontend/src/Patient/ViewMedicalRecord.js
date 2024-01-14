import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Tab, Typography, Grid, Box, Button, Avatar, TableRow, TableCell, Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import config from '../Config/config';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
}));

function MedicalInfo(props) {
    const [data, setData] = useState('');
    let token = sessionStorage.getItem('token');

    useEffect(() => {
        axios.get(config.baseURL + "/patient/auth/", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            if (response.data.message === "true") {
                if (response.data.message === "true") {
                    axios.get(config.baseURL + "/medicalrecords/" + props.match.params.id + "/", {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }).then(response => {
                        setData(response.data);
                    })
                    .catch(e => {
                        history.replace({ pathname: '/patient' });
                        window.location.reload();
                    })
                }
            }
        })
            .catch(e => {
                history.replace({ pathname: '/patient' });
                window.location.reload();
                console.log(e);
            })
    }, [token]);
    let history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    if (data) {
        return (
            <Box style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(45deg, #EEE 30%, #DDD 90%)' }}>
                <Box display={{ xs: 'none', sm: 'none', md: 'none', lg: 'flex' }} style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Grid container>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ minHeight: '50px', height: '8vh', background: '#ffffff' }}>
                            <Grid item xs={6} sm={4} md={2} lg={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="/telemedicine_logo.png" alt="logo" style={{ height: '50px', minWidth: '130px' }} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ background: '#293447' }}>
                            <Box style={{ maxWidth: '85em', width: '90vw' }}>
                                <Button style={{ color: '#FFFFFF', fontWeight: 'bold' }} onClick={() => history.goBack()}>
                                    <ArrowBackIcon />
                                </Button>
                            </Box>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ color: '#ffffff' }}>
                            <Grid container item xs={6} sm={6} md={6} lg={6}>
                                <Grid container item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                    <Box>
                                        <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em', width: '90%' }}>
                                            Record Details
                                        </Typography>
                                        <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', width: '27vw' }}>
                                            <Table aria-label="simple table">
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell align="left">
                                                            <Avatar style={{ width: '4em', height: '4em' }}>
                                                                <img src={config.baseURL + data.profile_pic} style={{ width: '4em', height: '4em' }} alt="profile" />
                                                            </Avatar>
                                                        </TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="left">Patient Name</TableCell>
                                                        <TableCell align="left">{data.patient_first_name} {data.patient_last_name}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="left">Department</TableCell>
                                                        <TableCell align="left">{data.department}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="left">Doctor Name</TableCell>
                                                        <TableCell align="left">{data.doctor_first_name} {data.doctor_last_name}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="left">Specialization</TableCell>
                                                        <TableCell align="left">{data.specialization}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="left">Nationality</TableCell>
                                                        <TableCell align="left">{data.nationality}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="left">Registration Number</TableCell>
                                                        <TableCell align="left">{data.registration_number}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="left">Contact Number</TableCell>
                                                        <TableCell align="left">{data.contact_number}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6} sm={6} md={6} lg={6} style={{ background: '#17b0ab', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Box style={{ width: '80%' }}>
                                    <Typography style={{ fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                        Recent Vital Signs
                                    </Typography>
                                    <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', width: '100%' }}>
                                        <Table aria-label="simple table">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="left">Height</TableCell>
                                                    <TableCell align="left">{data.height} feet</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Weight</TableCell>
                                                    <TableCell align="left">{data.weight} kg</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Temperature</TableCell>
                                                    <TableCell align="left">{data.temperature} degree celsius</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Pulse Rate</TableCell>
                                                    <TableCell align="left">{data.pulse_rate}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Blood Pressure Systolic</TableCell>
                                                    <TableCell align="left">{data.blood_pressure_systolic}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Blood Pressure Diastolic</TableCell>
                                                    <TableCell align="left">{data.blood_pressure_diastolic}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                                <Box style={{ width: '80%' }}>
                                    <Typography style={{ fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                        Medical Symptoms
                                    </Typography>
                                    <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', width: '100%' }}>
                                        <Table aria-label="simple table">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="left">Symptoms</TableCell>
                                                    <TableCell align="left">{data.symptoms}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Duration</TableCell>
                                                    <TableCell align="left">{data.duration}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                                <Box style={{ width: '80%' }}>
                                    <Typography style={{ fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                        Diagnosis
                                    </Typography>
                                    <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', width: '100%' }}>
                                        <Table aria-label="simple table">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="left">Diagnosis</TableCell>
                                                    <TableCell align="left">{data.diagnosis}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Medication</TableCell>
                                                    <TableCell align="left">{data.medical_treatment}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'none' }} style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Grid container>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ minHeight: '50px', height: '8vh', background: '#ffffff' }}>
                            <Grid item xs={6} sm={4} md={2} lg={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="/telemedicine_logo.png" alt="logo" style={{ height: '50px', minWidth: '130px' }} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ background: '#293447', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Grid container>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <Button style={{ color: '#FFFFFF', fontWeight: 'bold' }} onClick={() => history.goBack()}>
                                        <ArrowBackIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ minHeight: '50px', height: '8vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div className={classes.root} style={{ width: '100%' }}>
                                <AppBar position="static" color="default" style={{ height: '3em' }}>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        variant="fullWidth"
                                        aria-label="full width tabs example"
                                    >
                                        <Tab label="Record Details" {...a11yProps(0)} />
                                        <Tab label="Symptoms" {...a11yProps(1)} />
                                        <Tab label="Diagnosis" {...a11yProps(2)} />
                                    </Tabs>
                                </AppBar>
                                <SwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={value}
                                    onChangeIndex={handleChangeIndex}
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, #EEE 30%, #DDD 90%)' }}
                                >
                                    <TabPanel value={value} index={0} dir={theme.direction}>
                                        <Box>
                                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                                Record Details
                                            </Typography>
                                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', minWidth: '28em', width: '50%' }}>
                                                <Table aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">
                                                                <Avatar style={{ width: '4em', height: '4em' }}>
                                                                    <img src={config.baseURL + data.profile_pic} style={{ width: '4em', height: '4em' }} alt="profile" />
                                                                </Avatar>
                                                            </TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Patient Name</TableCell>
                                                            <TableCell align="left">{data.patient_first_name} {data.patient_last_name}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Department</TableCell>
                                                            <TableCell align="left">{data.department}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Doctor Name</TableCell>
                                                            <TableCell align="left">{data.doctor_first_name} {data.doctor_last_name}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Specialization</TableCell>
                                                            <TableCell align="left">{data.specialization}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Nationality</TableCell>
                                                            <TableCell align="left">{data.nationality}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Registration Number</TableCell>
                                                            <TableCell align="left">{data.registration_number}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Contact Number</TableCell>
                                                            <TableCell align="left">{data.contact_number}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel value={value} index={1} dir={theme.direction}>
                                        <Box>
                                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                                Vital Signs
                                            </Typography>
                                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', minWidth: '28em', width: '50%' }}>
                                                <Table aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">Height</TableCell>
                                                            <TableCell align="left">{data.height} feet</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Weight</TableCell>
                                                            <TableCell align="left">{data.weight} kg</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Temperature</TableCell>
                                                            <TableCell align="left">{data.temperature} degree celsius</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Pulse Rate</TableCell>
                                                            <TableCell align="left">{data.pulse_rate}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Blood Pressure Systolic</TableCell>
                                                            <TableCell align="left">{data.blood_pressure_systolic}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Blood Pressure Diastolic</TableCell>
                                                            <TableCell align="left">{data.blood_pressure_diastolic}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                        <Box>
                                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                                Medical Symptoms
                                            </Typography>
                                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', minWidth: '28em', width: '50%' }}>
                                                <Table aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">Symptoms</TableCell>
                                                            <TableCell align="left">{data.symptoms}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Duration</TableCell>
                                                            <TableCell align="left">{data.duration}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel value={value} index={2} dir={theme.direction}>
                                        <Box>
                                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                                Medical Diagnosis
                                            </Typography>
                                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', minWidth: '28em', width: '50%' }}>
                                                <Table aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">Diagnosis</TableCell>
                                                            <TableCell align="left">{data.diagnosis}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Medication</TableCell>
                                                            <TableCell align="left">{data.medical_treatment}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    </TabPanel>
                                </SwipeableViews>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
                <Box display={{ xs: 'flex', sm: 'flex', md: 'none', lg: 'none' }} style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Grid container>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ minHeight: '50px', height: '8vh', background: '#ffffff' }}>
                            <Grid item xs={6} sm={4} md={2} lg={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="/telemedicine_logo.png" alt="logo" style={{ height: '50px', minWidth: '130px' }} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ background: '#293447', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Grid container>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <Button style={{ color: '#FFFFFF', fontWeight: 'bold' }} onClick={() => history.goBack()}>
                                        <ArrowBackIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ minHeight: '50px', height: '8vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div className={classes.root} style={{ width: '100%' }}>
                                <AppBar position="static" color="default">
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        variant="fullWidth"
                                        aria-label="full width tabs example"
                                    >
                                        <Tab label="Record Details" {...a11yProps(0)} />
                                        <Tab label="Symptoms" {...a11yProps(1)} />
                                        <Tab label="Diagnosis" {...a11yProps(1)} />
                                    </Tabs>
                                </AppBar>
                                <SwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={value}
                                    onChangeIndex={handleChangeIndex}
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, #EEE 30%, #DDD 90%)' }}
                                >
                                    <TabPanel value={value} index={0} dir={theme.direction}>
                                        <Box>
                                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                                Record Details
                                            </Typography>
                                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '27em', width: '90vw' }}>
                                                <Table aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">
                                                                <Avatar style={{ width: '4em', height: '4em' }}>
                                                                    <img src={config.baseURL + data.profile_pic} style={{ width: '4em', height: '4em' }} alt="profile" />
                                                                </Avatar>
                                                            </TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Patient Name</TableCell>
                                                            <TableCell align="left">{data.patient_first_name} {data.patient_last_name}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Department</TableCell>
                                                            <TableCell align="left">{data.department}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Doctor Name</TableCell>
                                                            <TableCell align="left">{data.doctor_first_name} {data.doctor_last_name}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Specialization</TableCell>
                                                            <TableCell align="left">{data.specialization}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Nationality</TableCell>
                                                            <TableCell align="left">{data.nationality}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Registration Number</TableCell>
                                                            <TableCell align="left">{data.registration_number}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Contact Number</TableCell>
                                                            <TableCell align="left">{data.contact_number}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel value={value} index={1} dir={theme.direction}>
                                        <Box>
                                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                                Vital Signs
                                            </Typography>
                                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '27em', width: '90vw' }}>
                                                <Table aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">Height</TableCell>
                                                            <TableCell align="left">{data.height} feet</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Weight</TableCell>
                                                            <TableCell align="left">{data.weight} kg</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Temperature</TableCell>
                                                            <TableCell align="left">{data.temperature} degree celsius</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Pulse Rate</TableCell>
                                                            <TableCell align="left">{data.pulse_rate}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Blood Pressure Systolic</TableCell>
                                                            <TableCell align="left">{data.blood_pressure_systolic}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Blood Pressure Diastolic</TableCell>
                                                            <TableCell align="left">{data.blood_pressure_diastolic}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                        <Box>
                                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                                Medical Symptoms
                                            </Typography>
                                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '27em', width: '90vw' }}>
                                                <Table aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">Symptoms</TableCell>
                                                            <TableCell align="left">{data.symptoms}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Duration</TableCell>
                                                            <TableCell align="left">{data.duration}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel value={value} index={2} dir={theme.direction}>
                                        <Box>
                                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                                Vital Signs
                                            </Typography>
                                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '27em', width: '90vw' }}>
                                                <Table aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">Height</TableCell>
                                                            <TableCell align="left">{data.height} feet</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Weight</TableCell>
                                                            <TableCell align="left">{data.weight} kg</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Temperature</TableCell>
                                                            <TableCell align="left">{data.temperature} degree celsius</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Pulse Rate</TableCell>
                                                            <TableCell align="left">{data.pulse_rate}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Blood Pressure Systolic</TableCell>
                                                            <TableCell align="left">{data.blood_pressure_systolic}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Blood Pressure Diastolic</TableCell>
                                                            <TableCell align="left">{data.blood_pressure_diastolic}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                        <Box>
                                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                                Medical Diagnosis
                                            </Typography>
                                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '27em', width: '90vw' }}>
                                                <Table aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">Diagnosis</TableCell>
                                                            <TableCell align="left">{data.diagnosis}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Medication</TableCell>
                                                            <TableCell align="left">{data.medical_treatment}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    </TabPanel>
                                </SwipeableViews>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        );
    } else {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="loading" />
            </div>
        );
    }
}

export default MedicalInfo;