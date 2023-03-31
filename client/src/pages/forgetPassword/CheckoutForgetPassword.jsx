import * as React from 'react';
import { useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import {Snackbar} from "@mui/material"
import MuiAlert from "@mui/material/Alert";

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmailForgetPassword from './EmailForgetPassword';
import ResetCode from './ResetCode';
import NewPassword from './NewPassword';
import axios from "axios";
import { useNavigate } from "react-router";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/login">
        Eventify
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

var submittedEmail = "";
var resetCode = "";
var isCodeCorrect = false;
var newPassword = "";

const steps = ['Email', 'Reset Code', 'New Password'];
// var email = ""

function handleEmail (emailValue){
  // this.setState({ email: emailValue });
  console.log(emailValue)
  submittedEmail = emailValue;
}

function isResetCodeCorrect(value) {
  console.log("in isResetCodeCorrect: ", value)
  isCodeCorrect = value
}

function setNewPassword(password) {
  newPassword = password
  

}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <EmailForgetPassword email={handleEmail} />;
    case 1:
      return <ResetCode resetCode={resetCode} isResetCodeCorrect={isResetCodeCorrect}/>;
    case 2:
      return <NewPassword setNewPassword={setNewPassword} />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function CheckoutForgetPassword() {

  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState("");
  // const [resetCode, setResetCode] = useState("");
  const [isResetCodeCorrect, setIsResetCodeCorrect] = useState(false);
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleNext = () => {
    // setActiveStep(activeStep + 1);
    if (activeStep == 0) {
      console.log("Email submitted........." + submittedEmail)
      const data_json = {email: submittedEmail}
      axios({
        // Endpoint to send files
        url: "http://127.0.0.1:5000/checkEmail",
        method: "POST",
        data: data_json,
      })
        // Handle the response from backend here
        .then((res) => {
          if (res.data == false) {
            console.log("in axios res: ", res.data)
            // setActiveStep(activeStep - 1)
            setResetPasswordError("Email does not exist");
            setOpenSnackbar(true);
          }
          else {
            setActiveStep(activeStep + 1)
            console.log("in else axios res:", res.data)
            const code = Math.floor(100000 + Math.random() * 900000);
            // setResetCode(code);
            resetCode = code;
            console.log("generated code: ", resetCode)
            const config = {
                SecureToken : "616d372e-755d-4eb1-b68a-72d2054e01cb",
                To: submittedEmail ,
                From : "eventifyg007@gmail.com",
                Subject : "Eventify forget password reset code",
                Body : "Your password reset code is: " + code
            }
            if (window.Email) {
                window.Email.send(config)
                .then((message) => {console.log("email sent " + message)})
              
            }
          }
        })
    }
    if (activeStep == 1) {
      // setActiveStep(activeStep - 1)
      if (! isCodeCorrect){
        setResetPasswordError("Code does not match");
        setOpenSnackbar(true);
      }
      else {
        setActiveStep(activeStep + 1)
      }
    }
    if (activeStep == 2) {
      if (newPassword != "") {
        const data_json = { email: submittedEmail, password: newPassword }
        axios({
          // Endpoint to send files
          url: "http://127.0.0.1:5000/setNewPassword",
          method: "POST",
          data: data_json,
        })
          // Handle the response from backend here
          .then((res) => {
            if (res.data != false) {
              console.log("Password save Successfully")
              navigate('/login')
            } 
            else {
                setResetPasswordError("Password Reset Failed");
                setOpenSnackbar(true);
            }
          })
      }
      else {
        setResetPasswordError("Please enter valid password");
        setOpenSnackbar(true);
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
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
          {resetPasswordError}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Reset Password
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Password Reset.
              </Typography>
              <Typography variant="subtitle1">
                Your password has been reset successfully.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}