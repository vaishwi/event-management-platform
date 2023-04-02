import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';


export default function PaymentComponent(props)
{
      const { onHideClick, payment, handleChange, addRegisterEvent } = props;
        const addCardDetails = async () => {
            const userID = localStorage.getItem('user');
            const id = JSON.parse(userID).id;
            console.log(id);

             const response = await axios.post('http://127.0.0.1:5000/addPayment', {
                                 payment,
                                 id,
             })
             addRegisterEvent();
        };
      const addPayments = () => {
        if(payment.name && payment.cardNumber && payment.expiry && payment.cvv){
            onHideClick();
            addCardDetails();
        }
      };

    return (
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardName"
                  label="Name on card"
                  fullWidth
                  autoComplete="cc-name"
                  variant="standard"
                  value = {payment.name}
                  onChange={(e) => handleChange(e, "name")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardNumber"
                  label="Card number"
                  fullWidth
                  autoComplete="cc-number"
                  variant="standard"
                  value = {payment.cardNumber}
                  onChange={(e) => handleChange(e, "cardNumber")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="expDate"
                  label="Expiry date"
                  fullWidth
                  autoComplete="cc-exp"
                  variant="standard"
                  value = {payment.expiry}
                  onChange={(e) => handleChange(e, "expiry")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cvv"
                  label="CVV"
                  helperText="Last three digits on signature strip"
                  fullWidth
                  autoComplete="cc-csc"
                  variant="standard"
                  value = {payment.cvv}
                  onChange={(e) => handleChange(e, "cvv")}
                />
              </Grid>
              <Grid item xs={12}>
                <Button style={{maxWidth: '25%'}} sx = {{bgcolor: 'red', alignItems:"center", mt:2, mr:2}} size = "large" fullWidth = "true" variant="contained" onClick={() => onHideClick()} >Close </Button>
                <Button style={{maxWidth: '25%'}} sx = {{bgcolor: 'blue', alignItems:"center", mt:2}} size = "large" fullWidth = "true" variant="contained" onClick={() => addPayments()} >Add </Button>
              </Grid>
            </Grid>
          </React.Fragment>
        </Paper>
    );
}
