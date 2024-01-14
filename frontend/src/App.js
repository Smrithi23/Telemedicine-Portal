import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import './App.css';

import Home from './Common/Home';

import PatientRegister from './Patient/PatientRegister';
import PatientLogin from './Patient/PatientLogin';
import PatientDashboard from './Patient/PatientDashBoard';
import PATIENT_DASHBOARD from './Patient/Dashboard';
import PATIENT_BOOKAPPOINTMENT from './Patient/BookAppointment';
import PATIENT_MEDICALRECORDS from './Patient/MedicalRecords';
import PATIENT_PROFILE from './Patient/Profile';
import PatientViewMedicalRecord from './Patient/ViewMedicalRecord';
import WaitingRoom from './Patient/WaitingRoom';
import BookAppointmentForm from './Patient/BookAppointmentForm';


import DoctorRegister from './Doctor/DoctorRegister';
import DoctorLogin from './Doctor/DoctorLogin';
import DoctorDashboard from './Doctor/DoctorDashboard';
import DOCTOR_DASHBOARD from './Doctor/Dashboard';
import DOCTOR_PROFILE from './Doctor/Profile';
import DOCTOR_MYRECORDS from './Doctor/MyRecords';
import AttendPatient from './Doctor/AttendPatient';
import AppointmentPatientDetails from './Doctor/AppointmentPatientDetails';
import DoctorViewMedicalRecord from './Doctor/ViewMedicalRecord';
import CallPatient from './Doctor/CallPatient';

function App() {
  return (
    <Router style={{ height: '100%', width: '100%' }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/doctor" component={DoctorLogin} />
        <Route exact path="/doctor/register" component={DoctorRegister} />
        <Route exact path="/doctor/dashboard" component={() => <DoctorDashboard comp={<DOCTOR_DASHBOARD />} val={0} />} />
        <Route exact path="/doctor/myrecords" component={() => <DoctorDashboard comp={<DOCTOR_MYRECORDS />} val={1} />} />
        <Route exact path="/doctor/profile" component={() => <DoctorDashboard comp={<DOCTOR_PROFILE />} val={2} />} />
        <Route exact path="/doctor/attendpatient" component={AttendPatient} />
        <Route exact path="/doctor/patientdetails" component={AppointmentPatientDetails} />
        <Route exact path="/doctor/viewmedicalrecord/:id" component={DoctorViewMedicalRecord} />
        <Route exact path="/patient" component={PatientLogin} />
        <Route exact path="/patient/register" component={PatientRegister} />
        <Route exact path="/patient/dashboard" component={() => <PatientDashboard comp={<PATIENT_DASHBOARD />} val={0} />} />
        <Route exact path="/patient/bookappointment" component={() => <PatientDashboard comp={<PATIENT_BOOKAPPOINTMENT />} val={1} />} />
        <Route exact path="/patient/medicalrecords" component={() => <PatientDashboard comp={<PATIENT_MEDICALRECORDS />} val={2} />} />
        <Route exact path="/patient/profile" component={() => <PatientDashboard comp={<PATIENT_PROFILE />} val={3} />} />
        <Route exact path="/patient/medicalrecord/:id" component={PatientViewMedicalRecord} />
        <Route exact path="/patient/waitingroom" component={WaitingRoom} />
        <Route exact path="/patient/bookappointmentform/:id" component={BookAppointmentForm} />
        <Route exact path="/doctor/call/:appointment_id/:doctor_id/:patient_id" component={CallPatient} />
        <Route exact path="/patient/call/:appointment_id/:doctor_id/:patient_id" component={WaitingRoom} />
      </Switch>
    </Router>
  );
}

export default App;