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
import AddressForm from './OrderSummary.jsx';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const steps = ['Order Summary', 'Payment details', 'Place your order'];

function getStepContent(step , eventData, counter, payment, handleChange) {
  switch (step) {
    case 0:
      return <AddressForm eventData = {eventData} counter = {counter}/>;
    case 1:
      return <PaymentForm payment = {payment} handleChange = {handleChange}/>;
    case 2:
      return <Review eventData = {eventData} counter = {counter} payment = {payment}/>;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();

    const [eventData, setEventData] = useState(null);
    const [registerEvent, setRegisterEvent] = useState(false);
    const [counter, setCounter] = useState(null);
    const [payment, setPayment] = useState({
        name: null,
        cardNumber: null,
        expiry: null,
        cvv: null
    });
    const [formFilled, setFormFilled] = useState(false);
    useEffect(() => {
        if(location.state != null){
            setEventData(location.state.eventData);
            setCounter(location.state.counter)
        }
    },[])

  const [activeStep, setActiveStep] = React.useState(0);
    const handleChange = (e , name) => {
            setPayment(prev => ({
            ...prev,
            [name]: e.target.value
            }))
            console.log(payment)
          };
  const handleNext = (activeStep) => {
    if(activeStep == 1 && payment.name && payment.cardNumber && payment.expiry && payment.cvv) {
      setActiveStep(activeStep + 1);
    }
    else if (activeStep == 0 || activeStep == 2){
      if(activeStep == 2) setRegisterEvent(true);
      setActiveStep(activeStep + 1);
    }
    else {
        console.log("Error")
    }
  };

  const handleBack = () => {
    setRegisterEvent(false);
    setActiveStep(activeStep - 1);
  };

    const handleRedirection = (element) => {
      navigate(element);
    }

  const addRegisterEvent = async () => {
            try{
                const userID = localStorage.getItem('user');
                const id = JSON.parse(userID).id;
                console.log(id);
                const response = await axios.post('http://127.0.0.1:5000/registerEvent', {
                    counter,
                    payment,
                    eventData,
                    id,
                })
            } catch (e) {
                console.log(e)
                console.log(e.response.status)

            }
  };


    useEffect(() => {
        if(activeStep == 3) addRegisterEvent();
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
              {getStepContent(activeStep , eventData, counter, payment, handleChange)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={() => handleNext(activeStep)}
                  sx={{ mt: 3, ml: 1 }}
                >
                {console.log(activeStep)}
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}