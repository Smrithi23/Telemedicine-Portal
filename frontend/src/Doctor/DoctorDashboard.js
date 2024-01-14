import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Typography, Grid, Box, Button, Tab, Tabs, List, ListItem, Drawer, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import config from '../Config/config';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import { createBrowserHistory } from 'history';
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
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

function DoctorDashboard(props) {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  let token = sessionStorage.getItem('token');
  const [data, setData] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [state, setState] = React.useState(false);

  useEffect(() => {
    axios.get(config.baseURL + "/doctor/auth/", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      console.log(response);
      if (response.data.message === "true") {
        setData(true);
      }
    })
      .catch(e => {
        history.replace({ pathname: '/doctor' });
        window.location.reload();
      })
  }, [token]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{ background: '#293447', height: '100%', color: '#ffffff' }}
    >
      <List>
        <ListItem button key="Dashboard" onClick={() => { history.replace({ pathname: '/doctor/dashboard' }); window.location.reload(); }}>
          <ListItemIcon>{<DashboardIcon style={{ color: '#1CD8D2' }} />}</ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button key="Prescription Records" onClick={() => { history.replace({ pathname: '/doctor/myrecords' }); window.location.reload(); }}>
          <ListItemIcon>{<LocalHospitalIcon style={{ color: '#1CD8D2' }} />}</ListItemIcon>
          <ListItemText primary="My Records" />
        </ListItem>
        <ListItem button key="Profile" onClick={() => { history.replace({ pathname: '/doctor/profile' }); window.location.reload(); }}>
          <ListItemIcon>{<LibraryBooksIcon style={{ color: '#1CD8D2' }} />}</ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </div>
  );

  if (data) {
    return (
      <Box style={{ width: '100%', minHeight: '100%', background: 'linear-gradient(45deg, #EEE 30%, #DDD 90%)' }}>
        <Box display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
          <Grid container>
            <Grid container item xs={12} sm={12} md={12} lg={12} style={{ minHeight: '50px', height: '8vh', background: '#ffffff' }}>
              <Grid item xs={6} sm={4} md={2} lg={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/telemedicine_logo.png" alt="logo" style={{ height: '50px', minWidth: '130px' }} />
              </Grid>
              <Grid item xs={3} sm={5} md={7} lg={7}></Grid>
              <Grid item xs={3} sm={3} md={3} lg={3} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <Button color="primary" variant="contained" component="span" style={{ background: '#17b0ab', fontWeight: 'bold' }} onClick={() => {sessionStorage.removeItem('token')}}>
                  <Link to="/" style={{ textDecoration: 'none', color: '#ffffff' }}>Logout</Link>
                </Button>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={12} md={12} lg={12} style={{ width: '100%' }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={props.val}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
                style={{ background: '#293447', color: '#ffffff', fontWeight: 'bold', minHeight: '92vh', width: '16em' }}
              >
                <Tab onClick={() => { history.replace({ pathname: '/doctor/dashboard' }); window.location.reload(); }} label={<div style={{ fontWeight: 'bold', paddingTop: '10px', paddingBottom: '10px' }}><DashboardIcon style={{ color: '#1CD8D2', paddingRight: '10px', verticalAlign: 'middle' }} />Dashboard</div>} {...a11yProps(0)} />
                <Tab onClick={() => { history.replace({ pathname: '/doctor/myrecords' }); window.location.reload(); }} label={<div style={{ fontWeight: 'bold', paddingTop: '10px', paddingBottom: '10px' }}><LocalHospitalIcon style={{ color: '#1CD8D2', paddingRight: '10px', verticalAlign: 'middle' }} />Appointment Records</div>} {...a11yProps(1)} />
                <Tab onClick={() => { history.replace({ pathname: '/doctor/profile' }); window.location.reload(); }} label={<div style={{ fontWeight: 'bold', paddingTop: '10px', paddingBottom: '10px' }}><LibraryBooksIcon style={{ color: '#1CD8D2', paddingRight: '10px', verticalAlign: 'middle' }} />Profile</div>} {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={props.val} index={0} style={{ width: 'calc(100vw - 18em)' }}>
                {props.comp}
              </TabPanel>
              <TabPanel value={props.val} index={1} style={{ width: 'calc(100vw - 18em)' }}>
                {props.comp}
              </TabPanel>
              <TabPanel value={props.val} index={2} style={{ width: 'calc(100vw - 18em)' }}>
                {props.comp}
              </TabPanel>
            </Grid>
          </Grid>
        </Box>
        <Box display={{ xs: 'block', sm: 'block', md: 'block', lg: 'none' }}>
          <Grid container>
            <Grid container item xs={12} sm={12} md={12} lg={12} style={{ background: '#ffffff', display: 'flex', minHeight: '50px', height: '8vh' }}>
              <Grid item xs={6} sm={4} md={2} lg={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/telemedicine_logo.png" alt="logo" style={{ height: '50px', minWidth: '130px' }} />
              </Grid>
              <Grid item xs={3} sm={5} md={7} lg={7}></Grid>
              <Grid item xs={3} sm={3} md={3} lg={3} style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <Button color="primary" variant="contained" component="span" style={{ background: '#17b0ab' }} onClick={() => {sessionStorage.removeItem('token')}}>
                  <Link to="/" style={{ textDecoration: 'none', color: '#ffffff' }}>Logout</Link>
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} style={{ background: '#37455e', color: '#ffffff', fontWeight: 'bold' }}>
              <div>
                <React.Fragment key={'Menu'}>
                  <Button onClick={toggleDrawer('Menu', true)} style={{ color: '#ffffff', fontWeight: 'bold' }}>Menu</Button>
                  <Drawer anchor='Menu' open={state['Menu']} onClose={toggleDrawer('Menu', false)}>
                    {list('Menu')}
                  </Drawer>
                </React.Fragment>
              </div>
            </Grid>
            <Grid container item xs={12} sm={12} md={12} lg={12} style={{ background: 'linear-gradient(45deg, #EEE 30%, #DDD 90%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {props.comp}
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

export default DoctorDashboard;