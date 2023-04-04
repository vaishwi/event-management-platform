/**
 * @author Arpitkumar Patel (B00927071)
 * This module contains a React component that renders a form for user registration.
 * It imports various components from the Material-UI library, including TextField, Checkbox,
 * and Button. It also imports other modules such as axios and react-router-dom.
 */
import * as React from "react";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import { useLocation } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiPhoneNumber from "material-ui-phone-number";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Checkbox from "@mui/material/Checkbox";
// import Link from '@mui/material/Link';
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Avatar,
  Typography,
  Snackbar,
} from "@mui/material";

import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router";

const theme = createTheme();
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const OrganizerEditProfile = () => {
  const navigate = useNavigate();
  const organizer = useLocation().state.organizer;
  const contactNumber2 = organizer.contactNo.split("-")[1];
  console.log("contactNumber2: ", contactNumber2);
  console.log("In edit org");
  console.log(organizer);

  const emailValidation = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const [organizationError, setOrganizationError] = useState(false);
  const [managedByError, setManagedByError] = useState(false);

  /**
   * Handles the submission of the organizer's profile update form.
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const data_json = {
      id: organizer.id,
      managedBy: data.get("managedBy"),
      contactNo: data.get("countryCode") + "-" + data.get("phoneNumber"),

      organizationName: data.get("organization"),
      occupation: data.get("occupation"),
      location: data.get("location"),
      about: data.get("about"),
      city: data.get("city"),
      state: data.get("state"),
      type: "organizer",
    };

    if (data.get("phoneNumber") == "") {
      data_json["contactNo"] = "";
    }

      if (data.get("phoneNumber") == "") {
          data_json['contactNo'] = ""
      }

    axios({
      // Endpoint to send files
      url: `${import.meta.env.VITE_SERVER_URL}/editOrganizer`,
      method: "POST",
      data: data_json,
    })
      // Handle the response from backend here
      .then((res) => {
        if (res.data === organizer.id) {
          navigate("/organizerProfile");
        } else {
          setRegistrationError("Update Failed");
          setOpenSnackbar(true);
        }
      })

      // Catch errors if any
      .catch((err) => {});
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handlePhoneNumberChange = (event) => {
    const newValue = event.target.value.replace(/[^0-9 +()-]/g, "");
    setPhoneNumber(newValue);
    if (newValue.length < 5) {
      setPhoneNumberError(true);
    } else {
      setPhoneNumberError(false);
    }
  };

  const handleCountryCodeChange = (event) => {
    setCountryCode(event);
  };

  const handleOrganizationChange = (event) => {
    if (event.target.value.length < 1) {
      setOrganizationError(true);
    } else {
      setOrganizationError(false);
    }
  };

  const handleManagedByChange = (event) => {
    if (event.target.value.length < 1) {
      setManagedByError(true);
    } else {
      setManagedByError(false);
    }
  };

  /**
   * Renders a form for editing the user's profile information.
   * @returns A JSX element containing the form for editing the user's profile information.
   */
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="organization"
                  label="Organization"
                  name="organization"
                  autoComplete="organization"
                  defaultValue={organizer.organizationName}
                  onChange={handleOrganizationChange}
                  error={organizationError}
                  helperText={
                    organizationError && "Please fill Organization Name"
                  }
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="managedBy"
                  label="Managed By"
                  name="managedBy"
                  autoComplete="managed-by"
                  defaultValue={organizer.managedBy}
                  onChange={handleManagedByChange}
                  error={managedByError}
                  helperText={managedByError && "Please fill Managed By"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="occupation"
                  label="Occupation"
                  name="occupation"
                  autoComplete="occupation"
                  defaultValue={organizer.occupation}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  fullWidth
                  //   required
                  name="phoneNumber"
                  defaultValue={contactNumber2}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MuiPhoneNumber
                          value={countryCode}
                          id="countryCode"
                          name="countryCode"
                          defaultCountry={"ca"}
                          onChange={handleCountryCodeChange}
                          defaultValue={organizer.contactNo.split("-")[0]}
                        />
                      </InputAdornment>
                    ),
                  }}
                  error={phoneNumberError}
                  helperText={phoneNumberError && "Please fill Phone number"}
                  inputProps={{ maxLength: 20 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  autoComplete="location"
                  defaultValue={organizer.location}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="city-name"
                  name="city"
                  fullWidth
                  id="city"
                  label="City"
                  defaultValue={organizer.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  autoComplete="state-name"
                  defaultValue={organizer.state}
                />
              </Grid>
              <Grid item sm={20}>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  label="About"
                  name="about"
                  multiline
                  rows={4}
                  defaultValue={organizer.about}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  navigate("/organizerProfile");
                }}
                sx={{ mt: 3, mb: 2 }}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 3 }}>
                Save
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default OrganizerEditProfile;
