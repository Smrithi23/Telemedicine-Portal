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
                        <TableCell align="left">Occupation</TableCell>
                        <TableCell align="left">{props.profile.occupation}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Nationality</TableCell>
                        <TableCell align="left">{props.profile.nationality}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Height</TableCell>
                        <TableCell align="left">{props.profile.height} feet</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Weight</TableCell>
                        <TableCell align="left">{props.profile.weight} kg</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Blood Group</TableCell>
                        <TableCell align="left">{props.profile.blood_group}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Contact Number</TableCell>
                        <TableCell align="left">{props.profile.contact_number}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Home Address</TableCell>
                        <TableCell align="left">{props.profile.home_address}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Email Address</TableCell>
                        <TableCell align="left">{props.profile.email}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Pre medical conditions</TableCell>
                        <TableCell align="left">{props.profile.pre_medical_conditions}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Surgeries in the past</TableCell>
                        <TableCell align="left">{props.profile.surgeries_in_past}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Allergies</TableCell>
                        <TableCell align="left">{props.profile.allergies}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ViewProfile;