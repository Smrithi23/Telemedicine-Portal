import React from 'react';
import { Grid, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import config from '../Config/config';

function FeedbackCard(props) {
    return (
        <Box style={{ background: '#ffffff', borderRadius: '5px', padding: '1em', marginTop: '20px', marginBottom: '20px', fontSize: '0.9em', margin: '10px' }}>
            <Grid container>
                <Grid container item xs={8} sm={8} md={8} lg={8} style={{ paddingLeft: '10px' }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ color: '#555', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', marginTop: '0.2em', marginBottom: '0.2em' }}>{props.first_name} {props.last_name}</Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ color: '#555', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', marginTop: '0.2em', marginBottom: '0.2em' }}>{props.date}</Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box style={{ color: '#555', marginTop: '0.2em', marginBottom: '0.2em' }}>{props.feedback}</Box>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Rating name="read-only" value={props.rating} readOnly />
                </Grid>
            </Grid>
        </Box>
    );
}

export default FeedbackCard;