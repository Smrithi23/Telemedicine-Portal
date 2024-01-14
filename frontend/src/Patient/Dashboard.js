import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box, Avatar, TableRow, TableCell, TableContainer, Paper, Table, TableBody } from '@material-ui/core';
import MedicalRecordCard from './MedicalRecordCard';
import BookedAppointmentCard from './BookedAppointmentCard';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import config from '../Config/config';
let history = createBrowserHistory();

function Dashboard() {
    const [data, setData] = useState('');
    let token = sessionStorage.getItem('token');
    useEffect(() => {
        axios.get(config.baseURL + "/patient/dashboard/", {
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
    }, [token])
    let profile_pic = "http://localhost:8000" + data.profile_pic
    if (token) {
        return (
            <Box style={{ width: '100%' }}>
                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex' }} style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Grid container>
                        <Grid container item xs={6} sm={6} md={6} lg={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '0.1em solid #ccc' }}>
                            <Box>
                                <Avatar style={{ height: '4em', width: '4em', marginTop: '1.5em' }}>
                                    <img src={profile_pic} style={{ height: '4em', width: '4em' }} alt="profile" />
                                </Avatar>
                                <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                    Welcome {data.first_name}!
                                </Typography>

                                <Typography style={{ color: '#293447', fontSize: '1.10em', marginTop: '1em' }}>
                                    Basic Health Info
                                </Typography>

                                <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '25em', width: '90vw' }}>
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
                                                <TableCell align="left">Blood Group</TableCell>
                                                <TableCell align="left">{data.blood_group}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid>
                        <Grid container item xs={6} sm={6} md={6} lg={6} style={{ borderLeft: '0.1em solid #ccc', display: 'flex', justifyContent: 'center', borderBottom: '0.1em solid #ccc' }}>
                            <Box style={{ padding: '2em' }}>
                                <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                    Recent Medical Records
                                </Typography>
                                {data.medical_records
                                    ? data.medical_records.map(record => (
                                        <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />
                                    ))
                                    : <div style={{ height: '100%', color: '#293447', fontSize: '1.25em', marginTop: '1em' }}>No Medical Records</div>
                                }
                            </Box>
                        </Grid>
                        <Grid container xs={12} sm={12} md={12} lg={12} style={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Box style={{ width: '80%' }}>
                                <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em', display: 'flex', justifyContent: 'center' }}>
                                    Upcoming Appointments
                                </Typography>
                                {data.appointments
                                    ? data.appointments.map(appointment => (
                                        <BookedAppointmentCard appointment_id={appointment.id} doctor_id={appointment.doctor} patient_id={appointment.patient} department={appointment.department} doctor_first_name={appointment.doctor_first_name} doctor_last_name={appointment.doctor_last_name} date={appointment.date} hours={appointment.hours} minutes={appointment.minutes} />
                                    ))
                                    : <div style={{ color: '#293447', fontSize: '1.25em', marginTop: '1em', display: 'flex', justifyContent: 'center' }}>No booked appointments</div>
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box display={{ xs: 'flex', sm: 'flex', md: 'none', lg: 'none' }} style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Grid container>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '0.1em solid #ccc' }}>
                            <Box>
                                <Avatar style={{ height: '4em', width: '4em', marginTop: '1.5em' }}>
                                    <img src={profile_pic} style={{ height: '4em', width: '4em' }} alt="profile" />
                                </Avatar>
                                <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                    Welcome {data.first_name}!
                                </Typography>

                                <Typography style={{ color: '#293447', fontSize: '1.10em', marginTop: '1em' }}>
                                    Basic Health Info
                                </Typography>

                                <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '28em', width: '90vw' }}>
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
                                                <TableCell align="left">Blood Group</TableCell>
                                                <TableCell align="left">{data.blood_group}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center', borderBottom: '0.1em solid #ccc' }}>
                            <Box style={{ padding: '2em' }}>
                                <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                                    Recent Medical Records
                                </Typography>
                                {data.medical_records
                                    ? data.medical_records.map(record => (
                                        <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />
                                    ))
                                    : <div style={{ marginTop: '1em' }}>No Medical Records</div>
                                }
                            </Box>
                        </Grid>
                        <Grid container xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Box style={{ width: '80%' }}>
                                <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    Upcoming Appointments
                                </Typography>
                                {data.appointments
                                    ? data.appointments.map(appointment => (
                                        <BookedAppointmentCard  appointment_id={appointment.id} doctor_id={appointment.doctor} patient_id={appointment.patient} department={appointment.department} doctor_first_name={appointment.doctor_first_name} doctor_last_name={appointment.doctor_last_name} date={appointment.date} hours={appointment.hours} minutes={appointment.minutes} />
                                    ))
                                    : <div style={{ color: '#293447', fontSize: '1.25em', marginTop: '1em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No booked appointments</div>
                                }
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

export default Dashboard;