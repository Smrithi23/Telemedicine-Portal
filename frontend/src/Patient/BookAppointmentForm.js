import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Tab, Tabs, AppBar, TextField, Typography, Grid, Box, Button, Avatar, TableRow, TableCell, Paper, Table, TableBody, TableContainer, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import config from '../Config/config';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
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
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
}));

function BookAppointmentForm(props) {

    let day1_ref = useRef();
    let day2_ref = useRef();
    let day3_ref = useRef();
    let day4_ref = useRef();
    let day5_ref = useRef();
    let day6_ref = useRef();
    let day7_ref = useRef();

    let history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [time_slot_options, set_time_slot_options] = useState('');
    let token = sessionStorage.getItem('token');
    const [data, setData] = useState('');
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    useEffect(() => {
        axios.get(config.baseURL + "/patient/doctor/" + props.match.params.id + "/", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            setData(response.data);
            set_time_slot_options({slots : [...response.data.time_slots.day1]})

        }).catch(e => {
            console.log(e);
            history.replace({ pathname: '/patient' });
            window.location.reload();
        })
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        window.location.reload();
    };

    const handleClose = () => {
        setOpen(false);
    };
    let today = new Date();
    let day1 = new Date(today);
    let day2 = new Date(today);
    let day3 = new Date(today);
    let day4 = new Date(today);
    let day5 = new Date(today);
    let day6 = new Date(today);
    let day7 = new Date(today);
    day1.setDate(day1.getDate() + 1);
    day2.setDate(day2.getDate() + 2);
    day3.setDate(day3.getDate() + 3);
    day4.setDate(day4.getDate() + 4);
    day5.setDate(day5.getDate() + 5);
    day6.setDate(day6.getDate() + 6);
    day7.setDate(day7.getDate() + 7);

    const [symptoms, setSymptoms] = useState('');
    const [duration, setDuration] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [temperature, setTemperature] = useState('');
    const [pulseRate, setPulseRate] = useState('');
    const [bloodPressureSystolic, setBloodPressureSystolic] = useState('');
    const [bloodPressureDiastolic, setBloodPressureDiastolic] = useState('');
    const [date, setDate] = useState(formatDate(day1));
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');

    const [symptoms_error_text, set_symptoms_error_text] = useState(null);
    const [duration_error_text, set_duration_error_text] = useState(null);
    const [height_error_text, set_height_error_text] = useState(null);
    const [weight_error_text, set_weight_error_text] = useState(null);
    const [temperature_error_text, set_temperature_error_text] = useState(null);
    const [pulse_rate_error_text, set_pulse_rate_error_text] = useState(null);
    const [bp_systolic_error_text, set_bp_sys_error_text] = useState(null);
    const [bp_diastolic_error_text, set_bp_dia_error_text] = useState(null);
    const [date_error_text, set_date_error_text] = useState(null);
    const [time_slot_error_text, set_time_slot_error_text] = useState(null);
    function changeValue(e, type) {
        const value = e.target.value;
        if(type === "symptoms") {
            setSymptoms(value);
        } else if(type === "duration") {
            setDuration(value)
        } else if(type === "height") {
            setHeight(value)
        } else if(type === "weight") {
            setWeight(value)
        } else if(type === "temperature") {
            setTemperature(value)
        } else if(type === "pulseRate") {
            setPulseRate(value)
        } else if(type === "bloodPressureSystolic") {
            setBloodPressureSystolic(value)
        } else if(type === "bloodPressureDiastolic") {
            setBloodPressureDiastolic(value)
        } else if(type === "date") {
            if(value === 1) {
                setDate(formatDate(day1));
                day1_ref.current.style.display = 'block';
                day2_ref.current.style.display = 'none';
                day3_ref.current.style.display = 'none';
                day4_ref.current.style.display = 'none';
                day5_ref.current.style.display = 'none';
                day6_ref.current.style.display = 'none';
                day7_ref.current.style.display = 'none';
                setHours('');
                setMinutes('');
            } else if(value === 2) {
                setDate(formatDate(day2));
                day1_ref.current.style.display = 'none';
                day2_ref.current.style.display = 'block';
                day3_ref.current.style.display = 'none';
                day4_ref.current.style.display = 'none';
                day5_ref.current.style.display = 'none';
                day6_ref.current.style.display = 'none';
                day7_ref.current.style.display = 'none';
                setHours('');
                setMinutes('');
            } else if(value === 3) {
                setDate(formatDate(day3));
                day1_ref.current.style.display = 'none';
                day2_ref.current.style.display = 'none';
                day3_ref.current.style.display = 'block';
                day4_ref.current.style.display = 'none';
                day5_ref.current.style.display = 'none';
                day6_ref.current.style.display = 'none';
                day7_ref.current.style.display = 'none';
                setHours('');
                setMinutes('');
            } else if(value === 4) {
                setDate(formatDate(day4));
                day1_ref.current.style.display = 'none';
                day2_ref.current.style.display = 'none';
                day3_ref.current.style.display = 'none';
                day4_ref.current.style.display = 'block';
                day5_ref.current.style.display = 'none';
                day6_ref.current.style.display = 'none';
                day7_ref.current.style.display = 'none';
                setHours('');
                setMinutes('');
            } else if(value === 5) {
                setDate(formatDate(day5));
                day1_ref.current.style.display = 'none';
                day2_ref.current.style.display = 'none';
                day3_ref.current.style.display = 'none';
                day4_ref.current.style.display = 'none';
                day5_ref.current.style.display = 'block';
                day6_ref.current.style.display = 'none';
                day7_ref.current.style.display = 'none';
                setHours('');
                setMinutes('');
            } else if(value === 6) {
                setDate(formatDate(day6));
                day1_ref.current.style.display = 'none';
                day2_ref.current.style.display = 'none';
                day3_ref.current.style.display = 'none';
                day4_ref.current.style.display = 'none';
                day5_ref.current.style.display = 'none';
                day6_ref.current.style.display = 'block';
                day7_ref.current.style.display = 'none';
                setHours('');
                setMinutes('');
            } else if(value === 7) {
                setDate(formatDate(day7));
                day1_ref.current.style.display = 'none';
                day2_ref.current.style.display = 'none';
                day3_ref.current.style.display = 'none';
                day4_ref.current.style.display = 'none';
                day5_ref.current.style.display = 'none';
                day6_ref.current.style.display = 'none';
                day7_ref.current.style.display = 'block';
                setHours('');
                setMinutes('');
            }
        } else if(type === "timeSlot") {
            console.log(value);
            if(value === "0:00") {
                setHours(0);
                setMinutes(0);
            } else if(value === "0:30") {
                setHours(0);
                setMinutes(30);
            } else if(value === "1:00") {
                setHours(1);
                setMinutes(0);
            } else if(value === "1:30") {
                setHours(1);
                setMinutes(30);
            } else if(value === "2:00") {
                setHours(2);
                setMinutes(0);
            } else if(value === "2:30") {
                setHours(2);
                setMinutes(30);
            } else if(value === "3:00") {
                setHours(3);
                setMinutes(0);
            } else if(value === "3:30") {
                setHours(3);
                setMinutes(30);
            } else if(value === "4:00") {
                setHours(4);
                setMinutes(0);
            } else if(value === "4:30") {
                setHours(4);
                setMinutes(30);
            } else if(value === "5:00") {
                setHours(5);
                setMinutes(0);
            } else if(value === "5:30") {
                setHours(5);
                setMinutes(30);
            } else if(value === "6:00") {
                setHours(6);
                setMinutes(0);
            } else if(value === "6:30") {
                setHours(6);
                setMinutes(30);
            } else if(value === "7:00") {
                setHours(7);
                setMinutes(0);
            } else if(value === "7:30") {
                setHours(7);
                setMinutes(30);
            } else if(value === "8:00") {
                setHours(8);
                setMinutes(0);
            } else if(value === "8:30") {
                setHours(8);
                setMinutes(30);
            } else if(value === "9:00") {
                setHours(9);
                setMinutes(0);
            } else if(value === "9:30") {
                setHours(9);
                setMinutes(30);
            } else if(value === "10:00") {
                setHours(10);
                setMinutes(0);
            } else if(value === "10:30") {
                setHours(10);
                setMinutes(30);
            } else if(value === "11:00") {
                setHours(11);
                setMinutes(0);
            } else if(value === "11:30") {
                setHours(11);
                setMinutes(30);
            } else if(value === "12:00") {
                setHours(12);
                setMinutes(0);
            } else if(value === "12:30") {
                setHours(12);
                setMinutes(30);
            } else if(value === "13:00") {
                setHours(13);
                setMinutes(0);
            } else if(value === "13:30") {
                setHours(13);
                setMinutes(30);
            } else if(value === "14:00") {
                setHours(14);
                setMinutes(0);
            } else if(value === "14:30") {
                setHours(14);
                setMinutes(30);
            } else if(value === "15:00") {
                setHours(15);
                setMinutes(0);
            } else if(value === "15:30") {
                setHours(15);
                setMinutes(30);
            } else if(value === "16:00") {
                setHours(16);
                setMinutes(0);
            } else if(value === "16:30") {
                setHours(16);
                setMinutes(30);
            } else if(value === "17:00") {
                setHours(17);
                setMinutes(0);
            } else if(value === "17:30") {
                setHours(17);
                setMinutes(30);
            } else if(value === "18:00") {
                setHours(18);
                setMinutes(0);
            } else if(value === "18:30") {
                setHours(18);
                setMinutes(30);
            } else if(value === "19:00") {
                setHours(19);
                setMinutes(0);
            } else if(value === "19:30") {
                setHours(19);
                setMinutes(30);
            } else if(value === "20:00") {
                setHours(20);
                setMinutes(0);
            } else if(value === "20:30") {
                setHours(20);
                setMinutes(30);
            } else if(value === "21:00") {
                setHours(21);
                setMinutes(0);
            } else if(value === "21:30") {
                setHours(21);
                setMinutes(30);
            } else if(value === "22:00") {
                setHours(22);
                setMinutes(0);
            } else if(value === "22:30") {
                setHours(22);
                setMinutes(30);
            } else if(value === "23:00") {
                setHours(23);
                setMinutes(0);
            } else if(value === "23:30") {
                setHours(23);
                setMinutes(30);
            }
        }
    }
    function book() {
        let error = 0;
        if(symptoms === "") {
            set_symptoms_error_text("Enter symptoms");
            error = 1;
        } else {
            set_symptoms_error_text(null);
        }
        if(duration === "") {
            set_duration_error_text("Enter duration");
            error = 1;
        } else {
            set_duration_error_text(null);
        }
        if(height === "") {
            set_height_error_text("Enter height");
            error = 1;
        } else {
            if(height < 0) {
                set_height_error_text("Enter positive value for height");
                error = 1;
            } else if(height > 12) {
                set_height_error_text("Enter valid height in feet");
                error = 1;
            } else {
                set_height_error_text(null);
            }
        }
        if(weight === "") {
            set_weight_error_text("Enter weight");
            error = 1;
        } else {
            if(weight < 0) {
                set_weight_error_text("Enter positive value for weight");
                error = 1;
            } else if(weight > 700) {
                set_weight_error_text("Enter valid weight in kg");
                error = 1;
            } else {
                set_weight_error_text(null);
            }
        }
        if(temperature === "") {
            set_temperature_error_text("Enter temperature");
            error = 1;
        } else {
            if(temperature < 30) {
                set_temperature_error_text("Enter valid temperature in celsius");
                error = 1;
            } else if (temperature > 50) {
                set_temperature_error_text("Enter valid temperature in celsius");
                error = 1;
            } else {
                set_temperature_error_text(null);
            }
        }
        if(pulseRate === "") {
            set_pulse_rate_error_text("Enter pulse rate");
            error = 1;
        } else {
            if(pulseRate < 0) {
                set_pulse_rate_error_text("Enter valid pulse rate");
                error = 1;
            } else {
                set_pulse_rate_error_text(null);   
            }
        }
        if(bloodPressureSystolic === "") {
            set_bp_sys_error_text("Enter blood pressure systolic");
            error = 1;
        } else {
            if(bloodPressureSystolic < 0) {
                set_bp_sys_error_text("Enter valid value for blood pressure systolic");
                error = 1;
            } else {
                set_bp_sys_error_text(null);
            }
        }
        if(bloodPressureDiastolic === "") {
            set_bp_dia_error_text("Enter blood pressure diastolic");
            error = 1;
        } else {
            if(bloodPressureDiastolic < 0) {
                set_bp_dia_error_text("Enter valid value for blood pressure diastolic");
                error = 1;
            } else {
                set_bp_dia_error_text(null);
            }
        }
        if(date === "") {
            set_date_error_text("Select date");
            error = 1;
        } else {
            set_date_error_text(null);
        }
        if(hours === "" || minutes === "") {
            set_time_slot_error_text("Select a time slot");
            error = 1;
        } else {
            set_time_slot_error_text(null);
        }
        if (error === 0) {
            let token = sessionStorage.getItem('token');
            const formdata = new FormData();
            formdata.append('doctor_id', props.match.params.id);
            formdata.append('symptoms', symptoms);
            formdata.append('duration', duration);
            formdata.append('height', height);
            formdata.append('weight', weight);
            formdata.append('temperature', temperature);
            formdata.append('pulse_rate', pulseRate);
            formdata.append('blood_pressure_systolic', bloodPressureSystolic);
            formdata.append('blood_pressure_diastolic', bloodPressureDiastolic);
            formdata.append('date', date);
            formdata.append('hours', hours);
            formdata.append('minutes', minutes);
            axios.post(config.baseURL + "/patient/doctor/bookappointment/", formdata, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => {
                handleClickOpen();
                console.log(res);
            }).catch(e => {
                history.replace({ pathname: '/patient' });
                window.location.reload();
            });
        }
    }
    if(data) {
        return (
            <Box style={{width: '100%', minHeight: '100vh', background: 'linear-gradient(45deg, #EEE 30%, #DDD 90%)'}}>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Booked Appointment"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Appointment has been booked successfully
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            OK
                    </Button>
                    </DialogActions>
                </Dialog>
                <Box display={{xs: 'none', sm: 'none', md: 'flex', lg: 'flex'}} style={{width: '100%'}}>
                    <Grid container>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{minHeight: '50px',height: '8vh', background: '#ffffff'}}>
                            <Grid item xs={6} sm={4} md={2} lg={2} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <img src="/telemedicine_logo.png" alt="logo" style={{height: '50px' ,minWidth: '130px'}}/>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{background: '#293447'}}>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <Button style={{color: '#FFFFFF', fontWeight: 'bold'}} onClick={() => history.goBack()}>
                                    <ArrowBackIcon />
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} lg={12}>
                            <Grid item xs={6} sm={6} md={6} lg={6} style={{borderRight: '2px solid #ccc', display: 'flex', justifyContent: 'center'}}>
                                <Box style={{width: '40vw', maxWidth: '35em'}}>
                                    <Typography style={{color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '2em'}}>
                                        Doctor Details
                                    </Typography>
                                    <TableContainer component={Paper} style={{marginTop: '1em', marginBottom: '2em', width: '40vw', maxWidth: '35em'}}>
                                        <Table aria-label="simple table">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="left">
                                                        <Avatar style={{ width: '4em', height: '4em' }}>
                                                            <img src={config.baseURL + data.profile_pic} style={{ width: '4em', height: '4em' }} alt="profile" />
                                                        </Avatar>
                                                    </TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Doctor Name</TableCell>
                                                    <TableCell align="left">{data.first_name} {data.last_name}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Gender</TableCell>
                                                    <TableCell align="left">{data.gender}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Nationality</TableCell>
                                                    <TableCell align="left">{data.nationality}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Department</TableCell>
                                                    <TableCell align="left">{data.department}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Specialization</TableCell>
                                                    <TableCell align="left">{data.specialization}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Hospital</TableCell>
                                                    <TableCell align="left">{data.hospital}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Years of Experience</TableCell>
                                                    <TableCell align="left">{data.years_of_experience} years</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Availability</TableCell>
                                                    <TableCell align="left">{data.start_hours}:{data.start_minutes} to {data.end_hours}:{data.end_minutes}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Contact Number</TableCell>
                                                    <TableCell align="left">{data.contact_number}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Box style={{width: '40vw', marginTop: '1em', marginBottom: '1em', maxWidth: '35em'}}>
                                    <Typography style={{color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em'}}>
                                        Medical Symptoms
                                    </Typography>
                                    <Grid container spacing={3} style={{marginTop: '1em', background: '#ffffff', padding: '0.5em', borderRadius: '3px'}}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <TextField type="text" label="Medical Symptoms" variant="outlined" helperText={symptoms_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => changeValue(e, 'symptoms')}/>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <TextField type="text" label="Duration" variant="outlined" helperText={duration_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => changeValue(e, 'duration')}/>
                                        </Grid>
                                    </Grid>
                                    <Typography style={{color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em'}}>
                                        Vital Signs
                                    </Typography>
                                    <Grid container spacing={3} style={{marginTop: '1em', background: '#ffffff', padding: '0.5em', borderRadius: '3px'}}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <TextField type="text" label="Height in feet" variant="outlined" helperText={height_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => changeValue(e, 'height')}/>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <TextField type="text" label="Weight in kg" variant="outlined" helperText={weight_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => changeValue(e, 'weight')}/>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <TextField type="text" label="Temperature in degree celsius" variant="outlined" helperText={temperature_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => changeValue(e, 'temperature')}/>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <TextField type="text" label="Pulse Rate" variant="outlined" helperText={pulse_rate_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => changeValue(e, 'pulseRate')}/>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <TextField type="text" label="Blood Pressure Systolic" variant="outlined" helperText={bp_systolic_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => changeValue(e, 'bloodPressureSystolic')}/>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <TextField type="text" label="Blood Pressure Diastolic" variant="outlined" helperText={bp_diastolic_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => changeValue(e, 'bloodPressureDiastolic')}/>
                                        </Grid>
                                    </Grid>
                                    <Typography style={{color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em'}}>
                                        Date / Time
                                    </Typography>
                                    <Grid container spacing={3} style={{marginTop: '1em', background: '#ffffff', padding: '0.5em', borderRadius: '3px'}}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <TextField defaultValue={1} label="Date" variant="outlined" select helperText={date_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "date") }}>
                                                <MenuItem value={1}>{day1.getDate()}-{day1.getMonth()}-{day1.getFullYear()}</MenuItem>
                                                <MenuItem value={2}>{day2.getDate()}-{day2.getMonth()}-{day2.getFullYear()}</MenuItem>
                                                <MenuItem value={3}>{day3.getDate()}-{day3.getMonth()}-{day3.getFullYear()}</MenuItem>
                                                <MenuItem value={4}>{day4.getDate()}-{day4.getMonth()}-{day4.getFullYear()}</MenuItem>
                                                <MenuItem value={5}>{day5.getDate()}-{day5.getMonth()}-{day5.getFullYear()}</MenuItem>
                                                <MenuItem value={6}>{day6.getDate()}-{day6.getMonth()}-{day6.getFullYear()}</MenuItem>
                                                <MenuItem value={7}>{day7.getDate()}-{day7.getMonth()}-{day7.getFullYear()}</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Box ref={day1_ref} style={{display: 'block'}}>
                                                <TextField label="Time Slot" variant="outlined" select helperText={time_slot_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "timeSlot") }}>
                                                    {
                                                        data.time_slots.day1.map(timeslot => <MenuItem value={timeslot.hours+":"+timeslot.minutes}>{timeslot.hours}:{timeslot.minutes}</MenuItem>)
                                                    }
                                                </TextField>
                                            </Box>
                                            <Box ref={day2_ref} style={{display: 'none'}}>
                                                <TextField label="Time Slot" variant="outlined" select helperText={time_slot_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "timeSlot") }}>
                                                    {
                                                        data.time_slots.day2.map(timeslot => <MenuItem value={timeslot.hours+":"+timeslot.minutes}>{timeslot.hours}:{timeslot.minutes}</MenuItem>)
                                                    }
                                                </TextField>
                                            </Box>
                                            <Box ref={day3_ref} style={{display: 'none'}}>
                                                <TextField label="Time Slot" variant="outlined" select helperText={time_slot_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "timeSlot") }}>
                                                    {
                                                        data.time_slots.day3.map(timeslot => <MenuItem value={timeslot.hours+":"+timeslot.minutes}>{timeslot.hours}:{timeslot.minutes}</MenuItem>)
                                                    }
                                                </TextField>
                                            </Box>
                                            <Box ref={day4_ref} style={{display: 'none'}}>
                                                <TextField label="Time Slot" variant="outlined" select helperText={time_slot_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "timeSlot") }}>
                                                    {
                                                        data.time_slots.day4.map(timeslot => <MenuItem value={timeslot.hours+":"+timeslot.minutes}>{timeslot.hours}:{timeslot.minutes}</MenuItem>)
                                                    }
                                                </TextField>
                                            </Box>
                                            <Box ref={day5_ref} style={{display: 'none'}}>
                                                <TextField label="Time Slot" variant="outlined" select helperText={time_slot_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "timeSlot") }}>
                                                    {
                                                        data.time_slots.day5.map(timeslot => <MenuItem value={timeslot.hours+":"+timeslot.minutes}>{timeslot.hours}:{timeslot.minutes}</MenuItem>)
                                                    }
                                                </TextField>
                                            </Box>
                                            <Box ref={day6_ref} style={{display: 'none'}}>
                                                <TextField label="Time Slot" variant="outlined" select helperText={time_slot_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "timeSlot") }}>
                                                    {
                                                        data.time_slots.day6.map(timeslot => <MenuItem value={timeslot.hours+":"+timeslot.minutes}>{timeslot.hours}:{timeslot.minutes}</MenuItem>)
                                                    }
                                                </TextField>
                                            </Box>
                                            <Box ref={day7_ref} style={{display: 'none'}}>
                                                <TextField label="Time Slot" variant="outlined" select helperText={time_slot_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "timeSlot") }}>
                                                    {
                                                        data.time_slots.day7.map(timeslot => <MenuItem value={timeslot.hours+":"+timeslot.minutes}>{timeslot.hours}:{timeslot.minutes}</MenuItem>)
                                                    }
                                                </TextField>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={12} lg={12} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                                            <Button onClick={(e) => book()} style={{fontWeight: 'bold', color: '#ffffff', background: '#17b0ab', marginTop: '2em', marginBottom: '1em'}}>
                                                Book Appointment
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Box display={{xs: 'flex', sm: 'flex', md: 'none', lg: 'none'}} style={{width: '100%'}}>
                    <Grid container>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{minHeight: '50px',height: '8vh', background: '#ffffff'}}>
                            <Grid item xs={6} sm={4} md={2} lg={2} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <img src="/telemedicine_logo.png" alt="logo" style={{height: '50px' ,minWidth: '130px'}}/>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={12} lg={12} style={{background: '#293447'}}>
                            <Button style={{color: '#FFFFFF', fontWeight: 'bold', height: '2.5em'}} onClick={() => history.goBack()}>
                                <ArrowBackIcon />
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div className={classes.root} style={{width: '100%'}}>
                                <AppBar position="static" color="default">
                                    <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                    >
                                    <Tab label="Doctor Details" {...a11yProps(0)} />
                                    <Tab label="Book Appointment" {...a11yProps(1)} />
                                    </Tabs>
                                </AppBar>
                                <SwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={value}
                                    onChangeIndex={handleChangeIndex}
                                >
                                    <TabPanel value={value} index={0} dir={theme.direction} style={{background: 'linear-gradient(45deg, #EEE 30%, #DDD 90%)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <Box style={{width: '60vw'}}>
                                            <Typography style={{color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em'}}>
                                                Doctor Details
                                            </Typography>
                                            <TableContainer component={Paper} style={{marginTop: '1em', marginBottom: '2em', width: '100%'}}>
                                                <Table aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">
                                                                <Avatar style={{ width: '4em', height: '4em' }}>
                                                                    <img src={config.baseURL + data.profile_pic} style={{ width: '4em', height: '4em' }} alt="profile" />
                                                                </Avatar>
                                                            </TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Doctor Name</TableCell>
                                                            <TableCell align="left">{data.first_name} {data.last_name}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Gender</TableCell>
                                                            <TableCell align="left">{data.gender}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Nationality</TableCell>
                                                            <TableCell align="left">{data.nationality}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Department</TableCell>
                                                            <TableCell align="left">{data.department}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Specialization</TableCell>
                                                            <TableCell align="left">{data.specialization}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Hospital</TableCell>
                                                            <TableCell align="left">{data.hospital}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Years of Experience</TableCell>
                                                            <TableCell align="left">{data.years_of_experience} years</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Availability</TableCell>
                                                            <TableCell align="left">{data.start_hours}:{data.start_minutes} to {data.end_hours}:{data.end_minutes} </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Contact Number</TableCell>
                                                            <TableCell align="left">{data.contact_number}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel value={value} index={1} dir={theme.direction} style={{background: 'linear-gradient(45deg, #EEE 30%, #DDD 90%)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <Box style={{width: '60vw', marginTop: '1em', marginBottom: '1em'}}>
                                            <Typography style={{color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em'}}>
                                                Medical Symptoms
                                            </Typography>
                                            <Grid container spacing={3} style={{marginTop: '1em', background: '#ffffff', padding: '0.5em', borderRadius: '3px'}}>
                                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    <TextField type="text" label="Medical Symptoms" variant="outlined" helperText={symptoms_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => changeValue(e, 'symptoms')}/>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    <TextField type="text" label="Duration" variant="outlined" helperText={duration_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => changeValue(e, 'duration')}/>
                                                </Grid>
                                            </Grid>
                                            <Typography style={{color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em'}}>
                                                Vital Signs
                                            </Typography>
                                            <Grid container spacing={3} style={{marginTop: '1em', background: '#ffffff', padding: '0.5em', borderRadius: '3px'}}>
                                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    <TextField type="text" label="Height in feet" variant="outlined" helperText={height_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => changeValue(e, 'height')}/>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    <TextField type="text" label="Weight in kg" variant="outlined" helperText={weight_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => changeValue(e, 'weight')}/>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    <TextField type="text" label="Temperature in degree celsius" variant="outlined" helperText={temperature_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => changeValue(e, 'temperature')}/>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    <TextField type="text" label="Pulse Rate" variant="outlined" helperText={pulse_rate_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => changeValue(e, 'pulseRate')}/>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    <TextField type="text" label="Blood Pressure Systolic" variant="outlined" helperText={bp_systolic_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => changeValue(e, 'bloodPressureSystolic')}/>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    <TextField type="text" label="Blood Pressure Diastolic" variant="outlined" helperText={bp_diastolic_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => changeValue(e, 'bloodPressureDiastolic')}/>
                                                </Grid>
                                            </Grid>
                                            <Typography style={{color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em'}}>
                                                Date / Time
                                            </Typography>
                                            <Grid container spacing={3} style={{marginTop: '1em', background: '#ffffff', padding: '0.5em', borderRadius: '3px'}}>
                                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    <TextField defaultValue={1} label="Date" variant="outlined" select helperText={date_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "date") }}>
                                                        <MenuItem value={1}>{day1.getDate()}-{day1.getMonth()}-{day1.getFullYear()}</MenuItem>
                                                        <MenuItem value={2}>{day2.getDate()}-{day2.getMonth()}-{day2.getFullYear()}</MenuItem>
                                                        <MenuItem value={3}>{day3.getDate()}-{day3.getMonth()}-{day3.getFullYear()}</MenuItem>
                                                        <MenuItem value={4}>{day4.getDate()}-{day4.getMonth()}-{day4.getFullYear()}</MenuItem>
                                                        <MenuItem value={5}>{day5.getDate()}-{day5.getMonth()}-{day5.getFullYear()}</MenuItem>
                                                        <MenuItem value={6}>{day6.getDate()}-{day6.getMonth()}-{day6.getFullYear()}</MenuItem>
                                                        <MenuItem value={7}>{day7.getDate()}-{day7.getMonth()}-{day7.getFullYear()}</MenuItem>
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    <Box ref={day1_ref} style={{display: 'block'}}>
                                                        <TextField label="Time Slot" variant="outlined" select helperText={time_slot_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "timeSlot") }}>
                                                            {
                                                                data.time_slots.day1.map(timeslot => <MenuItem value={timeslot.hours+":"+timeslot.minutes}>{timeslot.hours}:{timeslot.minutes}</MenuItem>)
                                                            }
                                                        </TextField>
                                                    </Box>
                                                    <Box ref={day2_ref} style={{display: 'none'}}>
                                                        <TextField label="Time Slot" variant="outlined" select helperText={time_slot_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "timeSlot") }}>
                                                            {
                                                                data.time_slots.day2.map(timeslot => <MenuItem value={timeslot.hours+":"+timeslot.minutes}>{timeslot.hours}:{timeslot.minutes}</MenuItem>)
                                                            }
                                                        </TextField>
                                                    </Box>
                                                    <Box ref={day3_ref} style={{display: 'none'}}>
                                                        <TextField label="Time Slot" variant="outlined" select helperText={time_slot_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "timeSlot") }}>
                                                            {
                                                                data.time_slots.day3.map(timeslot => <MenuItem value={timeslot.hours+":"+timeslot.minutes}>{timeslot.hours}:{timeslot.minutes}</MenuItem>)
                                                            }
                                                        </TextField>
                                                    </Box>
                                                    <Box ref={day4_ref} style={{display: 'none'}}>
                                                        <TextField label="Time Slot" variant="outlined" select helperText={time_slot_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "timeSlot") }}>
                                                            {
                                                                data.time_slots.day4.map(timeslot => <MenuItem value={timeslot.hours+":"+timeslot.minutes}>{timeslot.hours}:{timeslot.minutes}</MenuItem>)
                                                            }
                                                        </TextField>
                                                    </Box>
                                                    <Box ref={day5_ref} style={{display: 'none'}}>
                                                        <TextField label="Time Slot" variant="outlined" select helperText={time_slot_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "timeSlot") }}>
                                                            {
                                                                data.time_slots.day5.map(timeslot => <MenuItem value={timeslot.hours+":"+timeslot.minutes}>{timeslot.hours}:{timeslot.minutes}</MenuItem>)
                                                            }
                                                        </TextField>
                                                    </Box>
                                                    <Box ref={day6_ref} style={{display: 'none'}}>
                                                        <TextField label="Time Slot" variant="outlined" select helperText={time_slot_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "timeSlot") }}>
                                                            {
                                                                data.time_slots.day6.map(timeslot => <MenuItem value={timeslot.hours+":"+timeslot.minutes}>{timeslot.hours}:{timeslot.minutes}</MenuItem>)
                                                            }
                                                        </TextField>
                                                    </Box>
                                                    <Box ref={day7_ref} style={{display: 'none'}}>
                                                        <TextField label="Time Slot" variant="outlined" select helperText={time_slot_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "timeSlot") }}>
                                                            {
                                                                data.time_slots.day7.map(timeslot => <MenuItem value={timeslot.hours+":"+timeslot.minutes}>{timeslot.hours}:{timeslot.minutes}</MenuItem>)
                                                            }
                                                        </TextField>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={12} sm={12} md={12} lg={12} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                                                    <Button onClick={(e) => book()} style={{fontWeight: 'bold', color: '#ffffff', background: '#17b0ab', marginTop: '2em', marginBottom: '1em'}}>
                                                        Book Appointment
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </TabPanel>
                                </SwipeableViews>
                            </div>
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

export default BookAppointmentForm;