import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box, Button, TableRow, TableCell, Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import CallIcon from '@material-ui/icons/Call';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import config from '../Config/config';

function AttendPatient(props) {
    let history = useHistory();
    let token = sessionStorage.getItem('token');
    let doctor_id = props.location.state.doctor_id;
    let patient_id = props.location.state.patient_id;
    const [data, setData] = useState('');
    useEffect(() => {
        axios.get(config.baseURL + "/doctor/attendpatient/" + props.location.state.appointment_id +"/", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            setData(response.data);
        }).catch(e => {
            history.replace({ pathname: '/doctor' });
            window.location.reload();
        })
    }, [token]);
    if (data) {
        return (
            <Box style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(45deg, #EEE 30%, #DDD 90%)' }}>
                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex' }} style={{ width: '100%' }}>
                    <Grid container>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ minHeight: '50px', height: '8vh', background: '#ffffff' }}>
                            <Grid item xs={6} sm={4} md={2} lg={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="/telemedicine_logo.png" alt="logo" style={{ height: '50px', minWidth: '130px' }} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ background: '#293447', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <Button style={{ color: '#FFFFFF', fontWeight: 'bold' }} onClick={() => history.goBack()}>
                                    <ArrowBackIcon />
                                </Button>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Button style={{ color: '#FFFFFF', fontWeight: 'bold', marginRight: '0.5em' }}>
                                    <Link to={{ pathname: "/doctor/patientdetails",  state: {appointment_id: props.location.state.appointment_id, patient_id: props.location.state.patient_id} }} style={{ textDecoration: 'none', color: '#ffffff' }}>
                                        View Patient Details
                                    </Link>
                                </Button>
                                <Button style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                                    <Link to={"/doctor/call/" + props.location.state.appointment_id + "/" + doctor_id + "/" + patient_id} style={{ textDecoration: 'none', color: '#ffffff' }}>
                                        Call Patient
                                    </Link>
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box>
                                <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                    Appointment Details
                                </Typography>
                                <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '85em', width: '90vw' }}>
                                    <Table aria-label="simple table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="left" style={{ width: '50%' }}>Date</TableCell>
                                                <TableCell align="left">{data.date}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="left" style={{ width: '50%' }}>Time</TableCell>
                                                <TableCell align="left">{data.hours}:{data.minutes}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box>
                                <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                    Medical Symptoms
                                </Typography>
                                <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '85em', width: '90vw' }}>
                                    <Table aria-label="simple table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="left" style={{ width: '50%' }}>Symptoms</TableCell>
                                                <TableCell align="left">{data.symptoms}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="left" style={{ width: '50%' }}>Duration</TableCell>
                                                <TableCell align="left">{data.duration}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box display={{ xs: 'flex', sm: 'flex', md: 'none', lg: 'none' }} style={{ width: '100%' }}>
                    <Grid container>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ minHeight: '50px', height: '8vh', background: '#ffffff' }}>
                            <Grid item xs={6} sm={4} md={2} lg={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="/telemedicine_logo.png" alt="logo" style={{ height: '50px', minWidth: '130px' }} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ background: '#293447', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                <Button style={{ color: '#FFFFFF', fontWeight: 'bold', height: '2.5em' }}>
                                    <Link to="/doctor/dashboard" style={{ color: '#ffffff', textDecoration: 'none' }}>
                                        <ArrowBackIcon />
                                    </Link>
                                </Button>
                            </Grid>
                            <Grid item xs={9} sm={9} md={9} lg={9} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Button style={{ color: '#FFFFFF', fontWeight: 'bold', marginRight: '0.5em' }}>
                                    <Link to="/doctor/patientdetails" style={{ textDecoration: 'none', color: '#ffffff' }}>
                                        View Details
                                    </Link>
                                </Button>
                                <Button style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                                    <Link to={"/doctor/call/" + props.location.state.appointment_id + "/" + doctor_id + "/" + patient_id} style={{ textDecoration: 'none', color: '#ffffff' }}>
                                        <CallIcon />
                                    </Link>
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box>
                                <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                    Appointment Details
                                </Typography>
                                <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '85em', width: '90vw' }}>
                                    <Table aria-label="simple table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="left" style={{ width: '50%' }}>Date</TableCell>
                                                <TableCell align="left">{data.date}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="left" style={{ width: '50%' }}>Time</TableCell>
                                                <TableCell align="left">{data.hours}:{data.minutes}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box>
                                <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                    Medical Symptoms
                                </Typography>
                                <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '85em', width: '90vw' }}>
                                    <Table aria-label="simple table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="left" style={{ width: '50%' }}>Symptoms</TableCell>
                                                <TableCell align="left">{data.symptoms}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="left" style={{ width: '50%' }}>Duration</TableCell>
                                                <TableCell align="left">{data.duration}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
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