import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}>
            {"Copyright © "}
            <Link
                color="inherit"
                href="/login">
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
    const organizationPages = [{'pageName':'My Events','route':'/organizerevents'},{'pageName':'Add Event','route':'/postevent'},{'pageName':'Subscribers','route':'/subscribers'}]
    const userPages = [{'pageName':'Search','route':'/search'}, {'pageName':'Registered Events','route':'/myEvents'},{'pageName':'Payment Details','route':'/billing'}]
    const adminPages = [{'pageName':'Organizers','route':'/organizers'},{'pageName':'Events','route':'/manageEvents'},{'pageName':'Authentication Requests','route':'/authenticationRequests'}]
    const user = [
        {
            email: "user@gmail.com",
            password: '123456',
            userType: "user",
        },
        {
            email: "admin@gmail.com",
            password: '123456',
            userType: "admin",
        },
        {
            email: "organizer@gmail.com",
            password: '123456',
            userType: "organizer",
        },
    ];

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const emailValidation = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");

        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
        user.map((u) => {
            if (u.email === email && u.password === password) {
                localStorage.setItem("loginStatus",true)
                localStorage.setItem("user", JSON.stringify(u));
                
                
                if (u.userType === "user") {
                    localStorage.setItem("pages",JSON.stringify(userPages))
                    
                    console.log(JSON.stringify(userPages))
                    
                    navigate("/home");
                    window.location.reload()
                }
                if (u.userType === "organizer") {
                    localStorage.setItem("pages",JSON.stringify(organizationPages))
                    
                    navigate("/");
                    window.location.reload()
                }
                if (u.userType === "admin") {
                    localStorage.setItem("pages",JSON.stringify(adminPages))
                    
                    navigate("/organizers");
                    window.location.reload()
                }
            }
        });
        // admin -> organizers
        // user -> home
        // organizer ->
    };

    const handleEmailChange = (event) => {
        const newValue = event.target.value;
        // setEmail(newValue);
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
            <Grid
                container
                component="main"
                sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={8}
                    sx={{
                        backgroundImage:
                            "url(/Images/carousel.jpg)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={4}
                    component={Paper}
                    elevation={6}
                    square>
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
                        <Typography
                            component="h1"
                            variant="h5">
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
                                helperText={
                                    emailError &&
                                    "Please enter valid email address"
                                }
                                autoFocus
                            />
                            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
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
                                            onClick={
                                                handleTogglePasswordVisibility
                                            }
                                            edge="end">
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    ),
                                }}
                            />
                            {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid
                                    item
                                    xs>
                                    <Link
                                        href="/forgetPassword"
                                        variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link
                                        href="/signup"
                                        variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
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
