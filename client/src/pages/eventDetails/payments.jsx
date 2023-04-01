import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import PaymentComponent from '../../components/paymentComponent.jsx';
import axios from 'axios';

export default function PaymentForm() {
const theme = createTheme();

const [showPayments, setShowPayments] = React.useState(false)
const [payments, setPayments] = useState([]);
const onClick = () => setShowPayments(true)
const onHideClick = () => setShowPayments(false)
    const [payment, setPayment] = useState({
        name: null,
        cardNumber: null,
        expiry: null,
        cvv: null
    });
    const handleChange = (e , name) => {
            setPayment(prev => ({
            ...prev,
            [name]: e.target.value
            }))
            console.log(payment)
          };
    const addRegisterEvent = async () => {
        try{
                const userID = localStorage.getItem('user');
                const id = JSON.parse(userID).id;
            const response = await axios.get('http://127.0.0.1:5000/getPayments/'+id)
            if(response.status === 200) {
                setPayments(response.data.data)
            }
        } catch (e) {
            console.log(e)
            console.log(e.response.status)
        }
    };
    useEffect(() => {
          addRegisterEvent();
    } , [])
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Typography align = "center" component = "h4" variant="h4" gutterBottom sx = {{fontWeight:"bolder", mt:5}}>
                Debit/Credit Cards
        </Typography>
        <Container align = "center" component="main" maxWidth="md" sx={{ mb: 4 }}>
          <Divider />
          <Grid item xs={12} md={8} sx = {{mt:3, mb:3}}>
            <Button style={{maxWidth: '25%'}} sx = {{bgcolor: 'green', alignItems:"center", mt:2, mb: 2}} size = "large" fullWidth = "true" variant="contained" onClick={onClick}>Add your card</Button>
            { showPayments && <PaymentComponent onHideClick = {onHideClick} payment = {payment} handleChange = {handleChange} addRegisterEvent = {addRegisterEvent}/>}
            {payments.length === 0 ? <Card sx = {{display: 'flex', boxShadow: 0.5}} style={{backgroundColor: "lightgray"}}>
                <CardContent sx = {{flex:3}}>
                    <Typography component="h6" variant="h6" gutterBottom>
                        <InfoIcon sx = {{mr:1, mt:2}}/>
                         You currently don't have any cards saved.
                    </Typography>

                    <Typography component="h6" variant="h6" gutterBottom>
                    </Typography>
                </CardContent>
            </Card> :
            payments.map((element, index) => <Card sx = {{display: 'flex', boxShadow: 0.5, mb: 2}} style={{backgroundColor: "lightgray"}}>
                            <CardContent sx = {{flex:3}}>
                                <Typography component="h6" variant="h6" gutterBottom>
                                      Name on the card: {element?.cardName}
                                </Typography>
                                <Typography component="h6" variant="h6" gutterBottom>
                                      Card Number: {element?.cardNumber}
                                </Typography>
                                <Typography component="h6" variant="h6" gutterBottom>
                                      Expiry: {element?.expiry}
                                </Typography>
                                <Typography component="h6" variant="h6" gutterBottom>
                                      CVV: {element?.cvv}
                                </Typography>
                                <Typography component="h6" variant="h6" gutterBottom>
                                </Typography>
                            </CardContent>
                        </Card>
            )}
            <Divider/>
          </Grid>
        </Container>
      </ThemeProvider>
  );
}

