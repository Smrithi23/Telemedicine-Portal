import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box, Avatar } from '@material-ui/core';
import AppointmentCard from './AppointmentCard';
import FeedbackCard from './FeedbackCard';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import config from '../Config/config';
let history = createBrowserHistory();

function Dashboard() {
    const [data, setData] = useState('');
    let token = sessionStorage.getItem('token');
    useEffect(() => {
        axios.get(config.baseURL + "/doctor/dashboard/", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            setData(response.data);
            console.log(response.data);
        })
            .catch(e => {
                history.replace({ pathname: '/doctor' });
                window.location.reload();
            })
    }, [token]);
    if(data) {
        return (
            <Box style={{ width: '100%' }}>
                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex' }} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Grid container>
                        <Grid container item xs={12} sm={12} md={6} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Box style={{ width: '80%' }}>
                                <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em', display: 'flex', justifyContent: 'center' }}>
                                    Upcoming Appointments
                                </Typography>
                                {data.appointment.length
                                    ? data.appointment.map(appointment => (
                                        <AppointmentCard id={appointment.id} doctor_id={appointment.doctor} patient_id={appointment.patient} first_name={appointment.patient_first_name} last_name={appointment.patient_last_name} date={appointment.date} hours={appointment.hours} minutes={appointment.minutes} symptoms={appointment.symptoms} />
                                    ))
                                    : <div style={{ color: '#293447', fontSize: '1.25em', marginTop: '1em', display: 'flex', justifyContent: 'center' }}>No booked appointments</div>
                                }
                            </Box>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={6} lg={6} style={{ borderLeft: '0.1em solid #ccc', display: 'flex', justifyContent: 'center' }}>
                            <Box style={{ width: '80%' }}>
                                <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em', display: 'flex', justifyContent: 'center' }}>
                                    Recent Feedbacks
                                </Typography>
                                {data.feedback.length
                                    ? data.feedback.map(feedback => (
                                        <FeedbackCard first_name={feedback.patient_first_name} last_name={feedback.patient_last_name} date={feedback.date} feedback={feedback.feedback} rating={feedback.rating} />
                                    ))
                                    : <div style={{ color: '#293447', fontSize: '1.25em', marginTop: '1em', display: 'flex', justifyContent: 'center' }}>No Feedbacks</div>
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box display={{ xs: 'flex', sm: 'flex', md: 'none', lg: 'none' }} style={{ width: '100%', justifyContent: 'center' }}>
                    <Grid container>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Box style={{ width: '80%' }}>
                                <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em', display: 'flex', justifyContent: 'center' }}>
                                    Upcoming Appointments
                                </Typography>
                                {data.appointment.length
                                    ? data.appointment.map(appointment => (
                                        <AppointmentCard id={appointment.id} doctor_id={appointment.doctor} patient_id={appointment.patient} first_name={appointment.patient_first_name} last_name={appointment.patient_last_name} date={appointment.date} hours={appointment.hours} minutes={appointment.minutes} symptoms={appointment.symptoms} />
                                    ))
                                    : <div style={{ color: '#293447', fontSize: '1.25em', marginTop: '1em', display: 'flex', justifyContent: 'center' }}>No booked appointments</div>
                                }
                            </Box>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Box style={{ width: '80%' }}>
                                <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em', display: 'flex', justifyContent: 'center' }}>
                                    Recent Feedbacks
                                </Typography>
                                {data.feedback.length
                                    ? data.feedback.map(feedback => (
                                        <FeedbackCard first_name={feedback.patient_first_name} last_name={feedback.patient_last_name} date={feedback.date} feedback={feedback.feedback} rating={feedback.rating} />
                                    ))
                                    : <div style={{ color: '#293447', fontSize: '1.25em', marginTop: '1em', display: 'flex', justifyContent: 'center' }}>No Feedbacks</div>
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