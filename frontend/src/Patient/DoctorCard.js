import React from 'react';
import { Grid, Box, Button, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import config from '../Config/config';

function DoctorCard(props) {
    let profile_pic = config.baseURL + props.profile_pic;
    return (
        <Box style={{ background: '#ffffff', borderRadius: '5px', padding: '1em', marginTop: '20px', marginBottom: '20px', fontSize: '0.9em', margin: '10px' }}>
            <Grid container>
                <Grid item xs={2} sm={2} md={2} lg={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar>
                        <img src={profile_pic} style={{ width: '4em', height: '4em' }} alt="profile" />
                    </Avatar>
                </Grid>
                <Grid container item xs={8} sm={8} md={8} lg={8} style={{ paddingLeft: '10px' }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ color: '#555', fontWeight: 'bold', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{props.first_name} {props.last_name}</Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ color: '#555', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{props.specialization}</Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ color: '#555', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{props.nationality}</Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ color: '#555', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>Availability  {props.start_hours}:{props.start_minutes} to {props.end_hours}:{props.end_minutes}</Box>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button style={{ background: '#17b0ab', color: '#FFFFFF', fontWeight: 'bold', marginTop: '0.8em' }}>
                        <Link to={"/patient/bookappointmentform/" + props.id} style={{ color: '#ffffff', textDecoration: 'none' }}>
                            Book appointment
                        </Link>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default DoctorCard;