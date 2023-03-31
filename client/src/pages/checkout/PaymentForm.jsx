import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PaymentForm(props) {
  const {payment, handleChange} = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
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
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            type = "number"
            fullWidth
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
            type = "number"
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
            type = "number"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value = {payment.cvv}
            onChange={(e) => handleChange(e, "cvv")}
          />
        </Grid>
        <Grid item xs={12}>
            Your card details will be saved
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

