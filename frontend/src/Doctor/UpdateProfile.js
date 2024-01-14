import React, { useState } from 'react';
import { Typography, TextField, Grid, Box, Button, MenuItem, Paper, DialogContent, DialogContentText, DialogActions, Dialog, DialogTitle } from '@material-ui/core';
import axios from 'axios';
import config from '../Config/config';

function UpdateProfile(props) {

    const [firstName, setFirstName] = useState(props.profile.first_name);
    const [lastName, setLastName] = useState(props.profile.last_name);
    const [gender, setGender] = useState(props.profile.gender);
    const [dob, setDob] = useState(props.profile.dob);
    const [department, setDepartment] = useState(props.profile.department);
    const [specialization, setSpecialization] = useState(props.profile.specialization);
    const [registrationNumber, setRegistrationNumber] = useState(props.profile.registration_number);
    const [yearsOfExperience, setYearsOfExperience] = useState(props.profile.years_of_experience);
    const [hospital, setHospital] = useState(props.profile.hospital);
    const [hospitalAddress, setHospitalAddress] = useState(props.profile.hospital_address);
    const [startHours, setStartHours] = useState(props.profile.start_hours);
    const [startMinutes, setStartMinutes] = useState(props.profile.start_minutes);
    const [endHours, setEndHours] = useState(props.profile.end_hours);
    const [endMinutes, setEndMinutes] = useState(props.profile.end_minutes);
    const [nationality, setNationality] = useState(props.profile.nationality);
    const [homeAddress, setHomeAddress] = useState(props.profile.home_address);
    const [contactNumber, setContactNumber] = useState(props.profile.contact_number);
    const [profilePic, setProfilePic] = useState(props.profile.profile_pic);
    const [password, setPassword] = useState('');
    const [messageHeader, setMessageHeader] = useState('');
    const [messageBody, setMessageBody] = useState('');

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
    const [nationality_error_text, set_nationality_error_text] = useState(null);
    const [home_address_error_text, set_home_address_error_text] = useState(null);
    const [contact_number_error_text, set_contact_number_error_text] = useState(null);
    const [profile_pic_error_text, set_profile_pic_error_text] = useState(null);
    const [password_error_text, set_password_error_text] = useState(null);

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
        }  else if (type === "startMinutes") {
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
        } else if (type === "profilePic") {
            setProfilePic(e.target.files[0]);
        } else if (type === "password") {
            setPassword(value);
        }
    }

    function updateProfile(e) {
        let error = 0;
        if (firstName === '') {
            error = 1;
            set_first_name_error_text("Enter first name");
        } else {
            set_first_name_error_text(null);
        }
        if (lastName === '') {
            error = 1;
            set_last_name_error_text("Enter last name");
        } else {
            set_last_name_error_text(null);
        }
        if (gender === '') {
            error = 1;
            set_gender_error_text("Select gender");
        } else {
            set_gender_error_text(null);
        }
        if (dob === '') {
            error = 1;
            set_dob_error_text("Enter date of birth");
        } else {
            set_dob_error_text(null);
        }
        if (department === '') {
            error = 1;
            set_department_error_text("Select department");
        } else {
            set_department_error_text(null);
        }
        if (specialization === '') {
            error = 1;
            set_specialization_error_text("Enter specialization");
        } else {
            set_specialization_error_text(null);
        }
        if (registrationNumber === '') {
            error = 1;
            set_registration_number_error_text("Enter registration number");
        } else {
            const number = /^[0-9]+$/;
            if (number.test(String(registrationNumber))) {
                set_registration_number_error_text(null)
            } else {
                error = 1;
                set_registration_number_error_text("Enter a valid registration number")
            }
        }
        if (yearsOfExperience === '') {
            error = 1;
            set_years_of_experience_error_text("Enter years of experience");
        } else {
            set_years_of_experience_error_text(null);
        }
        if (hospital === '') {
            error = 1;
            set_hospital_error_text("Enter hospital");
        } else {
            set_hospital_error_text(null);
        }
        if (hospitalAddress === '') {
            error = 1;
            set_hospital_address_error_text("Enter hospital address");
        } else {
            set_hospital_address_error_text(null);
        }
        if (startHours === '') {
            error = 1;
            set_start_hours_error_text("Select start hours");
        } else {
            set_start_hours_error_text(null);
        }
        if (startMinutes === '') {
            error = 1;
            set_start_minutes_error_text("Select start minutes");
        } else {
            set_start_minutes_error_text(null);
        }
        if (endHours === '') {
            error = 1;
            set_end_hours_error_text("Select end hours");
        } else {
            set_end_hours_error_text(null);
        }
        if (endMinutes === '') {
            error = 1;
            set_end_minutes_error_text("Select end minutes");
        } else {
            set_end_minutes_error_text(null);
        }
        if (nationality === '') {
            error = 1;
            set_nationality_error_text("Select nationality");
        } else {
            set_nationality_error_text(null);
        }
        if (homeAddress === '') {
            error = 1;
            set_home_address_error_text("Enter home address");
        } else {
            set_home_address_error_text(null);
        }
        if (contactNumber === '') {
            error = 1;
            set_contact_number_error_text("Enter contact number");
        } else {
            set_contact_number_error_text(null);
        }
        if(error == 0) {
            let token = sessionStorage.getItem('token');
            const formdata = new FormData();
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
            formdata.append('home_address', homeAddress);
            formdata.append('contact_number', contactNumber);
            axios.post(config.baseURL + "/doctor/updateprofile/", formdata, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => {
                setMessageHeader("Profile Update");
                setMessageBody("Updated profile successfully");
                handleClickOpen();
                window.location.reload();
            }).catch(e => {
                setMessageHeader("Profile Update");
                setMessageBody("Couldn't update profile");
                handleClickOpen();
            });
        }
    }

    function updateProfilePic(e) {
        let error = 0;
        if (profilePic === '') {
            error = 1;
            set_profile_pic_error_text("Select Profile Picture");
        } else {
            set_profile_pic_error_text(null);
        }
        if(error == 0) {
            let token = sessionStorage.getItem('token');
            const formdata = new FormData();
            formdata.append('profile_pic', profilePic, profilePic.name);
            axios.post(config.baseURL + "/doctor/updateprofilepic/", formdata, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => {
                setMessageHeader("Profile Picture Update");
                setMessageBody("Updated profile picture successfully");
                handleClickOpen();
                window.location.reload();
            }).catch(e => {
                setMessageHeader("Profile Picture Update");
                setMessageBody("Couldn't update profile picture");
                handleClickOpen();
            });
        }
    }

    function updatePassword(e) {
        let error = 0;
        if (password === '') {
            error = 1;
            set_password_error_text("Enter password");
        } else {
            if (password.length > 8) {
                set_password_error_text(null);
            } else {
                set_password_error_text("Password must contain atleast 8 characters");
            }
        }
        if(error == 0) {
            let token = sessionStorage.getItem('token');
            const formdata = new FormData();
            formdata.append('password', password);
            axios.post(config.baseURL + "/doctor/updatepassword/", formdata, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => {
                setMessageHeader("Password Update");
                setMessageBody("Updated password successfully");
                handleClickOpen();
                window.location.reload();
            }).catch(e => {
                setMessageHeader("Password Update");
                setMessageBody("Couldn't update password");
                handleClickOpen();
            });
        }
    }

    return (
        <Box component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '40em', width: '90vw' }}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{messageHeader}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {messageBody}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                </Button>
                </DialogActions>
            </Dialog>
            <Grid container item xs={12} sm={12} md={12} lg={12} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30px', paddingBottom: '30px' }}>
                <Grid item container spacing={4} xs={11} sm={11} md={10} lg={10} style={{ background: '#ffffff', borderRadius: '5px' }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>Update Profile Details</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField defaultValue={props.profile.first_name} type="text" label="First Name" variant="outlined" helperText={first_name_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "firstName") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField defaultValue={props.profile.last_name} type="text" label="Last Name" variant="outlined" helperText={last_name_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "lastName") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField defaultValue={props.profile.gender} label="Gender" variant="outlined" select helperText={gender_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "gender") }}>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField defaultValue={props.profile.dob} type="date" label="Date of birth" variant="outlined" helperText={dob_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "dob") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField defaultValue={props.profile.department} label="Department" variant="outlined" select helperText={department_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "department") }}>
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
                        <TextField defaultValue={props.profile.specialization} type="text" label="Specialization" variant="outlined" helperText={specialization_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "specialization") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField defaultValue={props.profile.registration_number} type="number" label="Registration Number" variant="outlined" helperText={registration_number_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "registrationNumber") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField defaultValue={props.profile.years_of_experience} type="number" label="Years of Experience" variant="outlined" helperText={years_of_experience_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "yearsOfExperience") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField defaultValue={props.profile.hospital} type="text" label="Hospital" variant="outlined" helperText={hospital_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "hospital") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField defaultValue={props.profile.hospital_address} type="text" label="Hospital Address" variant="outlined" helperText={hospital_address_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "hospitalAddress") }} multiline />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <label>Consulting Start Time</label>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <TextField defaultValue={props.profile.start_hours} label="Hours" variant="outlined" select helperText={start_hours_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "startHours") }}>
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
                                <TextField label="Minutes" defaultValue={props.profile.start_minutes} variant="outlined" select helperText={start_minutes_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "startMinutes") }}>
                                    <MenuItem value={0}>00</MenuItem>
                                    <MenuItem value={30}>30</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <label>Consulting End Time</label>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <TextField defaultValue={props.profile.end_hours} label="Hours" variant="outlined" select helperText={end_hours_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "endHours") }}>
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
                                <TextField defaultValue={props.profile.end_minutes} label="Minutes" variant="outlined" select helperText={end_minutes_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "endMinutes") }}>
                                    <MenuItem value={0}>00</MenuItem>
                                    <MenuItem value={30}>30</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField defaultValue={props.profile.nationality} label="Nationality" variant="outlined" select helperText={nationality_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "nationality") }}>
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
                        <TextField defaultValue={props.profile.home_address} type="text" label="Home Address" variant="outlined" helperText={home_address_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "homeAddress") }} multiline />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField defaultValue={props.profile.contact_number} type="text" label="Contact Number" variant="outlined" helperText={contact_number_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "contactNumber") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Button color="primary" variant="contained" component="span" fullWidth style={{ background: '#17b0ab', fontWeight: 'bold' }} onClick={e => { updateProfile(e) }}>Update Profile Details</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>Update Profile Picture</Typography>
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
                        <Button color="primary" variant="contained" component="span" fullWidth style={{ background: '#17b0ab', fontWeight: 'bold' }} onClick={e => { updateProfilePic(e) }}>Update Profile Picture</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em' }}>Update Password</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField defaultValue="" type="password" label="Password" variant="outlined" helperText={password_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => { changeValue(e, "password") }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Button color="primary" variant="contained" component="span" fullWidth style={{ background: '#17b0ab', fontWeight: 'bold' }} onClick={e => { updatePassword(e) }}>Update Password</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default UpdateProfile;