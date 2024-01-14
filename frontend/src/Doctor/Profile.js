import React, {useState, useEffect} from 'react';
import { Box, Typography, Tabs, Tab } from '@material-ui/core';
import ViewProfile from './ViewProfile';
import UpdateProfile from './UpdateProfile';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
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
    backgroundColor: "#ffffff",
    width: 500,
  },
}));

function Profile(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const [data, setData] = useState('');
  let token = sessionStorage.getItem('token');
  useEffect(() => {
    axios.get(config.baseURL + "/doctor/profile/", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      setData(response.data);
    })
      .catch(e => {
        history.replace({ pathname: '/doctor' });
        window.location.reload();
      })
  }, [token]);
  if(data) {
    return (
      <Box style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className={classes.root} style={{ maxWidth: '40em', width: '90vw' }}>
          <AppBar position="static" color="default" style={{ maxWidth: '40em', width: '90vw' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="View Profile" {...a11yProps(0)} />
              <Tab label="Update Profile" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
            style={{ maxWidth: '40em', width: '90vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <ViewProfile profile={data} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <UpdateProfile profile={data} />
            </TabPanel>
          </SwipeableViews>
        </div>
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

export default Profile;