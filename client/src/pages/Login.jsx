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
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import axios from "axios";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


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

const Login = () => {
  const navigate = useNavigate();
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
  const emailValidation = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   
    const data_json = {
      email: data.get("email"),
      password: data.get("password"),
    };

    // user.map((u) => { 
      axios({
        // Endpoint to send files
        url: "http://127.0.0.1:5000/login",
        method: "POST",
        data: data_json,
      })
        // Handle the response from backend here
        .then((res) => {
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

        .catch((err) => {
          setRegistrationError(err);
          setOpenSnackbar(true);
        });
    // })
    // })

    // admin -> organizers
    // user -> home
    // organizer -> subscribers
  };

  const handleEmailChange = (event) => {
    const newValue = event.target.value;
    if (!emailValidation.test(newValue)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

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
              noValidate
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
