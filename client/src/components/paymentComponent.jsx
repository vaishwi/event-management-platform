import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';
import useSimpleReactValidator from '../shared/UseReactSimpleValidator';


export default function PaymentComponent(props)
{
      const { onHideClick, payment, handleChange, addRegisterEvent } = props;
      const [validator, setValidator] = useSimpleReactValidator({},{});
      const [errors, setErrors] = useState({});
        const addCardDetails = async () => {
            const userID = localStorage.getItem('user');
            const userId = JSON.parse(userID).id;
            console.log(userId);

             const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/addPayment`, {
                                 payment,
                                 userId,
             })
             addRegisterEvent();
        };
      const addPayments = () => {
        if(validator.allValid()){
            onHideClick();
            addCardDetails();
        }
        else{
            setErrors(validator.getErrorMessages());
            setValidator(true);
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
                {validator.message("cardName", payment.name, "required|string")}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardNumber"
                  label="Card number"
                  fullWidth
                  helperText = "XXXX XXXX XXXX XXXX"
                  autoComplete="cc-number"
                  variant="standard"
                  value = {payment.cardNumber}
                  onChange={(e) => handleChange(e, "cardNumber")}
                />
                {validator.message("cardNumber", payment.cardNumber, "required|card_num")}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="expDate"
                  label="Expiry date"
                  helperText="MM/YY"
                  fullWidth
                  autoComplete="cc-exp"
                  variant="standard"
                  value = {payment.expiry}
                  onChange={(e) => handleChange(e, "expiry")}
                />
                {validator.message("expiry", payment.expiry, "required|card_exp")}
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
                {validator.message("cvv", payment.cvv, "required|numeric|min:0,num|max:999,num")}
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
