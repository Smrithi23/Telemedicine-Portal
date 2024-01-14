import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Grid, Box, MenuItem, TextField } from '@material-ui/core';
import DoctorCard from './DoctorCard';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import config from '../Config/config';
let history = createBrowserHistory();

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

function BookAppointment() {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [gen_med, set_gen_med] = useState('');
    const [ent, set_ent] = useState('');
    const [dental, set_dental] = useState('');
    const [ophthalmology, set_ophthalmology] = useState('');
    const [cardiology, set_cardiology] = useState('');
    const [orthopedics, set_orthopedics] = useState('');
    const [pediatrics, set_pediatrics] = useState('');
    const [gynecology, set_gynecology] = useState('');
    const [dermatology, set_dermatology] = useState('');
    const [nutri_diet, set_nutri_diet] = useState('');
    const [selectedDept, setSelectedDept] = useState('General Medicine');
    let token = sessionStorage.getItem('token');
    useEffect(() => {
        axios.get(config.baseURL + "/patient/doctors/", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            set_gen_med(response.data.gen_med);
            set_ent(response.data.ent);
            set_dental(response.data.dental);
            set_ophthalmology(response.data.ophthalmology);
            set_cardiology(response.data.cardiology);
            set_orthopedics(response.data.orthopedics);
            set_pediatrics(response.data.pediatrics);
            set_gynecology(response.data.gynecology);
            set_dermatology(response.data.dermatology);
            set_nutri_diet(response.data.nutri_diet);
            console.log(gen_med, ent, dental, ophthalmology, cardiology, orthopedics, pediatrics, gynecology, dermatology, nutri_diet);
            console.log(response);
        }).catch(e => {
            console.log(e);
            history.replace({ pathname: '/patient' });
            window.location.reload();
        })
    }, []);
    if(gen_med) {
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
                            {gen_med.length
                            ? gen_med.map(doctor => (
                                <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                            ))
                            : <div>No doctors in this department currently</div>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>
                                Ear, nose and throat (ENT)
                            </Typography>
                            {ent.length
                            ? ent.map(doctor => (
                                <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                            ))
                            : <div>No doctors in this department currently</div>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>
                                Dental
                            </Typography>
                            {dental.length
                            ? dental.map(doctor => (
                                <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                            ))
                            : <div>No doctors in this department currently</div>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>
                                Ophthalmology
                            </Typography>
                            {ophthalmology.length
                            ? ophthalmology.map(doctor => (
                                <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                            ))
                            : <div>No doctors in this department currently</div>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>
                                Cardiology
                            </Typography>
                            {cardiology.length
                            ? cardiology.map(doctor => (
                                <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                            ))
                            : <div>No doctors in this department currently</div>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={5}>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>
                                Orthopedics
                            </Typography>
                            {orthopedics.length
                            ? orthopedics.map(doctor => (
                                <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                            ))
                            : <div>No doctors in this department currently</div>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={6}>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>
                                Pediatrics
                            </Typography>
                            {pediatrics.length
                            ? pediatrics.map(doctor => (
                                <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                            ))
                            : <div>No doctors in this department currently</div>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={7}>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>
                                Gynecology
                            </Typography>
                            {gynecology.length
                            ? gynecology.map(doctor => (
                                <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                            ))
                            : <div>No doctors in this department currently</div>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={8}>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>
                                Dermatology
                            </Typography>
                            {dermatology.length
                            ? dermatology.map(doctor => (
                                <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                            ))
                            : <div>No doctors in this department currently</div>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={9}>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>
                                Nutrition and Dieteics
                            </Typography>
                            {nutri_diet.length
                            ? nutri_diet.map(doctor => (
                                <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                            ))
                            : <div>No doctors in this department currently</div>
                            }
                        </TabPanel>
                    </Grid>
                </Box>
                <Box display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField defaultValue="General Medicine" variant="outlined" select InputLabelProps={{ shrink: true }} style={{ margin: '10px' }} onChange={(e) => setSelectedDept(e.target.value)}>
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
                        {
                            {
                                "General Medicine": gen_med.length
                                    ? gen_med.map(doctor => (
                                        <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                                    ))
                                    : <div>No doctors in this department currently</div>,
                                "Ear, nose and throat (ENT)": ent.length
                                ? ent.map(doctor => (
                                    <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                                ))
                                : <div>No doctors in this department currently</div>,
                                "Dental": dental.length
                                ? dental.map(doctor => (
                                    <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                                ))
                                : <div>No doctors in this department currently</div>,
                                "Ophthalmology": ophthalmology.length
                                ? ophthalmology.map(doctor => (
                                    <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                                ))
                                : <div>No doctors in this department currently</div>,
                                "Cardiology": cardiology.length
                                ? cardiology.map(doctor => (
                                    <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                                ))
                                : <div>No doctors in this department currently</div>,
                                "Orthopedics": orthopedics.length
                                ? orthopedics.map(doctor => (
                                    <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                                ))
                                : <div>No doctors in this department currently</div>,
                                "Pediatrics": pediatrics.length
                                ? pediatrics.map(doctor => (
                                    <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                                ))
                                : <div>No doctors in this department currently</div>,
                                "Gynecology": gynecology.length
                                ? gynecology.map(doctor => (
                                    <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                                ))
                                : <div>No doctors in this department currently</div>,
                                "Dermatology": dermatology.length
                                ? dermatology.map(doctor => (
                                    <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                                ))
                                : <div>No doctors in this department currently</div>,
                                "Nutrition and Dietics": nutri_diet.length
                                ? nutri_diet.map(doctor => (
                                    <DoctorCard id={doctor.id} profile_pic={doctor.profile_pic} first_name={doctor.first_name} last_name={doctor.last_name} specialization={doctor.specialization} nationality={doctor.nationality} start_hours={doctor.start_hours} start_minutes={doctor.start_minutes} end_hours={doctor.end_hours} end_minutes={doctor.end_minutes} />
                                ))
                                : <div>No doctors in this department currently</div>,
                            }[selectedDept]
                        }
                    </Grid>
                </Box>
            </Box>
        );   
    } else {
        return(
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="loading" />
            </div>
        );
    }
}

export default BookAppointment;