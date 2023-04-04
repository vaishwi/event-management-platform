import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function ContactInformation(props) {
    const {contactInfo, handleChange} = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="firstName"
            label="First Name"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value = {contactInfo.firstName}
            onChange={(e) => handleChange(e, "firstName")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="lastName"
            label="Last Name"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value = {contactInfo.lastName}
            onChange={(e) => handleChange(e, "lastName")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="email"
            label="Email Address"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value = {contactInfo.email}
            onChange={(e) => handleChange(e, "email")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="phoneNumber"
            label="Phone Number"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value = {contactInfo.phoneNumber}
            onChange={(e) => handleChange(e, "phoneNumber")}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

