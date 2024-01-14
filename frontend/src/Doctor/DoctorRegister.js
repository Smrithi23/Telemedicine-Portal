import React, { useState } from 'react';
import { Box, Grid, TextField, MenuItem, Button, Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../Config/config';

function DoctorRegister() {
    let history = useHistory();
    let error = 0;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [department, setDepartment] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [hospital, setHospital] = useState('');
    const [hospitalAddress, setHospitalAddress] = useState('');
    const [startHours, setStartHours] = useState('');
    const [startMinutes, setStartMinutes] = useState('');
    const [endHours, setEndHours] = useState('');
    const [endMinutes, setEndMinutes] = useState('');
    const [nationality, setNationality] = useState('');
    const [homeAddress, setHomeAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [emailId, setEmailId] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [first_name_error_text, set_first_name_error_text] = useState(null);
    const [last_name_error_text, set_last_name_error_text] = useState(null);
    const [gender_error_text, set_gender_error_text] = useState(null);
    const [dob_error_text, set_dob_error_text] = useState(null);
    const [department_error_text, set_department_error_text] = useState(null);
    const [specialization_error_text, set_specialization_error_text] = useState(null);
    const [registration_number_error_text, set_registration_number_error_text] = useState(null);
    const [years_of_experience_error_text, set_years_of_experience_error_text] = useState(null);
    const [hospital_error_text, set_hospital_error_text] = useState(null);
    const [hospital_address_error_text, set_hospital_address_error_text] = useState(null);
    const [start_hours_error_text, set_start_hours_error_text] = useState(null);
    const [start_minutes_error_text, set_start_minutes_error_text] = useState(null);
    const [end_hours_error_text, set_end_hours_error_text] = useState(null);
    const [end_minutes_error_text, set_end_minutes_error_text] = useState(null);
    const [end_time_error_text, set_end_time_error_text] = useState(null);
    const [nationality_error_text, set_nationality_error_text] = useState(null);
    const [home_address_error_text, set_home_address_error_text] = useState(null);
    const [contact_number_error_text, set_contact_number_error_text] = useState(null);
    const [email_id_error_text, set_email_id_error_text] = useState(null);
    const [profile_pic_error_text, set_profile_pic_error_text] = useState(null);
    const [password_error_text, set_password_error_text] = useState(null);
    const [confirm_password_error_text, set_confirm_password_error_text] = useState(null);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function changeValue(e, type) {
        const value = e.target.value;
        if (type === "firstName") {
            setFirstName(value);
        } else if (type === "lastName") {
            setLastName(value);
        } else if (type === "gender") {
            setGender(value);
        } else if (type === "dob") {
            setDob(value);
        } else if (type === "department") {
            setDepartment(value);
        } else if (type === "specialization") {
            setSpecialization(value);
        } else if (type === "registrationNumber") {
            setRegistrationNumber(value);
        } else if (type === "yearsOfExperience") {
            setYearsOfExperience(value);
        } else if (type === "hospital") {
            setHospital(value);
        } else if (type === "hospitalAddress") {
            setHospitalAddress(value);
        } else if (type === "startHours") {
            setStartHours(value);
        } else if (type === "startMinutes") {
            setStartMinutes(value);
        } else if (type === "endHours") {
            setEndHours(value);
        } else if (type === "endMinutes") {
            setEndMinutes(value);
        } else if (type === "nationality") {
            setNationality(value);
        } else if (type === "homeAddress") {
            setHomeAddress(value);
        } else if (type === "contactNumber") {
            setContactNumber(value);
        } else if (type === "emailId") {
            setEmailId(value);
        } else if (type === "password") {
            setPassword(value);
        } else if (type === "confirmPassword") {
            setConfirmPassword(value);
        } else if (type === "profilePic") {
            setProfilePic(e.target.files[0]);
        }
    }

    function register(e) {
        if (firstName === '') {
            set_first_name_error_text("Enter first name");
            error = 1;
        } else {
            set_first_name_error_text(null);
        }
        if (lastName === '') {
            set_last_name_error_text("Enter last name");
            error = 1;
        } else {
            set_last_name_error_text(null);
        }
        if (gender === '') {
            set_gender_error_text("Select gender");
            error = 1;
        } else {
            set_gender_error_text(null);
        }
        if (dob === '') {
            set_dob_error_text("Enter date of birth");
            error = 1;
        } else {
            set_dob_error_text(null);
        }
        if (department === '') {
            set_department_error_text("Select department");
            error = 1;
        } else {
            set_department_error_text(null);
        }
        if (specialization === '') {
            set_specialization_error_text("Enter specialization");
            error = 1;
        } else {
            set_specialization_error_text(null);
        }
        if (registrationNumber === '') {
            set_registration_number_error_text("Enter registration number");
            error = 1;
        } else {
            if(registrationNumber < 0) {
                set_registration_number_error_text("Enter a valid registration number");
            } else {
                set_registration_number_error_text(null);
            }
        }
        if (yearsOfExperience === '') {
            set_years_of_experience_error_text("Enter years of experience");
            error = 1;
        } else {
            if(yearsOfExperience < 0) {
                set_years_of_experience_error_text("Enter a valid value for years of experience");
            } else {
                set_years_of_experience_error_text(null);
            }
        }
        if (hospital === '') {
            set_hospital_error_text("Enter hospital");
            error = 1;
        } else {
            set_hospital_error_text(null);
        }
        if (hospitalAddress === '') {
            set_hospital_address_error_text("Enter hospital address");
            error = 1;
        } else {
            set_hospital_address_error_text(null);
        }
        if (startHours === '') {
            set_start_hours_error_text("Enter start hour field");
            error = 1;
        } else {
            set_start_hours_error_text(null);
        }
        if (startMinutes === '') {
            set_start_minutes_error_text("Enter start minute field");
            error = 1;
        } else {
            set_start_minutes_error_text(null);
        }
        if (endHours === '') {
            set_end_hours_error_text("Enter end hour field");
            error = 1;
        } else {
            set_end_hours_error_text(null);
        }
        if (endMinutes === '') {
            set_end_minutes_error_text("Enter end minutes field");
            error = 1;
        } else {
            set_end_minutes_error_text(null);
        }
        if (nationality === '') {
            set_nationality_error_text("Select nationality");
            error = 1;
        } else {
            set_nationality_error_text(null);
        }
        if (homeAddress === '') {
            set_home_address_error_text("Enter home address");
            error = 1;
        } else {
            set_home_address_error_text(null);
        }
        if (contactNumber === '') {
            set_contact_number_error_text("Enter contact number");
            error = 1;
        } else {
            set_contact_number_error_text(null);
        }
        if (emailId === '') {
            set_email_id_error_text("Enter email id");
            error = 1;
        } else {
            const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            if (expression.test(String(emailId).toLowerCase())) {
                set_email_id_error_text(null);
            } else {
                set_email_id_error_text("Enter a valid email id");
                error = 1;
            }
        }
        if (password === '') {
            set_password_error_text("Enter password");
            error = 1;
        } else {
            if (password !== confirmPassword) {
                set_password_error_text("Password and confirm password must be the same");
                error = 1;
            } else if (password.length >= 8) {
                set_password_error_text(null);
            } else {
                set_password_error_text("Password must contain atleast 8 characters");
                error = 1;
            }
        }
        if (confirmPassword === '') {
            set_confirm_password_error_text("Enter confirmed password");
            error = 1;
        } else {
            if (password !== confirmPassword) {
                set_confirm_password_error_text("Password and confirm password must be the same");
                error = 1;
            } else if (password.length >= 8) {
                set_confirm_password_error_text(null);
            } else {
                set_confirm_password_error_text("Password must contain atleast 8 characters");
                error = 1;
            }
        }
        if (profilePic === '') {
            set_profile_pic_error_text("Upload profile picture");
            error = 1;
        } else {
            set_profile_pic_error_text(null);
        }
        if (error === 0) {
            const formdata = new FormData();
            formdata.append('email', emailId);
            formdata.append('first_name', firstName);
            formdata.append('last_name', lastName);
            formdata.append('gender', gender);
            formdata.append('dob', dob);
            formdata.append('department', department);
            formdata.append('specialization', specialization);
            formdata.append('registration_number', registrationNumber);
            formdata.append('years_of_experience', yearsOfExperience);
            formdata.append('hospital', hospital);
            formdata.append('hospital_address', hospitalAddress);
            formdata.append('start_hours', startHours);
            formdata.append('start_minutes', startMinutes);
            formdata.append('end_hours', endHours);
            formdata.append('end_minutes', endMinutes);
            formdata.append('nationality', nationality);
            formdata.append('contact_number', contactNumber);
            formdata.append('home_address', homeAddress);
            formdata.append('profile_pic', profilePic, profilePic.name);
            formdata.append('password', password);
            axios.post(config.baseURL + "/doctor/register/", formdata, {
                headers: {
                    'content-type': 'multipart/form-data',
                }
            }).then(res => {
                if (res.request.response === '{"contact_number":["The phone number entered is not valid."]}') {
                    set_contact_number_error_text("Enter a valid contact number");
                    error = 1;
                } else {
                    sessionStorage.setItem('token', JSON.parse(res.request.response).token);
                    console.log(res);
                    history.push('/doctor/dashboard');
                }
            }).catch(error => {
                handleClickOpen();
                console.log(error.response);
            });
        }
    }

    return (
        <Grid container style={{ minHeight: '100%', width: '100%' }}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Email already registered"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Try registering with a different email id or login
                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid container item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', minHeight: '50px', height: '8vh' }}>
                <Grid item xs={6} sm={4} md={2} lg={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Link to="/">
                        <img src="/telemedicine_logo.png" alt="logo" style={{ height: '50px', minWidth: '130px' }} />
                    </Link>
                </Grid>
                <Grid item xs={3} sm={5} md={7} lg={7}></Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                    <Box display={{ xs: 'none', sm: 'block' }}>
                        <Button color="primary" variant="contained" component="span" style={{ background: '#17b0ab', fontWeight: 'bold' }}>
                            <Link to="/doctor" style={{ textDecoration: 'none', color: '#ffffff' }}>Back</Link>
                        </Button>
                    </Box>
                    <Box display={{ xs: 'block', sm: 'none' }}>
                        <Link to="/doctor" style={{ textDecoration: 'none', color: '#17b0ab', fontWeight: 'bold' }}>Back</Link>
                    </Box>
                </Grid>
            </Grid>
            <Grid container item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, #EEE 30%, #DDD 90%)', paddingTop: '30px', paddingBottom: '30px' }}>
                <Grid item container spacing={4} xs={8} sm={6} md={4} lg={4} style={{ background: '#ffffff', borderRadius: '5px' }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box component="div" style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '30px', color: '#17b0ab' }}>
                            Doctor Register
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField type="text" label="First Name" variant="outlined" helperText={first_name_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "firstName") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField type="text" label="Last Name" variant="outlined" helperText={last_name_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "lastName") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField label="Gender" variant="outlined" select helperText={gender_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "gender") }}>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField type="date" label="Date of birth" variant="outlined" helperText={dob_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "dob") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField label="Department" variant="outlined" select helperText={department_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "department") }}>
                            <MenuItem value="General Medicine">General Medicine</MenuItem>
                            <MenuItem value="Ear, nose and throat (ENT)">Ear, nose and throat (ENT)</MenuItem>
                            <MenuItem value="Dental">Dental</MenuItem>
                            <MenuItem value="Ophthalmology">Ophthalmology</MenuItem>
                            <MenuItem value="Cardiology">Cardiology</MenuItem>
                            <MenuItem value="Orthopedics">Orthopedics</MenuItem>
                            <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                            <MenuItem value="Gynecology">Gynecology</MenuItem>
                            <MenuItem value="Dermatology">Dermatology</MenuItem>
                            <MenuItem value="Nutrition and Dietics">Nutrition and Dietics</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField type="text" label="Specialization" variant="outlined" helperText={specialization_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "specialization") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField type="number" label="Registration Number" variant="outlined" helperText={registration_number_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "registrationNumber") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField type="number" label="Years of Experience" variant="outlined" helperText={years_of_experience_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "yearsOfExperience") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField type="text" label="Hospital" variant="outlined" helperText={hospital_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "hospital") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField type="text" label="Hospital Address" variant="outlined" helperText={hospital_address_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "hospitalAddress") }} multiline />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <label style={{color: '#888'}}>Consulting Start Time</label>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <TextField label="Hours" variant="outlined" select helperText={start_hours_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "startHours") }}>
                                    <MenuItem value={0}>00</MenuItem>
                                    <MenuItem value={1}>01</MenuItem>
                                    <MenuItem value={2}>02</MenuItem>
                                    <MenuItem value={3}>03</MenuItem>
                                    <MenuItem value={4}>04</MenuItem>
                                    <MenuItem value={5}>05</MenuItem>
                                    <MenuItem value={6}>06</MenuItem>
                                    <MenuItem value={7}>07</MenuItem>
                                    <MenuItem value={8}>08</MenuItem>
                                    <MenuItem value={9}>09</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={11}>11</MenuItem>
                                    <MenuItem value={12}>12</MenuItem>
                                    <MenuItem value={13}>13</MenuItem>
                                    <MenuItem value={14}>14</MenuItem>
                                    <MenuItem value={15}>15</MenuItem>
                                    <MenuItem value={16}>16</MenuItem>
                                    <MenuItem value={17}>17</MenuItem>
                                    <MenuItem value={18}>18</MenuItem>
                                    <MenuItem value={19}>19</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                    <MenuItem value={21}>21</MenuItem>
                                    <MenuItem value={22}>22</MenuItem>
                                    <MenuItem value={23}>23</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <TextField label="Minutes" variant="outlined" select helperText={start_minutes_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "startMinutes") }}>
                                    <MenuItem value={0}>00</MenuItem>
                                    <MenuItem value={30}>30</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <label style={{color: '#888'}}>Consulting End Time</label>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <TextField label="Hours" variant="outlined" select helperText={end_hours_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "endHours") }}>
                                    <MenuItem value={0}>00</MenuItem>
                                    <MenuItem value={1}>01</MenuItem>
                                    <MenuItem value={2}>02</MenuItem>
                                    <MenuItem value={3}>03</MenuItem>
                                    <MenuItem value={4}>04</MenuItem>
                                    <MenuItem value={5}>05</MenuItem>
                                    <MenuItem value={6}>06</MenuItem>
                                    <MenuItem value={7}>07</MenuItem>
                                    <MenuItem value={8}>08</MenuItem>
                                    <MenuItem value={9}>09</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={11}>11</MenuItem>
                                    <MenuItem value={12}>12</MenuItem>
                                    <MenuItem value={13}>13</MenuItem>
                                    <MenuItem value={14}>14</MenuItem>
                                    <MenuItem value={15}>15</MenuItem>
                                    <MenuItem value={16}>16</MenuItem>
                                    <MenuItem value={17}>17</MenuItem>
                                    <MenuItem value={18}>18</MenuItem>
                                    <MenuItem value={19}>19</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                    <MenuItem value={21}>21</MenuItem>
                                    <MenuItem value={22}>22</MenuItem>
                                    <MenuItem value={23}>23</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <TextField label="Minutes" variant="outlined" select helperText={end_minutes_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "endMinutes") }}>
                                    <MenuItem value={0}>00</MenuItem>
                                    <MenuItem value={30}>30</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField label="Nationality" variant="outlined" select helperText={nationality_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "nationality") }}>
                            <MenuItem value="Afghan">Afghan</MenuItem>
                            <MenuItem value="Albanian">Albanian</MenuItem>
                            <MenuItem value="Algerian">Algerian</MenuItem>
                            <MenuItem value="American">American</MenuItem>
                            <MenuItem value="Argentinian">Argentinian</MenuItem>
                            <MenuItem value="Australian">Australian</MenuItem>
                            <MenuItem value="Austrian">Austrian</MenuItem>
                            <MenuItem value="Bangladeshi">Bangladeshi</MenuItem>
                            <MenuItem value="Batswana">Batswana</MenuItem>
                            <MenuItem value="Belgian">Belgian</MenuItem>
                            <MenuItem value="Bolivian">Bolivian</MenuItem>
                            <MenuItem value="Brazilian">Brazilian</MenuItem>
                            <MenuItem value="British">British</MenuItem>
                            <MenuItem value="Bulgarian">Bulgarian</MenuItem>
                            <MenuItem value="Cambodian">Cambodian</MenuItem>
                            <MenuItem value="Cameroonian">Cameroonian</MenuItem>
                            <MenuItem value="Canadian">Canadian</MenuItem>
                            <MenuItem value="Chilean">Chilean</MenuItem>
                            <MenuItem value="Chinese">Chinese</MenuItem>
                            <MenuItem value="Colombian">Colombian</MenuItem>
                            <MenuItem value="Costa Rican">Costa Rican</MenuItem>
                            <MenuItem value="Croatian">Croatian</MenuItem>
                            <MenuItem value="Cuban">Cuban</MenuItem>
                            <MenuItem value="Czech">Czech</MenuItem>
                            <MenuItem value="Danish">Danish</MenuItem>
                            <MenuItem value="Dominican">Dominican</MenuItem>
                            <MenuItem value="Ecuadorian">Ecuadorian</MenuItem>
                            <MenuItem value="Egyptian">Egyptian</MenuItem>
                            <MenuItem value="Salvadorian">Salvadorian</MenuItem>
                            <MenuItem value="Emirati">Emirati</MenuItem>
                            <MenuItem value="English">English</MenuItem>
                            <MenuItem value="Estonian">Estonian</MenuItem>
                            <MenuItem value="Ethiopian">Ethiopian</MenuItem>
                            <MenuItem value="Fijian">Fijian</MenuItem>
                            <MenuItem value="Finnish">Finnish</MenuItem>
                            <MenuItem value="French">French</MenuItem>
                            <MenuItem value="German">German</MenuItem>
                            <MenuItem value="Ghanaian">Ghanaian</MenuItem>
                            <MenuItem value="Greek">Greek</MenuItem>
                            <MenuItem value="Guatemalan">Guatemalan</MenuItem>
                            <MenuItem value="Haitian">Haitian</MenuItem>
                            <MenuItem value="Honduran">Honduran</MenuItem>
                            <MenuItem value="Hungarian">Hungarian</MenuItem>
                            <MenuItem value="Icelandic">Icelandic</MenuItem>
                            <MenuItem value="Indian">Indian</MenuItem>
                            <MenuItem value="Indonesian">Indonesian</MenuItem>
                            <MenuItem value="Iranian">Iranian</MenuItem>
                            <MenuItem value="Iraqi">Iraqi</MenuItem>
                            <MenuItem value="Irish">Irish</MenuItem>
                            <MenuItem value="Israeli">Israeli</MenuItem>
                            <MenuItem value="Italian">Italian</MenuItem>
                            <MenuItem value="Jamaican">Jamaican</MenuItem>
                            <MenuItem value="Japanese">Japanese</MenuItem>
                            <MenuItem value="Jordanian">Jordanian</MenuItem>
                            <MenuItem value="Kenyan">Kenyan</MenuItem>
                            <MenuItem value="Korean">Korean</MenuItem>
                            <MenuItem value="Kuwaiti">Kuwaiti</MenuItem>
                            <MenuItem value="Lao">Lao</MenuItem>
                            <MenuItem value="Latvian">Latvian</MenuItem>
                            <MenuItem value="Lebanese">Lebanese</MenuItem>
                            <MenuItem value="Libyan">Libyan</MenuItem>
                            <MenuItem value="Lithuanian">Lithuanian</MenuItem>
                            <MenuItem value="Malagasy">Malagasy</MenuItem>
                            <MenuItem value="Malaysian">Malaysian</MenuItem>
                            <MenuItem value="Malian">Malian</MenuItem>
                            <MenuItem value="Maltese">Maltese</MenuItem>
                            <MenuItem value="Mexican">Mexican</MenuItem>
                            <MenuItem value="Mongolian">Mongolian</MenuItem>
                            <MenuItem value="Moroccan">Moroccan</MenuItem>
                            <MenuItem value="Mozambican">Mozambican</MenuItem>
                            <MenuItem value="Namibian">Namibian</MenuItem>
                            <MenuItem value="Nepalese">Nepalese</MenuItem>
                            <MenuItem value="Dutch">Dutch</MenuItem>
                            <MenuItem value="New Zealand">New Zealand</MenuItem>
                            <MenuItem value="Nicaraguan">Nicaraguan</MenuItem>
                            <MenuItem value="Nigerian">Nigerian</MenuItem>
                            <MenuItem value="Norwegian">Norwegian</MenuItem>
                            <MenuItem value="Pakistani">Pakistani</MenuItem>
                            <MenuItem value="Panamanian">Panamanian</MenuItem>
                            <MenuItem value="Paraguayan">Paraguayan</MenuItem>
                            <MenuItem value="Peruvian">Peruvian</MenuItem>
                            <MenuItem value="Philippine">Philippine</MenuItem>
                            <MenuItem value="Polish">Polish</MenuItem>
                            <MenuItem value="Portuguese">Portuguese</MenuItem>
                            <MenuItem value="Romanian">Romanian</MenuItem>
                            <MenuItem value="Russian">Russian</MenuItem>
                            <MenuItem value="Saudi">Saudi</MenuItem>
                            <MenuItem value="Scottish">Scottish</MenuItem>
                            <MenuItem value="Senegalese">Senegalese</MenuItem>
                            <MenuItem value="Serbian">Serbian</MenuItem>
                            <MenuItem value="Singaporean">Singaporean</MenuItem>
                            <MenuItem value="Slovak">Slovak</MenuItem>
                            <MenuItem value="South African">South African</MenuItem>
                            <MenuItem value="Spanish">Spanish</MenuItem>
                            <MenuItem value="Sri Lankan">Sri Lankan</MenuItem>
                            <MenuItem value="Sudanese">Sudanese</MenuItem>
                            <MenuItem value="Swedish">Swedish</MenuItem>
                            <MenuItem value="Swiss">Swiss</MenuItem>
                            <MenuItem value="Syrian">Syrian</MenuItem>
                            <MenuItem value="Taiwanese">Taiwanese</MenuItem>
                            <MenuItem value="Tajikistani">Tajikistani</MenuItem>
                            <MenuItem value="Thai">Thai</MenuItem>
                            <MenuItem value="Tongan">Tongan</MenuItem>
                            <MenuItem value="Tunisian">Tunisian</MenuItem>
                            <MenuItem value="Turkish">Turkish</MenuItem>
                            <MenuItem value="Ukrainian">Ukrainian</MenuItem>
                            <MenuItem value="Uruguayan">Uruguayan</MenuItem>
                            <MenuItem value="Venezuelan">Venezuelan</MenuItem>
                            <MenuItem value="Vietnamese">Vietnamese</MenuItem>
                            <MenuItem value="Welsh">Welsh</MenuItem>
                            <MenuItem value="Zambian">Zambian</MenuItem>
                            <MenuItem value="Zimbabwean">Zimbabwean</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField type="text" label="Home Address" variant="outlined" helperText={home_address_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "homeAddress") }} multiline />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField type="text" label="Contact Number" variant="outlined" helperText={contact_number_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "contactNumber") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField type="email" label="Email Id" variant="outlined" helperText={email_id_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "emailId") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <label htmlFor="profile_pic">
                            <TextField id="profile_pic" style={{ display: 'none' }} type="file" label="Profile Picture" variant="outlined" helperText={profile_pic_error_text} InputLabelProps={{ shrink: true }} fullWidth onChange={e => { changeValue(e, "profilePic") }} />
                            <Button color="primary" variant="contained" component="span" fullWidth style={{ background: '#17b0ab', fontWeight: 'bold' }}>
                                Upload Profile Picture
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField type="password" label="Password" variant="outlined" helperText={password_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "password") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField type="password" label="Confirm Password" variant="outlined" helperText={confirm_password_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "confirmPassword") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Button color="primary" variant="contained" component="span" fullWidth style={{ background: '#17b0ab', fontWeight: 'bold' }} onClick={e => { register(e) }}>Register</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Link to="/doctor" style={{ color: '#17b0ab', fontWeight: 'bold', textDecoration: 'none' }}>Already registered? Login here</Link>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default DoctorRegister;