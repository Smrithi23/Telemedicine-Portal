import React from 'react';
import { Grid, Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import config from '../Config/config';

function BookedAppointmentCard(props) {
    return (
        <Box style={{ background: '#ffffff', borderRadius: '5px', padding: '1em', marginTop: '20px', marginBottom: '20px', fontSize: '0.9em', margin: '10px' }}>
            <Grid container>
                <Grid container item xs={8} sm={8} md={8} lg={8} style={{ paddingLeft: '10px' }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ color: '#555', fontWeight: 'bold', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', marginTop: '0.2em', marginBottom: '0.2em' }}>{props.department}</Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ color: '#555', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', marginTop: '0.2em', marginBottom: '0.2em' }}>{props.doctor_first_name} {props.doctor_last_name}</Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ color: '#555', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', marginTop: '0.2em', marginBottom: '0.2em' }}>{props.date}</Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ color: '#555', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', marginTop: '0.2em', marginBottom: '0.2em' }}>{props.hours}:{props.minutes}</Box>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button style={{ background: '#17b0ab', color: '#FFFFFF', fontWeight: 'bold', marginTop: '0.8em' }}>
                        <Link to={'/patient/call/' + props.appointment_id + '/' + props.doctor_id + '/' + props.patient_id} style={{ color: '#ffffff', textDecoration: 'none' }}>Enter Wating Room</Link>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default BookedAppointmentCard;