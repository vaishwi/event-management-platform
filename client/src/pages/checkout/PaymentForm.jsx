/**
 * @author Khushi Shah (B00923816)
 * This is the main component which is used for the checkout process
 * This component imports various MUI Components, it calls various other components which are used for checkout process for paid events
 * This component asks user which type of payment method they want to approach with
 */
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';

export default function PaymentForm(props) {
  const {payment, handleChange, handlePaymentID, allPaymentDetails, paymentID, validator} = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      {allPaymentDetails.length === 0 ?
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value = {payment.name}
            onChange={(e) => handleChange(e, "name")}
          />
          {validator.message("Name", payment.name, "required|string")}
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            helperText = "XXXX XXXX XXXX XXXX"
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
            fullWidth
            helperText="MM/YY"
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
          {validator.message("CVV", payment.cvv, "required|numeric|min:0,num|max:999,num")}
        </Grid>
        <Grid item xs={12}>
            Your card details will be saved
        </Grid>
      </Grid>
       : <div>
       <FormControl>
         <RadioGroup
           aria-labelledby="demo-radio-buttons-group-label"
           defaultValue="female"
           name="radio-buttons-group"
         >
         {allPaymentDetails.map((element, index) => (
           <FormControlLabel value={element.id} control={<Radio />} label={element.cardNumber} checked = {paymentID === element.id} onChange = {(e) => handlePaymentID(e.target.value)}/>
         ))}
         </RadioGroup>
       </FormControl>

       </div> }
    </React.Fragment>
  );
}

