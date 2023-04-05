/**
 * @author Khushi Shah (B00923816)
 * This is the main component which is used for the checkout process for unpaid events
 * This component imports various MUI Components, it calls various other components which are used for checkout process for unpaid events
 */
import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ContactInformation from './ContactInformation.jsx';
import PaymentForm from './PaymentForm';
import ReviewRegister from './ReviewRegister';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const steps = ['Contact Information', 'Register Now'];

function getStepContent(step, contactInfo, handleChange) {
  switch (step) {
    case 0:
      return <ContactInformation contactInfo = {contactInfo} handleChange = {handleChange}/>;
    case 1:
      return <ReviewRegister contactInfo = {contactInfo}/>;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();

    const [eventData, setData] = useState(null);
    const [registerEvent, setRegisterEvent] = useState(false);

    const [contactInfo, setContactInfo] = useState({
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null
    });
    useEffect(() => {
        if(location.state != null){
            setData(location.state.eventData);
        }
    },[])
   {console.log(eventData)}
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
  if(activeStep == 0 && contactInfo.firstName && contactInfo.lastName && contactInfo.email && contactInfo.phoneNumber) {
    setActiveStep(activeStep + 1);
    }
  else if (activeStep == 1){
    setActiveStep(activeStep + 1);
     setRegisterEvent(true);
    }
  };

  const handleBack = () => {
    setRegisterEvent(false);
    setActiveStep(activeStep - 1);
  };

  const handleRedirection = (element) => {
    navigate(element);
  }

        const handleChange = (e , name) => {
                setContactInfo(prev => ({
                ...prev,
                [name]: e.target.value
                }))
              };

  const addRegisterEvent = async () => {
            try{
                const userID = localStorage.getItem('user');
                const id = JSON.parse(userID).id;
                console.log(id);
                const response = await axios.post(
                    `${import.meta.env.VITE_SERVER_URL}/registerEvent`,
                    {
                        eventData,
                        id,
                    })

            } catch (e) {
                console.log(e)
                console.log(e.response.status)

            }
  };


    useEffect(() => {
        if(activeStep == 2) addRegisterEvent();
    },[registerEvent])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
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
                Thank you for your registration.
              </Typography>
              <Button sx = {{bgcolor: 'green', alignItems:"center", mt:5}} size = "large" fullWidth = "true" variant="contained" onClick={() => handleRedirection('/home')}>Explore more events</Button>

            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, contactInfo, handleChange)}
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
                  {activeStep === steps.length - 1 ? 'Confirm Registration' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}