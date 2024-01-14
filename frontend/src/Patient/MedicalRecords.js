import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Grid, Box, MenuItem, TextField } from '@material-ui/core';
import MedicalRecordCard from './MedicalRecordCard';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../Config/config';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

function MedicalRecords() {
    let history = useHistory();
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [medical_records, set_medical_records] = useState('');
    const [data, setData] = useState('');

    function onchange(e) {
        let value = e.target.value;
        if(value === "General Medicine") {
            if(data.gen_med.length) {
                set_medical_records(
                    data.gen_med.map((record) => <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />)
                );
            } else {
                set_medical_records((<div>No medical records</div>));
            }
        } else if(value === "Ear, nose and throat (ENT)") {
            if(data.ent.length) {
                set_medical_records(
                    data.ent.map((record) => <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />)
                );
            } else {
                set_medical_records((<div>No medical records</div>));
            }
        } else if(value === "Dental") {
            if(data.dental.length) {
                set_medical_records(
                    data.dental.map((record) => <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />)
                );
            } else {
                set_medical_records((<div>No medical records</div>));
            }
        } else if(value === "Ophthalmology") {
            if(data.ophthalmology.length) {
                set_medical_records(
                    data.ophthalmology.map((record) => <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />)
                );
            } else {
                set_medical_records((<div>No medical records</div>));
            }
        } else if(value === "Cardiology") {
            if(data.cardiology.length) {
                set_medical_records(
                    data.cardiology.map((record) => <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />)
                );
            } else {
                set_medical_records((<div>No medical records</div>));
            }
        } else if(value === "Orthopedics") {
            if(data.orthopedics.length) {
                set_medical_records(
                    data.orthopedics.map((record) => <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />)
                );
            } else {
                set_medical_records((<div>No medical records</div>));
            }
        } else if(value === "Pediatrics") {
            if(data.pediatrics.length) {
                set_medical_records(
                    data.pediatrics.map((record) => <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />)
                );
            } else {
                set_medical_records((<div>No medical records</div>));
            }
        } else if(value === "Gynecology") {
            if(data.gynecology.length) {
                set_medical_records(
                    data.gynecology.map((record) => <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />)
                );
            } else {
                set_medical_records((<div>No medical records</div>));
            }
        } else if(value === "Dermatology") {
            if(data.dermatology.length) {
                set_medical_records(
                    data.dermatology.map((record) => <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />)
                );
            } else {
                set_medical_records((<div>No medical records</div>));
            }
        } else if(value === "Nutrition and Dietics") {
            if(data.nutri_diet.length) {
                set_medical_records(
                    data.nutri_diet.map((record) => <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />)
                );
            } else {
                set_medical_records((<div>No medical records</div>));
            }
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    let token = sessionStorage.getItem('token');
    useEffect(() => {
        axios.get(config.baseURL + "/patient/medicalrecords/", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            setData(response.data);
        }).catch(e => {
            console.log(e);
            history.replace({ pathname: '/patient' });
            window.location.reload();
        })
    }, []);

    if(data) {
        return (
            <Box style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }} style={{width: '100%'}}>
                    <Grid container>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                            style={{ width: '16em' }}
                        >
                            <Tab label="General Medicine" {...a11yProps(0)} />
                            <Tab label="Ear, nose and throat (ENT)" {...a11yProps(1)} />
                            <Tab label="Dental" {...a11yProps(2)} />
                            <Tab label="Ophthalmology" {...a11yProps(3)} />
                            <Tab label="Cardiology" {...a11yProps(4)} />
                            <Tab label="Orthopedics" {...a11yProps(5)} />
                            <Tab label="Pediatrics" {...a11yProps(6)} />
                            <Tab label="Gynecology" {...a11yProps(7)} />
                            <Tab label="Dermatology" {...a11yProps(8)} />
                            <Tab label="Nutrition and Dietics" {...a11yProps(9)} />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>
                                General Medicine
                            </Typography>
                            {data.gen_med.length
                            ? data.gen_med.map(record => 
                                <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />
                            )
                            : <div>No medical records</div>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>
                                Ear, nose and throat (ENT)
                            </Typography>
                            {data.ent.length
                            ? data.ent.map(record => 
                                <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />
                            )
                            : <div>No medical records</div>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>
                                Dental
                            </Typography>
                            {data.dental.length
                            ? data.dental.map(record => 
                                <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />
                            )
                            : <div>No medical reocrds</div>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>
                                Ophthalmology
                            </Typography>
                            {data.ophthalmology.length
                            ? data.ophthalmology.map(record => 
                                <MedicalRecordCard id={record.id}department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />
                            )
                            : <div>No medical reocrds</div>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>
                                Cardiology
                            </Typography>
                            {data.cardiology.length
                            ? data.cardiology.map(record => 
                                <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />
                            )
                            : <div>No medical reocrds</div>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={5}>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>
                                Orthopedics
                            </Typography>
                            {data.orthopedics.length
                            ? data.orthopedics.map(record => 
                                <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />
                            )
                            : <div>No medical reocrds</div>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={6}>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>
                                Pediatrics
                            </Typography>
                            {data.pediatrics.length
                            ? data.pediatrics.map(record => 
                                <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />
                            )
                            : <div>No medical reocrds</div>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={7}>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>
                                Gynecology
                            </Typography>
                            {data.gynecology.length
                            ? data.gynecology.map(record => 
                                <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />
                            )
                            : <div>No medical reocrds</div>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={8}>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>
                                Dermatology
                            </Typography>
                            {data.dermatology.length
                            ? data.dermatology.map(record => 
                                <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />
                            )
                            : <div>No medical reocrds</div>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={9}>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>
                                Nutrition and Dieteics
                            </Typography>
                            {data.nutri_diet.length
                            ? data.nutri_diet.map(record => 
                                <MedicalRecordCard id={record.id} department={record.department} date={record.date} hours={record.hours} minutes={record.minutes} />
                            )
                            : <div>No medical reocrds</div>
                            }
                        </TabPanel>
                    </Grid>
                </Box>
                <Box display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField defaultValue="General Medicine" variant="outlined" select InputLabelProps={{ shrink: true }} style={{ margin: '10px' }} onChange={(e) => {onchange(e)}}>
                                <MenuItem value="General Medicine">GENERAL MEDICINE</MenuItem>
                                <MenuItem value="Ear, nose and throat (ENT)">EAR, NOSE AND THROAT (ENT)</MenuItem>
                                <MenuItem value="Dental">DENTAL</MenuItem>
                                <MenuItem value="Ophthalmology">OPHTHALMOLOGY</MenuItem>
                                <MenuItem value="Cardiology">CARDIOLOGY</MenuItem>
                                <MenuItem value="Orthopedics">ORTHOPEDICS</MenuItem>
                                <MenuItem value="Pediatrics">PEDIATRICS</MenuItem>
                                <MenuItem value="Gynecology">GYNECOLOGY</MenuItem>
                                <MenuItem value="Dermatology">DERMATOLOGY</MenuItem>
                                <MenuItem value="Nutrition and Dietics">NUTRITION AND DIETICS</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {medical_records}
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

export default MedicalRecords;