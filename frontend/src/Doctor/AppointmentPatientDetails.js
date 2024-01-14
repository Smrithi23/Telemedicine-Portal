import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Tab, Typography, Grid, Box, Button, Avatar, TableRow, TableCell, Paper, Table, TableBody, TableContainer, TableHead } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MedicalRecordCard from './MedicalRecordCard';
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

function AttendPatient(props) {
    let history = useHistory();
    let token = sessionStorage.getItem('token');
    const [data, setData] = useState('');
    useEffect(() => {
        axios.get(config.baseURL + "/doctor/patientdetails/" + props.location.state.appointment_id + "/" + props.location.state.patient_id + "/", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            console.log(response);
            setData(response.data);
        }).catch(e => {
            history.replace({ pathname: '/doctor' });
            window.location.reload();
        })
    }, [token]);
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
                            <Grid container item xs={8} sm={8} md={8} lg={8} style={{ width: '67vw' }}>
                                <Grid container item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em', width: '90%' }}>
                                        Patient Details
                                    </Typography>
                                </Grid>
                                <Grid container item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                    <Grid container style={{ width: '90%' }}>
                                        <Grid item xs={6} sm={6} md={6} lg={6}>
                                            <Box>
                                                <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', width: '27vw' }}>
                                                    <Table aria-label="simple table">
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell align="left">
                                                                    <Avatar style={{ width: '4em', height: '4em' }}>
                                                                        <img src={config.baseURL + data.patient_details.profile_pic} style={{ width: '4em', height: '4em' }} alt="profile" />
                                                                    </Avatar>
                                                                </TableCell>
                                                                <TableCell></TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="left">First Name</TableCell>
                                                                <TableCell align="left">{data.patient_details.first_name}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="left">Last Name</TableCell>
                                                                <TableCell align="left">{data.patient_details.last_name}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="left">Gender</TableCell>
                                                                <TableCell align="left">{data.patient_details.gender}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Box>
                                        </Grid>
                                        <Grid container item xs={6} sm={6} md={6} lg={6}>
                                            <Box>
                                                <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', width: '27vw' }}>
                                                    <Table aria-label="simple table">
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell align="left">Date of Birth</TableCell>
                                                                <TableCell align="left">{data.patient_details.dob}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="left">Nationality</TableCell>
                                                                <TableCell align="left">{data.patient_details.nationality}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="left">Blood Group</TableCell>
                                                                <TableCell align="left">{data.patient_details.blood_group}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="left">Occupation</TableCell>
                                                                <TableCell align="left">{data.patient_details.occupation}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="left">Contact Number</TableCell>
                                                                <TableCell align="left">{data.patient_details.contact_number}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Box style={{ width: '90%' }}>
                                        <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                            Medical Records
                                        </Typography>
                                        {data.medical_record
                                            ? <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', width: '57vw' }}>
                                            <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Doctor Name</TableCell>
                                                    <TableCell align="left">Department</TableCell>
                                                    <TableCell align="left">Date</TableCell>
                                                    <TableCell align="left">Time</TableCell>
                                                    <TableCell align="left">Symptoms</TableCell>
                                                    <TableCell align="left">Diagnosis</TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {data.medical_record.map(record => <TableRow>
                                                <TableCell align="left">{record.doctor_first_name} {record.doctor_last_name}</TableCell>
                                                <TableCell align="left">{record.department}</TableCell>
                                                <TableCell align="left">{record.date}</TableCell>
                                                <TableCell align="left">{record.hours}:{record.minutes}</TableCell>
                                                <TableCell align="left" style={{ width: '30%' }}>{record.symptoms}</TableCell>
                                                <TableCell align="left" style={{ width: '30%' }}>{record.diagnosis}</TableCell>
                                                <TableCell>
                                                    <Button style={{ background: '#17b0ab' }}>
                                                        <Link to={"/doctor/viewmedicalrecord/" + record.id} style={{ color: '#ffffff', fontWeight: 'bold', textDecoration: 'none' }}>View</Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>)}
                                            </Table>
                                            </TableContainer>
                                            : <div>No medical records</div>
                                        }
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container item xs={4} sm={4} md={4} lg={4} style={{ width: '33vw', background: '#17b0ab', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Box style={{ width: '80%' }}>
                                    <Typography style={{ fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                        Medical Symptoms
                                    </Typography>
                                    <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', width: '100%' }}>
                                        <Table aria-label="simple table">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="left">Symptoms</TableCell>
                                                    <TableCell align="left">{data.appointment_details.symptoms}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Duration</TableCell>
                                                    <TableCell align="left">{data.appointment_details.duration}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                                <Box style={{ width: '80%' }}>
                                    <Typography style={{ fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                        Vital Signs
                                    </Typography>
                                    <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', width: '100%' }}>
                                        <Table aria-label="simple table">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="left">Height</TableCell>
                                                    <TableCell align="left">{data.appointment_details.height} feet</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Weight</TableCell>
                                                    <TableCell align="left">{data.appointment_details.weight} kg</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Temperature</TableCell>
                                                    <TableCell align="left">{data.appointment_details.temperature} degree celsius</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Pulse Rate</TableCell>
                                                    <TableCell align="left">{data.appointment_details.pulse_rate}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Blood Pressure Systolic</TableCell>
                                                    <TableCell align="left">{data.appointment_details.blood_pressure_systolic}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Blood Pressure Diastolic</TableCell>
                                                    <TableCell align="left">{data.appointment_details.blood_pressure_diastolic}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                                <Box style={{ width: '80%' }}>
                                    <Typography style={{ fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                        Medical History
                                    </Typography>
                                    <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', width: '100%' }}>
                                        <Table aria-label="simple table">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="left">Surgeries in the past</TableCell>
                                                    <TableCell align="left">{data.patient_details.surgeries_in_past}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Pre Medical Conditions</TableCell>
                                                    <TableCell align="left">{data.patient_details.pre_medical_conditions}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Allergies</TableCell>
                                                    <TableCell align="left">{data.patient_details.allergies}</TableCell>
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
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ background: '#293447' }}>
                            <Button style={{ color: '#FFFFFF', fontWeight: 'bold' }} onClick={() => history.goBack()}>
                                <ArrowBackIcon />
                            </Button>
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
                                        <Tab label="Patient Details" {...a11yProps(0)} />
                                        <Tab label="Health Info" {...a11yProps(1)} />
                                        <Tab label="Medical Records" {...a11yProps(2)} />
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
                                                Patient Details
                                            </Typography>
                                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', minWidth: '28em', width: '50%' }}>
                                                <Table aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">
                                                                <Avatar style={{ width: '4em', height: '4em' }}>
                                                                    <img src={config.baseURL + data.patient_details.profile_pic} style={{ width: '4em', height: '4em' }} alt="profile" />
                                                                </Avatar>
                                                            </TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">First Name</TableCell>
                                                            <TableCell align="left">{data.patient_details.first_name}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Last Name</TableCell>
                                                            <TableCell align="left">{data.patient_details.last_name}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Gender</TableCell>
                                                            <TableCell align="left">{data.patient_details.gender}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Date of Birth</TableCell>
                                                            <TableCell align="left">{data.patient_details.dob}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Nationality</TableCell>
                                                            <TableCell align="left">{data.patient_details.nationality}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Blood Group</TableCell>
                                                            <TableCell align="left">{data.patient_details.blood_group}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Occupation</TableCell>
                                                            <TableCell align="left">{data.patient_details.occupation}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Contact Number</TableCell>
                                                            <TableCell align="left">{data.patient_details.contact_number}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel value={value} index={1} dir={theme.direction}>
                                        <Box>
                                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                                Medical Symptoms
                                            </Typography>
                                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', minWidth: '28em', width: '50%' }}>
                                                <Table aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">Symptoms</TableCell>
                                                            <TableCell align="left">{data.appointment_details.symtoms}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Duration</TableCell>
                                                            <TableCell align="left">{data.appointment_details.duration} weeks</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                        <Box>
                                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                                Vital Signs
                                            </Typography>
                                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', minWidth: '28em', width: '50%' }}>
                                                <Table aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">Height</TableCell>
                                                            <TableCell align="left">{data.appointment_details.height} feet</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Weight</TableCell>
                                                            <TableCell align="left">{data.appointment_details.weight} kg</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Temperature</TableCell>
                                                            <TableCell align="left">{data.appointment_details.temperature} degree celsius</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Pulse Rate</TableCell>
                                                            <TableCell align="left">{data.appointment_details.pulse_rate}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Blood Pressure Systolic</TableCell>
                                                            <TableCell align="left">{data.appointment_details.blood_pressure_systolic}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Blood Pressure Diastolic</TableCell>
                                                            <TableCell align="left">{data.appointment_details.blood_pressure_diastolic}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                        <Box>
                                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                                Medical History
                                            </Typography>
                                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', minWidth: '28em', width: '50%' }}>
                                                <Table aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">Surgeries in the past</TableCell>
                                                            <TableCell align="left">{data.patient_details.surgeries_in_past}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Pre Medical Conditions</TableCell>
                                                            <TableCell align="left">{data.appointment_details.pre_medical_conditions}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Allergies</TableCell>
                                                            <TableCell align="left">{data.appointment_details.allergies}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel value={value} index={2} dir={theme.direction}>
                                        <Box>
                                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                                Medical Records
                                            </Typography>
                                            {data.medical_record
                                            ? <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', width: '57vw' }}>
                                            <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Doctor Name</TableCell>
                                                    <TableCell align="left">Department</TableCell>
                                                    <TableCell align="left">Date</TableCell>
                                                    <TableCell align="left">Time</TableCell>
                                                    <TableCell align="left">Symptoms</TableCell>
                                                    <TableCell align="left">Diagnosis</TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {data.medical_record.map(record => 
                                                <TableRow>
                                                    <TableCell align="left">{record.doctor_first_name} {record.doctor_last_name}</TableCell>
                                                    <TableCell align="left">{record.department}</TableCell>
                                                    <TableCell align="left">{record.date}</TableCell>
                                                    <TableCell align="left">{record.hours}:{record.minutes}</TableCell>
                                                    <TableCell align="left">{record.symptoms}</TableCell>
                                                    <TableCell align="left">{record.diagnosis}</TableCell>
                                                    <TableCell>
                                                        <Button style={{ background: '#17b0ab' }}>
                                                            <Link to={"/doctor/viewmedicalrecord/" + record.id} style={{ color: '#ffffff', fontWeight: 'bold', textDecoration: 'none' }}>View</Link>
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                            </Table>
                                            </TableContainer>
                                            : <div>No medical records</div>
                                        }
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
                            <Button style={{ color: '#FFFFFF', fontWeight: 'bold' }} onClick={() => history.goBack()}>
                                <ArrowBackIcon />
                            </Button>
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
                                        <Tab label="Patient Details" {...a11yProps(0)} />
                                        <Tab label="Health Info" {...a11yProps(1)} />
                                        <Tab label="Medical Records" {...a11yProps(2)} />
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
                                                Patient Details
                                            </Typography>
                                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '27em', width: '90vw' }}>
                                                <Table aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">
                                                                <Avatar style={{ width: '4em', height: '4em' }}>
                                                                    <img src={config.baseURL + data.patient_details.profile_pic} style={{ width: '4em', height: '4em' }} alt="profile" />
                                                                </Avatar>
                                                            </TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">First Name</TableCell>
                                                            <TableCell align="left">{data.patient_details.first_name}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Last Name</TableCell>
                                                            <TableCell align="left">{data.patient_details.last_name}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Gender</TableCell>
                                                            <TableCell align="left">{data.patient_details.gender}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Date of Birth</TableCell>
                                                            <TableCell align="left">{data.patient_details.dob}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Nationality</TableCell>
                                                            <TableCell align="left">{data.patient_details.nationality}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Blood Group</TableCell>
                                                            <TableCell align="left">{data.patient_details.blood_group}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Occupation</TableCell>
                                                            <TableCell align="left">{data.patient_details.occupation}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Contact Number</TableCell>
                                                            <TableCell align="left">{data.patient_details.contact_number}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel value={value} index={1} dir={theme.direction}>
                                        <Box>
                                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                                Medical Symptoms
                                            </Typography>
                                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '27em', width: '90vw' }}>
                                                <Table aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">Symptoms</TableCell>
                                                            <TableCell align="left">{data.appointment_details.symptoms}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Duration</TableCell>
                                                            <TableCell align="left">{data.appointment_details.duration}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                        <Box>
                                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                                Vital Signs
                                            </Typography>
                                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '27em', width: '90vw' }}>
                                                <Table aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">Height</TableCell>
                                                            <TableCell align="left">{data.appointment_details.height} feet</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Weight</TableCell>
                                                            <TableCell align="left">{data.appointment_details.weight} kg</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Temperature</TableCell>
                                                            <TableCell align="left">{data.appointment_details.temperature} degree celsius</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Pulse Rate</TableCell>
                                                            <TableCell align="left">{data.appointment_details.pulse_rate}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Blood Pressure Systolic</TableCell>
                                                            <TableCell align="left">{data.appointment_details.blood_pressure_systolic}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Blood Pressure Diastolic</TableCell>
                                                            <TableCell align="left">{data.appointment_details.blood_pressure_diastolic}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                        <Box>
                                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                                Medical History
                                            </Typography>
                                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '27em', width: '90vw' }}>
                                                <Table aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">Surgeries in the past</TableCell>
                                                            <TableCell align="left">{data.patient_details.surgeries_in_past}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Pre Medical Conditions</TableCell>
                                                            <TableCell align="left">{data.patient_details.pre_medical_conditions}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Allergies</TableCell>
                                                            <TableCell align="left">{data.patient_details.allergies}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel value={value} index={2} dir={theme.direction}>
                                        <Box>
                                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                                Medical Records
                                            </Typography>
                                            {data.medical_record
                                            ? data.medical_record.map(record => <MedicalRecordCard id={record.id} first_name={record.doctor_first_name} last_name={record.doctor_last_name} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />)
                                            : <div>No medical records</div>
                                            }
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

export default AttendPatient;