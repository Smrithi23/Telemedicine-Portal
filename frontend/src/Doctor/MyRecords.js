import React, {useState, useEffect} from 'react';
import { Grid, Box } from '@material-ui/core';
import AppointmentRecordCard from './AppointmentRecordCard';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import config from '../Config/config';
let history = createBrowserHistory();

function MyRecords() {
    const [data, setData] = useState('');
    let token = sessionStorage.getItem('token');
    useEffect(() => {
        axios.get(config.baseURL + "/doctor/medicalrecords/", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            setData(response.data);
            console.log(response);
        }).catch(e => {
            console.log(e);
            history.replace({ pathname: '/doctor' });
            window.location.reload();
        })
    }, []);
    if(data) {
        return (
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid>
                    {data.length
                    ? data.map(record => <AppointmentRecordCard first_name={record.patient_first_name} last_name={record.patient_last_name} date={record.date} hours={record.hours} minutes={record.minutes} symptoms={record.symptoms} duration={record.duration} diagnosis={record.diagnosis} medical_treatment={record.medical_treatment}/>)
                    : <div>No appointment records</div>
                    }
                </Grid>
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

export default MyRecords;