/**
 * This module contains a React component that renders a login form. It uses Material-UI
 * components for styling and form elements. When the user submits the form, it sends a
 * request to the server to authenticate the user. If the authentication is successful,
 * the user is redirected to the home page.
 * @module LoginForm
 */
import React, { useState } from "react";
// import { createTheme } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiPhoneNumber from "material-ui-phone-number";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import axios from "axios";

const theme = createTheme();

/**
 * Creates a set of Material UI styles for a component.
 * @returns An object containing the styles for the component.
 */
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

/**
 * A React functional component that creates an Alert component with the given props.
 * @param {{object}} props - The props to pass to the Alert component.
 * @param {{React.Ref}} ref - A reference to the Alert component.
 * @returns An Alert component with the given props.
 */
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * A functional component that renders the copyright information for the Eventify website.
 * @param {{object}} props - The props object that contains the properties to be passed to the Typography component.
 * @returns A Typography component that displays the copyright information for the website.
 */
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link to="/">Eventify</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

/**
 * A component that renders a sign up form for either an attendee or an organizer.
 * @returns JSX element that contains the sign up form.
 */
const SignUpStart = () => {
  const navigate = useNavigate();

  const classes = useStyles();
  const [userType, setUserType] = useState("");

  /**
   * Sets the user type to the given type.
   * @param {{string}} type - the type of user to set
   */
  const handleUserType = (type) => {
    setUserType(type);
  };

  // ********************************************* SignUp Attendee *********************************************

  /**
   * A regular expression used to validate email addresses.
   * @type {RegExp}
   */
  const emailValidation = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [firstnameError, setFirstnameError] = useState(false);

  const [organizationError, setOrganizationError] = useState(false);
  const [managedByError, setManagedByError] = useState(false);

  /**
   * Handles the submission of attendee registration form data by sending a POST request to the server.
   * @param {{event}} event - The event object that triggered the form submission.
   */
  const handleSubmitAttendee = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const data_json = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      contactNo: data.get("countryCode") +"-"+ data.get("phoneNumber"),
      email: data.get("email"),
      password: data.get("password"),
      type: "attendee",
    };

    /**
     * Sends a POST request to the server to register a new user with the given data.
     * If the user already exists, an error message is displayed.
     * @param {{Object}} data_json - The user data to be sent to the server.
     */
    axios({
      // Endpoint to send files
      url: `${import.meta.env.VITE_SERVER_URL}/registration/`,
      method: "POST",
      data: data_json,
    })
      // Handle the response from backend here
      .then((res) => {
        if (res.data === "User does exist") {
          setRegistrationError("Credential already exist");
          setOpenSnackbar(true);
        } else {
          setRegistrationError("Credential already exist");
          setOpenSnackbar(true);
        }
      })

      // Catch errors if any
      .catch((err) => {});
    navigate("/login");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // ********************************************* SignUp Organizer *********************************************

  /**
   * Handles the submission of the organizer registration form. Sends a POST request to the server
   * with the form data.
   * @param {{event}} event - the form submission event
   */
  const handleSubmitOrganizer = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const data_json = {
      managedBy: data.get("managedBy"),
      contactNo: data.get("countryCode") +"-"+ data.get("phoneNumber"),
      email: data.get("email"),
      password: data.get("password"),

      organizationName: data.get("organization"),
      occupation: data.get("occupation"),
      location: data.get("location"),
      about: data.get("about"),
      city: data.get("city"),
      state: data.get("state"),
      type: "organizer",
    };
    
    /**
     * Sends a POST request to the specified URL with the given data. If the response data is "User does exist",
     * sets the registration error and opens a snackbar. Otherwise, navigates to the login page.
     * @param {{string}} url - the URL to send the POST request to
     * @param {{object}} data_json - the data to send with the POST request
     */
    axios({
      // Endpoint to send files
      url: `${import.meta.env.VITE_SERVER_URL}/registration`,
      method: "POST",
      data: data_json,
    })
      // Handle the response from backend here
      .then((res) => {
        if (res.data === "User does exist") {
          setRegistrationError("Credential already exist");
          setOpenSnackbar(true);
        } else {
          navigate("/login");
        }
      })

      // Catch errors if any
      .catch((err) => {});
  };

  /**
   * Handles changes to the phone number input field by removing any non-numeric characters
   * and updating the state with the new value. Also sets an error flag if the length of the
   * new value is less than 5.
   * @param {{Event}} event - the event object representing the change in the input field
   */
  const handlePhoneNumberChange = (event) => {
    const newValue = event.target.value.replace(/[^0-9 +()-]/g, "");
    setPhoneNumber(newValue);
    if (newValue.length < 5) {
      setPhoneNumberError(true);
    }
    else {
      setPhoneNumberError(false);
    }
  };

  const handleCountryCodeChange = (event) => {
    setCountryCode(event);
  };

  /**
   * Handles changes to the first name input field by checking if the input value is empty.
   * If the input value is empty, sets the first name error state to true, otherwise sets it to false.
   * @param {{Event}} event - The event object triggered by the input field.
   */
  const handleFirstNameChange = (event) => {
    if (event.target.value.length < 1) {
      setFirstnameError(true);
    }
    else {
      setFirstnameError(false);
    }
  };

  const handleLastNameChange = (event) => {
    if (event.target.value.length < 1) {
      setLastnameError(true);
    }
    else {
      setLastnameError(false);
    }
  };

  /**
   * Handles changes to the organization input field by checking if the input value is empty or not.
   * If the input value is empty, sets the organization error state to true, otherwise sets it to false.
   * @param {{Event}} event - The event object generated by the organization input field.
   */
  const handleOrganizationChange = (event) => {
    if (event.target.value.length < 1) {
      setOrganizationError(true);
    }
    else {
      setOrganizationError(false);
    }
  };

  const handleManagedByChange = (event) => {
    if (event.target.value.length < 1) {
      setManagedByError(true);
    }
    else {
      setManagedByError(false);
    }
  };

  /**
   * Handles the change event for the email input field. Validates the new value and sets the email error state accordingly.
   * @param {{Event}} event - The event object for the email input field change event.
   */
  const handleEmailChange = (event) => {
    const newValue = event.target.value;
    // setEmail(newValue);
    if (!emailValidation.test(newValue)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  /**
   * Handles the change event for the password input field. Updates the password state
   * with the new value and sets the password error state to true if the new value is less
   * than 6 characters, otherwise sets it to false.
   * @param {{Event}} event - the change event triggered by the password input field
   */
  const handlePasswordChange = (event) => {
    const newValue = event.target.value;
    setPassword(newValue);
    if (newValue.length < 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // *****************************************************************************************************************

  /**
   * Renders a sign up form for either an Attendee or Organizer user type.
   */
  return (
    <div className={classes.root}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}>
          {registrationError}
        </Alert>
      </Snackbar>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          align="center"
          justify="center"
          alignItems="center">
          <Grid item xs={12} md={6}>
            <Paper
              className={classes.paper}
              onClick={() => handleUserType("Attendee")}
              style={{
                backgroundColor:
                  userType === "Attendee" ? "#1976d2" : "#f0f0f0",
                color: userType === "Attendee" ? "#ffffff" : "#000000",
              }}>
              <Typography variant="h4">Attendee</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              className={classes.paper}
              onClick={() => handleUserType("Organizer")}
              style={{
                backgroundColor:
                  userType === "Organizer" ? "#1976d2" : "#f0f0f0",
                color: userType === "Organizer" ? "#ffffff" : "#000000",
              }}>
              <Typography variant="h4">Organizer</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* ********************************************* Signup Attendee ********************************************* */}
      {userType === "Attendee" && (
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
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmitAttendee}
                sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={handleFirstNameChange}
                      error={firstnameError}
                      helperText={firstnameError && "Please fill First Name"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      onChange={handleLastNameChange}
                      error={lastnameError}
                      helperText={lastnameError && "Please fill last Name"}
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
                      required
                      name="phoneNumber"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MuiPhoneNumber
                              value={countryCode}
                              id="countryCode"
                              name="countryCode"
                              defaultCountry={"ca"}
                              onChange={handleCountryCodeChange}
                            />
                          </InputAdornment>
                        ),
                      }}
                      error={phoneNumberError}
                      helperText={
                        phoneNumberError && "Please fill Phone number"
                      }
                      inputProps={{ maxLength: 20 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleEmailChange}
                      error={emailError}
                      helperText={
                        emailError && "Please enter valid email address"
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Password"
                      variant="outlined"
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      fullWidth
                      required
                      error={passwordError}
                      helperText={
                        passwordError &&
                        "Password must be at least 6 characters"
                      }
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}>
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/login">Already have an account? Sign in</Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      )}

      {/* ********************************************* Signup Organizer ********************************************* */}
      {userType === "Organizer" && (
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
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmitOrganizer}
                sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="organization"
                      label="Organization"
                      name="organization"
                      autoComplete="organization"
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
                      onChange={handleManagedByChange}
                      error={managedByError}
                      helperText={
                        managedByError && "Please fill Managed By"
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="occupation"
                      label="Occupation"
                      name="occupation"
                      autoComplete="occupation"
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
                      required
                      name="phoneNumber"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MuiPhoneNumber
                              value={countryCode}
                              id="countryCode"
                              name="countryCode"
                              defaultCountry={"ca"}
                              onChange={handleCountryCodeChange}
                            />
                          </InputAdornment>
                        ),
                      }}
                      error={phoneNumberError}
                      helperText={
                        phoneNumberError && "Please fill Phone number"
                      }
                      inputProps={{ maxLength: 20 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleEmailChange}
                      error={emailError}
                      helperText={
                        emailError && "Please enter valid email address"
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Password"
                      variant="outlined"
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      fullWidth
                      required
                      error={passwordError}
                      helperText={
                        passwordError &&
                        "Password must be at least 6 characters"
                      }
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="location"
                      label="Location"
                      name="location"
                      autoComplete="location"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="city-name"
                      name="city"
                      fullWidth
                      id="city"
                      label="City"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="state"
                      label="State"
                      name="state"
                      autoComplete="state-name"
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}>
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/login">Already have an account? Sign in</Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      )}
    </div>
  );
};

export default SignUpStart;
