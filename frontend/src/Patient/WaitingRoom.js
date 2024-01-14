import React, { useEffect, useState, useRef } from 'react';
import { TextField, Grid, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import io from "socket.io-client";
import styled from "styled-components";
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import config from '../Config/config';

function Call(props) {
  const history = useHistory();

  const userVideo = useRef();
  const partnerVideo = useRef();
  const feedbackRef = useRef();
  const joinButton = useRef();

  const [doctor, setDoctor] = useState(props.match.params.doctor_id);
  const [patient, setPatient] = useState(props.match.params.patient_id);
  const [appointment, setAppointment] = useState(props.match.params.appointment_id);
  const [video_switch, set_video_switch] = useState(false);
  const [audio_switch, set_audio_switch] = useState(false);

  const [rating, set_rating] = useState('');
  const [feedback, set_feedback] = useState('');
  const [rating_error_text, set_rating_error_text] = useState('');
  const [feedback_error_text, set_feedback_error_text] = useState('');
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  function changeValue(e, type) {
    const value = e.target.value;
    if (type === "rating") {
      set_rating(value);
    } else if (type === "feedback") {
      set_feedback(value);
    }
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.replace({ pathname: '/patient/dashboard' });
    window.location.reload();
  };

  const [errorOpen, setErrorOpen] = React.useState(false);

  const handleErrorClickOpen = () => {
    setErrorOpen(true);
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  function submitFeedback() {
    let error = 0;
    if (feedback === '') {
      set_feedback_error_text("Enter feedback");
      error = 1;
    } else {
      set_feedback_error_text(null);
    }
    console.log(error);
    if (error === 0) {
      const formdata = new FormData();
      formdata.append('rating', rating);
      formdata.append('feedback', feedback);
      let token = sessionStorage.getItem('token');
      axios.post(config.baseURL + "/patient/feedback/" + appointment + "/" + doctor + "/" + patient + "/", formdata, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(res => {
        handleClickOpen();
      })
        .catch(error => {
          handleErrorClickOpen();
        });
    }
  }

  let token = sessionStorage.getItem('token');
  const [auth, setAuth] = useState('');

  useEffect(() => {
    console.log(doctor, patient);
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
      history.replace({ pathname: '/patient' });
      window.location.reload();
    })
  }, []);

  function mute() {
    set_audio_switch(!audio_switch);
    userVideo.current.srcObject.getAudioTracks()[0].enabled = audio_switch;
  }

  function stop_video() {
    set_video_switch(!video_switch);
    userVideo.current.srcObject.getVideoTracks()[0].enabled = video_switch;
  }

  const streamConstraints = {
    audio: true,
    video: true
  }

  let roomNumber, rtcPeerConnection, isCaller;

  const iceServers = {
    'iceServer': [
      { 'urls': 'stun:stun.services.mozilla.com' },
      { 'urls': 'stun:stun.l.google.com:19302' }
    ]
  }

  const socket = io(config.signallingURL);

  function joinRoom() {
    roomNumber = appointment + doctor;
    console.log('join')
    socket.emit('create or join', roomNumber);
    // socket.emit('created', roomNumber);
  }

  socket.on('stop', () => {
    console.log("stop");
    userVideo.current.srcObject = '';
    joinButton.current.style.display = 'inline';
  })

  socket.on('call over', () => {
    console.log("call over");
    userVideo.current.srcObject.getTracks()[0].stop();
    userVideo.current.srcObject.getTracks()[1].stop();
    feedbackRef.current.style.display = 'flex';
    rtcPeerConnection.close();
  })

  socket.on('created', room => {
    console.log(navigator)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(streamConstraints)
        .then(stream => {
          setLocalStream(stream);
          userVideo.current.srcObject = stream;
          joinButton.current.style.display = 'none';
          isCaller = true;
        })
        .catch(err => {
          console.log('An error occured', err);
        })
    };
  })

  socket.on('joined', room => {
    console.log(navigator)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(streamConstraints)
      .then(stream => {
        setLocalStream(stream);
        userVideo.current.srcObject = stream;
        socket.emit('ready', roomNumber);
        joinButton.current.style.display = 'none';
      })
      .catch(err => {
        console.log('An error occured', err);
      })
    }
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
      <Grid container style={{ width: '50vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid item>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <video style={{ height: '30vh', width: '30vw', minWidth: '230px', minHeight: '230px' }} playsInline muted ref={userVideo} autoPlay />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
  if (remoteStream) {
    PartnerVideo = (
      <video style={{ height: '30vh', width: '30vw', minWidth: '230px', minHeight: '230px' }} playsInline ref={partnerVideo} autoPlay />
    );
  }

  return (
    <Box>
      <Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Feedback"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Feedback submitted
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
              Couldnt submit feedback
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleErrorClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Grid container>
          <Grid container item xs={12} sm={12} md={12} lg={12} style={{ minHeight: '50px', height: '8vh', background: '#ffffff' }}>
            <Grid item xs={6} sm={4} md={2} lg={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/telemedicine_logo.png" alt="logo" style={{ height: '50px', minWidth: '130px' }} />
            </Grid>
          </Grid>
          <Grid container item xs={12} sm={12} md={12} lg={12} style={{ background: '#293447' }}>
            <Box style={{ maxWidth: '85em', width: '90vw' }}>
              <Button style={{ color: '#FFFFFF', fontWeight: 'bold' }} onClick={() => { history.goBack(); socket.emit('call over', roomNumber); }}>
                <ArrowBackIcon />
              </Button>
            </Box>
          </Grid>
          <Grid container item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1em' }}>
              <Button ref={joinButton} style={{ margin: '1em', width: '10em', background: '#293447', color: '#FFFFFF', fontWeight: 'bold' }} onClick={() => joinRoom()}>Join Room</Button>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1em' }}>
              {UserVideo}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1em' }}>
              {PartnerVideo}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <div ref={feedbackRef} style={{ display: 'none', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '0', left: '0', height: '100vh', width: '100vw', background: 'rgba(0, 0, 0, 0.3' }}>
          <div style={{ padding: '2em', background: '#FFFFFF', textAlign: 'center' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography>Enter Your Feedback</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Rating name="simple-controlled" value={rating} onChange={e => changeValue(e, 'rating')} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField type="text" label="Feedback" variant="outlined" helperText={rating_error_text} InputLabelProps={{ shrink: true }} fullWidth required onChange={e => changeValue(e, 'feedback')} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Button style={{ margin: '1em', width: '10em', background: '#293447', color: '#FFFFFF', fontWeight: 'bold' }} onClick={submitFeedback}>Submit</Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default Call;