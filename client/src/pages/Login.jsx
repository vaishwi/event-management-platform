/**
 * @author Arpitkumar Patel (B00927071)
 * This module contains a React component that renders a login form. It uses Material-UI components
 * for styling and form elements. When the user submits the form, it sends a POST request to the server
 * to authenticate the user. If the authentication is successful, the user is redirected to the home page.
 * @module LoginForm
 * @returns A React component that renders a login form.
 */
import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MuiAlert from "@mui/material/Alert";
import {Snackbar} from "@mui/material"
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import axios from "axios";


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
      <Link
        // color="inherit"
        to="/login">
        Eventify
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

/**
 * A functional component that renders a login form. The form allows users to enter their email and password
 * and submit the form to log in. The component also handles validation of the email and password fields,
 * and displays error messages if the fields are invalid. Upon successful login, the component sets the user's
 * login status and redirects them to the appropriate page based on their user type.
 * @returns A login form component.
 */
const Login = () => {
  const navigate = useNavigate();
  
  /**
   * An array of objects representing the pages available to different types of users.
   * @constant
   * @type {Array}
   * @property {string} pageName - The name of the page.
   * @property {string} route - The route to the page.
   * @property {Array} organizationPages - The pages available to organization users.
   * @property {Array} userPages - The pages available to regular users.
   * @property {Array} adminPages - The pages available to admin users.
   */
  const organizationPages = [
    { pageName: "My Events", route: "/organizerevents" },
    { pageName: "Add Event", route: "/postevent" },
    { pageName: "Subscribers", route: "/subscribers" },
  ];
  const userPages = [
    { pageName: "Search", route: "/search" },
    { pageName: "Registered Events", route: "/myEvents" },
    { pageName: "Payment Details", route: "/billing" },
  ];
  const adminPages = [
    { pageName: "Organizers", route: "/organizers" },
    { pageName: "Events", route: "/manageEvents" },
    { pageName: "Authentication Requests", route: "/authenticationRequests" },
  ];
  // const user = [
  //   {
  //     email: "user@gmail.com",
  //     password: "123456",
  //     userType: "user",
  //   },
  //   {
  //     email: "admin@gmail.com",
  //     password: "123456",
  //     userType: "admin",
  //   },
  //   {
  //     email: "organizer@gmail.com",
  //     password: "123456",
  //     userType: "organizer",
  //   },
  // ];

  const [password, setPassword] = useState("");

  /**
   * A regular expression used to validate email addresses.
   */
  const emailValidation = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  /**
   * Handles the form submission event and sends a POST request to the server with the user's
   * email and password. If the user is an attendee, they are redirected to the home page. If the
   * user is an organizer, they are redirected to the subscribers page. If the user is an admin,
   * they are redirected to the organizers page. If the user's credentials do not exist, an error
   * message is displayed.
   * @param {{event}} event - the form submission event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    /**
     * Creates a JSON object with the email and password values from the given FormData object.
     * @param {{FormData}} data - The FormData object containing the email and password values.
     * @returns A JSON object with the email and password values.
     */
    const data_json = {
      email: data.get("email"),
      password: data.get("password"),
    };

      /**
       * Sends a POST request to the specified URL with the given data and handles the response.
       * @param {{string}} url - The URL to send the request to.
       * @param {{object}} data_json - The data to send with the request in JSON format.
       */
      axios({
        // Endpoint to send files
        url: `${import.meta.env.VITE_SERVER_URL}/login`,
        method: "POST",
        data: data_json,
      })
        // Handle the response from backend here
        .then((res) => {
          console.log("res: ", res);
          /**
           * Handles the response from the server after a user logs in. If the user is an attendee,
           * their information is stored in local storage and they are redirected to the home page.
           * If the user is an organizer, their information is stored in local storage and they are
           * redirected to the subscribers page. If the user is an admin, their information is stored
           * in local storage and they are redirected to the organizers page. If the user's credentials
           * do not exist, an error message is displayed.
           * @param {{any}} res - the response from the server after a user logs in
           */
          if (res.data.userType === "attendee") {
            localStorage.setItem("loginStatus", true);
            localStorage.setItem("pages", JSON.stringify(userPages));
            localStorage.setItem("user", JSON.stringify(res.data));

            navigate("/home");
            window.location.reload();
          } else if (res.data.userType === "organizer") {
            localStorage.setItem("loginStatus", true);
            localStorage.setItem("pages", JSON.stringify(organizationPages));
            localStorage.setItem("user", JSON.stringify(res.data));
            
            navigate("/subscribers");
            window.location.reload();
          } else if (res.data.userType === "admin") {
            localStorage.setItem("loginStatus", true);
            localStorage.setItem("pages", JSON.stringify(adminPages));
            localStorage.setItem("user", JSON.stringify(res.data));

            navigate("/organizers");
            window.location.reload();
          }
          else {
            setRegistrationError("Credential does not exist");
            setOpenSnackbar(true);
          }

        })

        /**
         * Catches any errors that occur during registration and sets the registration error state
         * to the error message. It also opens the snackbar to display the error message to the user.
         * @param {{any}} err - the error that was thrown during registration
         */
        .catch((err) => {
          setRegistrationError(err);
          setOpenSnackbar(true);
        });
    
    // admin -> organizers
    // user -> home
    // organizer -> subscribers
  };

  /**
   * Handles the change event for an email input field. Validates the new value and sets the email error state accordingly.
   * @param {{Event}} event - The change event object.
   */
  const handleEmailChange = (event) => {
    const newValue = event.target.value;
    if (!emailValidation.test(newValue)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  /**
   * Handles the change event for a password input field. Sets the new password value and
   * checks if the length of the new password is less than 6 characters. If it is, sets
   * the password error state to true, otherwise sets it to false.
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

  /**
   * Toggles the visibility of a password field.
   */
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /**
   * Renders a sign in form with email and password fields, and a submit button.
   */
  return (
    <ThemeProvider theme={theme}>
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
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage: "url(/Images/carousel.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              // noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleEmailChange}
                error={emailError}
                helperText={emailError && "Please enter valid email address"}
                autoFocus
              />

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
                  passwordError && "Password must be at least 6 characters"
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgetPassword">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
