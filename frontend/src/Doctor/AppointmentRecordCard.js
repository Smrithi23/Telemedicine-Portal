import React from 'react';
import { Grid, Box, Button, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import config from '../Config/config';

function AppointmentRecordCard(props) {
    return (
        <Box style={{ background: '#ffffff', borderRadius: '5px', padding: '1em', marginTop: '20px', marginBottom: '20px', fontSize: '0.9em', margin: '10px' }}>
            <Grid container>
                <Grid container item xs={8} sm={8} md={8} lg={8} style={{ paddingLeft: '10px' }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ color: '#555', fontWeight: 'bold', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{props.first_name} {props.last_name}</Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Box style={{ color: '#555', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}><strong>Date : </strong>{props.date}</Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Box style={{ color: '#555', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}><strong>Time : </strong>{props.hours}:{props.minutes}</Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Box style={{ color: '#555' }}><strong>Symptoms : </strong>{props.symptoms}</Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Box style={{ color: '#555' }}><strong>Duration : </strong>{props.duration}</Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Box style={{ color: '#555' }}><strong>Diagnosis : </strong>{props.diagnosis}</Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Box style={{ color: '#555' }}><strong>Medical Treatment : </strong>{props.medical_treatment}</Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AppointmentRecordCard;