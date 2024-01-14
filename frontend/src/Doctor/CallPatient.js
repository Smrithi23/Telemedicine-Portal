import React, { useEffect, useState, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Container, Tabs, Tab, TextField, Grid, Box, Button, MenuItem, Paper, Typography, AppBar, TableCell, TableRow, TableBody, TableContainer, Table } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MedicalRecordCard from './MedicalRecordDescriptionCard';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import io from 'socket.io-client';
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

function Call(props) {
  const [auth, setAuth] = useState('');
  let history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const [diagnosis, setDiagnosis] = useState('');
  const [medication, setMedication] = useState('');
  const [diagnosis_error_text, set_diagnosis_error_text] = useState(null);
  const [medication_error_text, set_medication_error_text] = useState(null);
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const userVideo = useRef();
  const partnerVideo = useRef();
  const joinButton = useRef();

  const [doctor, setDoctor] = useState(props.match.params.doctor_id);
  const [patient, setPatient] = useState(props.match.params.patient_id);
  const [appointment, setAppointment] = useState(props.match.params.appointment_id);
  const [video_switch, set_video_switch] = useState(false);
  const [audio_switch, set_audio_switch] = useState(false);
  const [data, setData] = useState("");

  function changeValue(e, type) {
    const value = e.target.value;
    if (type === "diagnosis") {
      setDiagnosis(value);
    } else if (type === "medication") {
      setMedication(value);
    }
  }

  const streamConstraints = {
    audio: true,
    video: true
  }

  useEffect(() => {
    console.log(doctor, patient);
    let token = sessionStorage.getItem('token');
    axios.get(config.baseURL + "/doctor/auth/", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      console.log(response);
      if (response.data.message === "true") {
        setAuth(true);
      }
    }).catch(e => {
      history.replace({ pathname: '/doctor' });
      window.location.reload();
    })
    axios.get(config.baseURL + "/doctor/patientdetails/" + appointment + "/" + patient + "/", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      console.log(response.data);
      setData(response.data);
      console.log(data);
    }).catch(e => {
      history.replace({ pathname: '/doctor' });
      window.location.reload();
    })

  }, []);

  function mute() {
    set_audio_switch(!audio_switch);
    console.log(userVideo)
    if(audio_switch) {
      userVideo.current.srcObject.getAudioTracks()[0].enabled = audio_switch;
      // userVideo.current.srcObject.getAudioTracks()[0].stop();
      // userVideo.muted = audio_switch
    } else {
      userVideo.current.srcObject.getAudioTracks()[0].enabled = audio_switch;
      // userVideo.muted = audio_switch
    }
  }

  function stop_video() {
    set_video_switch(!video_switch);
    console.log(userVideo)
    if(video_switch) {
      userVideo.current.srcObject.getVideoTracks()[0].enabled = video_switch;
      // userVideo.current.srcObject.getVideoTracks()[0].stop();
    } else {
      userVideo.current.srcObject.getVideoTracks()[0].enabled = video_switch;
    }
  }
  let roomNumber, rtcPeerConnection, isCaller;
  function submit() {
    let error = 0;
    if (diagnosis === "") {
      set_diagnosis_error_text("Enter the diagnosis");
      error = 1;
    } else {
      set_diagnosis_error_text(null);
    }
    if (medication === "") {
      set_medication_error_text("Enter the medication");
      error = 1;
    } else {
      set_medication_error_text(null);
    }
    if (error === 0) {
      const formdata = new FormData();
      formdata.append('diagnosis', diagnosis);
      formdata.append('medication', medication);
      formdata.append('appointment_id', appointment);
      let token = sessionStorage.getItem('token');
      axios.post(config.baseURL + "/doctor/createmedicalrecord/" + appointment + "/", formdata, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(res => {
        roomNumber = appointment + doctor;
        socket.emit('call over', roomNumber);
        handleClickOpen();
      })
      .catch(error => {
        handleErrorClickOpen();
      });
    }
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.replace({ pathname: '/doctor/dashboard' });
    window.location.reload();
  };

  const [errorOpen, setErrorOpen] = React.useState(false);

  const handleErrorClickOpen = () => {
    setErrorOpen(true);
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  const iceServers = {
    'iceServer': [
      { 'urls': 'stun:stun.services.mozilla.com' },
      { 'urls': 'stun:stun.l.google.com:19302' }
    ]
  }

  const socket = io(config.signallingURL);

  function joinRoom() {
    roomNumber = appointment + doctor;
    console.log("Join Room Number: ", roomNumber);
    socket.emit('create or join', roomNumber);
    // socket.emit('created', roomNumber);
  }

  socket.on('call over', room => {
    console.log(userVideo)
    userVideo.current.srcObject.getTracks()[0].stop();
    userVideo.current.srcObject.getTracks()[1].stop();
    rtcPeerConnection.close();
    
  })

  socket.on('created', room => {
    navigator.mediaDevices.getUserMedia(streamConstraints)
      .then(stream => {
        setLocalStream(stream);
        userVideo.current.srcObject = stream;
        console.log(userVideo)
        isCaller = true;
        joinButton.current.style.display = 'none';
      })
      .catch(err => {
        console.log('An error occured', err);
      })
  })

  socket.on('joined', room => {
    navigator.mediaDevices.getUserMedia(streamConstraints)
      .then(stream => {
        setLocalStream(stream);
        userVideo.current.srcObject = stream;
        console.log(userVideo)
        socket.emit('ready', roomNumber);
        joinButton.current.style.display = 'none';
      })
      .catch(err => {
        console.log('An error occured', err);
      })
  })

  socket.on('ready', () => {
    if (isCaller) {
      rtcPeerConnection = new RTCPeerConnection(iceServers);
      rtcPeerConnection.onicecandidate = onIceCandidate
      rtcPeerConnection.ontrack = onAddStream
      rtcPeerConnection.addTrack(userVideo.current.srcObject.getTracks()[0], userVideo.current.srcObject)
      rtcPeerConnection.addTrack(userVideo.current.srcObject.getTracks()[1], userVideo.current.srcObject)
      rtcPeerConnection.createOffer()
        .then(sessionDescription => {
          rtcPeerConnection.setLocalDescription(sessionDescription);
          socket.emit('offer', {
            type: 'offer',
            sdp: sessionDescription,
            room: roomNumber
          })
        })
        .catch(err => {
          console.log('An error occured', err);
        })
    }
  })

  socket.on('offer', (event) => {
    if (!isCaller) {
      rtcPeerConnection = new RTCPeerConnection(iceServers);
      rtcPeerConnection.onicecandidate = onIceCandidate
      rtcPeerConnection.ontrack = onAddStream
      rtcPeerConnection.addTrack(userVideo.current.srcObject.getTracks()[0], userVideo.current.srcObject)
      rtcPeerConnection.addTrack(userVideo.current.srcObject.getTracks()[1], userVideo.current.srcObject)
      rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))
      rtcPeerConnection.createAnswer()
        .then(sessionDescription => {
          rtcPeerConnection.setLocalDescription(sessionDescription);
          socket.emit('answer', {
            type: 'answer',
            sdp: sessionDescription,
            room: roomNumber
          })
        })
        .catch(err => {
          console.log('An error occured', err);
        })
    }
  })

  socket.on('answer', event => {
    rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event));
  })

  socket.on('candidate', event => {
    const candidate = new RTCIceCandidate({
      sdpMLineIndex: event.label,
      candidate: event.candidate
    })
    rtcPeerConnection.addIceCandidate(candidate);
  })

  function onAddStream(event) {
    setRemoteStream(event.streams[0]);
    partnerVideo.current.srcObject = event.streams[0];
  }

  function onIceCandidate(event) {
    if (event.candidate) {
      console.log('sending ice candidate', event.candidate);
      socket.emit('candidate', {
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate,
        room: roomNumber
      })
    }
  }

  // USER VIDEO
  let UserVideo;
  if (localStream) {
    UserVideo = (
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <video style={{ height: '30vh', width: '30vw', minWidth: '125px', minHeight: '125px' }} playsInline muted ref={userVideo} autoPlay />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {audio_switch
              ? <Button onClick={() => mute()}><MicOffIcon /></Button>
              : <Button onClick={() => mute()}><MicIcon /></Button>
            }
            {video_switch
              ? <Button onClick={() => stop_video()}><VideocamOffIcon /></Button>
              : <Button onClick={() => stop_video()}><VideocamIcon /></Button>
            }
          </div>
        </Grid>
      </Grid>
    );
  }

  // PARTNER VIDEO
  let PartnerVideo;
  if(remoteStream) {
    PartnerVideo = (
      <video style={{ height: '30vh', width: '30vw', minWidth: '125px', minHeight: '125px' }} playsInline ref={partnerVideo} autoPlay />
    );
  }

  if (data) {
    return (
      <Box>
        <Box>
          <Box style={{ background: 'linear-gradient(45deg, #EEE 30%, #DDD 90%)', minHeight: '100vh', width: '100%' }}>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Prescription"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Prescription submitted
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  OK
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={errorOpen}
              onClose={handleErrorClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Couldnt submit prescription
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleErrorClose} color="primary">
                  OK
                </Button>
              </DialogActions>
            </Dialog>
            <Grid container style={{ minHeight: '100vh', width: '100%' }}>
              <Grid container item xs={12} sm={12} md={12} lg={12} style={{ minHeight: '50px', height: '8vh', background: '#ffffff' }}>
                <Grid item xs={6} sm={4} md={2} lg={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/telemedicine_logo.png" alt="logo" style={{ height: '50px', minWidth: '130px' }} />
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12} md={12} lg={12} style={{ background: '#293447' }}>
                <Box style={{ maxWidth: '85em', width: '90vw' }}>
                  <Button style={{ color: '#FFFFFF', fontWeight: 'bold' }} onClick={() => {history.goBack(); socket.emit('call over', roomNumber);}}>
                    <ArrowBackIcon />
                  </Button>
                </Box>
              </Grid>
              <Grid container item xs={12} sm={12} md={12} lg={12}>
                <Grid container item xs={12} sm={12} md={4} lg={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxHeight: '80vh' }}>
                  <Grid item xs={6} sm={6} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {UserVideo}
                  </Grid>
                  <Grid item xs={6} sm={6} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box>
                      {PartnerVideo}
                      <Button ref={joinButton} style={{ margin: '1em', width: '10em', background: '#293447', color: '#FFFFFF', fontWeight: 'bold' }} onClick={() => joinRoom()}>Join Room</Button>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container item xs={12} sm={12} md={8} lg={8}>
                  <Grid item xs={12} sm={12} md={12} lg={12} style={{ minHeight: '100vh', borderLeft: '2px solid #999' }}>
                    <AppBar position="static" color="default">
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                      >
                        <Tab label="Symptoms" {...a11yProps(0)} />
                        <Tab label="Medical History" {...a11yProps(1)} />
                        <Tab label="Prescription" {...a11yProps(2)} />
                      </Tabs>
                    </AppBar>
                    <SwipeableViews
                      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                      index={value}
                      onChangeIndex={handleChangeIndex}
                    >
                      <TabPanel value={value} index={0} dir={theme.direction} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box>
                          <Box>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                              Medical Symptoms
                            </Typography>
                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '27em', width: '90vw' }}>
                              <Table aria-label="simple table">
                                <TableBody>
                                  <TableRow>
                                    <TableCell align="left">Symptoms</TableCell>
                                    <TableCell align="left">{data.appointment_details.symptoms}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="left">Duration</TableCell>
                                    <TableCell align="left">{data.appointment_details.duration}</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Box>
                          <Box>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                              Vital Signs
                            </Typography>
                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '27em', width: '90vw' }}>
                              <Table aria-label="simple table">
                                <TableBody>
                                  <TableRow>
                                    <TableCell align="left">Height</TableCell>
                                    <TableCell align="left">{data.appointment_details.height} feet</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="left">Weight</TableCell>
                                    <TableCell align="left">{data.appointment_details.weight} kg</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="left">Temperature</TableCell>
                                    <TableCell align="left">{data.appointment_details.temperature} degree celsius</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="left">Pulse Rate</TableCell>
                                    <TableCell align="left">{data.appointment_details.pulse_rate}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="left">Blood Pressure Systolic</TableCell>
                                    <TableCell align="left">{data.appointment_details.blood_pressure_systolic}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="left">Blood Pressure Diastolic</TableCell>
                                    <TableCell align="left">{data.appointment_details.blood_pressure_diastolic}</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Box>
                          <Box>
                            <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                              Medical History
                            </Typography>
                            <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '27em', width: '90vw' }}>
                              <Table aria-label="simple table">
                                <TableBody>
                                  <TableRow>
                                    <TableCell align="left">Surgeries in the past</TableCell>
                                    <TableCell align="left">{data.patient_details.surgeries_in_past}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="left">Pre Medical Conditions</TableCell>
                                    <TableCell align="left">{data.patient_details.pre_medical_conditions}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="left">Allergies</TableCell>
                                    <TableCell align="left">{data.patient_details.allergies}</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Box>
                        </Box>
                      </TabPanel>
                      <TabPanel value={value} index={1} dir={theme.direction} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box>
                          <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                            Medical Records
                        </Typography>
                          {data.medical_record.length
                            ? data.medical_record.map(record =>
                              <MedicalRecordCard first_name={record.doctor_first_name} last_name={record.doctor_last_name} department={record.department} date={record.date} time={record.time} symptoms={record.symptoms} diagnosis={record.diagnosis} treatment={record.treatment} />
                            )
                            : <div>No Medical Records</div>
                          }
                        </Box>
                      </TabPanel>
                      <TabPanel value={value} index={2} dir={theme.direction} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box>
                          <Typography style={{ color: '#293447', fontWeight: 'bold', fontSize: '1.25em', marginTop: '1em' }}>
                            Prescription
                          </Typography>
                          <Grid container spacing={3} style={{ marginTop: '1em', background: '#ffffff', padding: '0.5em', borderRadius: '3px' }}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <TextField type="text" label="Diagnosis" variant="outlined" InputLabelProps={{ shrink: true }} helperText={diagnosis_error_text} fullWidth required multiline onChange={e => changeValue(e, 'diagnosis')} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <TextField type="text" label="Medication" variant="outlined" InputLabelProps={{ shrink: true }} helperText={medication_error_text} fullWidth required multiline onChange={e => changeValue(e, 'medication')} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <Button onClick={(e) => submit()} style={{ margin: '1em', width: '10em', background: '#293447', color: '#FFFFFF', fontWeight: 'bold' }}>Submit</Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </TabPanel>
                    </SwipeableViews>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
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

export default Call;