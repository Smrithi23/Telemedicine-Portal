import React from 'react';
import { Avatar, TableContainer, TableCell, Table, TableRow, Paper, TableBody } from '@material-ui/core';
import config from '../Config/config';

function ViewProfile(props) {
    let profile_pic = config.baseURL + props.profile.profile_pic;
    return (
        <TableContainer component={Paper} style={{ marginTop: '1em', marginBottom: '2em', maxWidth: '40em', width: '90vw' }}>
            <Table aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <Avatar style={{ width: '4em', height: '4em', margin: '1em' }}>
                            <img src={profile_pic} style={{ width: '4em', height: '4em' }} alt="profile" />
                        </Avatar>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">First Name</TableCell>
                        <TableCell align="left">{props.profile.first_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Last Name</TableCell>
                        <TableCell align="left">{props.profile.last_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Gender</TableCell>
                        <TableCell align="left">{props.profile.gender}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Date of Birth</TableCell>
                        <TableCell align="left">{props.profile.dob}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Department</TableCell>
                        <TableCell align="left">{props.profile.department}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Specialization</TableCell>
                        <TableCell align="left">{props.profile.specialization}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Registration Number</TableCell>
                        <TableCell align="left">{props.profile.registration_number}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Years of Experience</TableCell>
                        <TableCell align="left">{props.profile.years_of_experience}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Hospital</TableCell>
                        <TableCell align="left">{props.profile.hospital}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Hospital Address</TableCell>
                        <TableCell align="left">{props.profile.hospital_address}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Consulting Start Time</TableCell>
                        <TableCell align="left">{props.profile.start_hours} : {props.profile.start_minutes}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Consulting End Time</TableCell>
                        <TableCell align="left">{props.profile.end_hours} : {props.profile.end_minutes}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Nationality</TableCell>
                        <TableCell align="left">{props.profile.nationality}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Home Address</TableCell>
                        <TableCell align="left">{props.profile.home_address}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Contact Number</TableCell>
                        <TableCell align="left">{props.profile.contact_number}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Email Address</TableCell>
                        <TableCell align="left">{props.profile.email}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ViewProfile;