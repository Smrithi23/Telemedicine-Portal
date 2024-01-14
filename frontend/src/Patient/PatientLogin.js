import React, { useState } from 'react';
import { Box, Grid, TextField, Button, DialogContent, DialogContentText, DialogTitle, Dialog, DialogActions } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../Config/config';

function PatientLogin() {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [email_error_text, set_email_error_text] = useState(null);
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
        if (type === "email") {
            setEmail(value);
        } else if (type === "password") {
            setPassword(value)
        }
    }
    function login(e) {
        let error = 0;
        if (email === "") {
            set_email_error_text("Enter email");
            error = 1;
        } else {
            const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            if (expression.test(String(email).toLowerCase())) {
                set_email_error_text(null);
            } else {
                set_email_error_text("Enter a valid email id");
                error = 1;
            }
        }
        if (password === "") {
            set_password_error_text("Enter password");
            error = 1;
        } else {
            set_password_error_text(null);
        }
        if (error === 0) {
            const formdata = new FormData();
            formdata.append('email', email);
            formdata.append('password', password);
            axios.post(config.baseURL + "/patient/login/", formdata, {
                headers: {
                    'content-type': 'multipart/form-data',
                }
            }).then(res => {
                sessionStorage.setItem('token', JSON.parse(res.request.response).token);
                console.log(res);
                history.push('/patient/dashboard');
            })
                .catch(error => {
                    handleClickOpen();
                    console.log(error.response);
                });
        }
    }
    return (
        <Grid container style={{ height: '100%', width: '100%' }}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Wrong Credentials"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Email or password is incorrect
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
            </Grid>
            <Grid container item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, #EEE 30%, #DDD 90%)', minHeight: '92vh' }}>
                <Grid container item spacing={3} xs={10} sm={6} md={4} lg={4} style={{ background: '#ffffff', borderRadius: '5px' }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box component="div" style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '30px', color: '#17b0ab' }}>
                            Patient Login
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField type="email" label="Email Id" variant="outlined" helperText={email_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => changeValue(e, 'email')} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField type="password" label="Password" variant="outlined" helperText={password_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => changeValue(e, 'password')} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Button color="primary" variant="contained" component="span" fullWidth style={{ background: '#17b0ab', fontWeight: 'bold' }} onClick={e => login(e)}>Login</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} fullWidth style={{ textAlign: 'center' }}>
                        <Link to='/patient/register' style={{ textDecoration: 'none', color: '#17b0ab', fontWeight: 'bold' }}>Not yet registered? Register here</Link>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default PatientLogin;