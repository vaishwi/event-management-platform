import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
        <Grid item xs={12} md={12} sx={{ display: 'flex', gap: 2, mb: 3}}>
            <Card  sx={{ flex: 1 , boxShadow: 0}}>
              <CardContent>
                <Grid container justify="space-between">
                    <Typography component="h4" variant="h6" align="left" >
                    1 x General Admission:
                    </Typography>
                    <Typography inline variant="body1" align="right">
                    CA$40
                    </Typography>
                </Grid>
                <Divider sx = {{mt:3, mb:1}}/>
                <Typography component="h7" variant="h5">
                  1 x Delivery:
                </Typography>
                <Typography component="h7" variant="body" color="text.primary">
                   CA$0
                </Typography>
                <Divider sx = {{mt:3, mb:1}}/>
                <Typography component="h7" variant="h5">
                  Total:
                </Typography>
                <Typography component="h7" variant="body" color="text.primary">
                   CA$40
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 , boxShadow: 0 }}>
                <CardContent sx={{ flex: 1 }}>
                <CardMedia
                   src = "../Images/Event1.png"
                   component="img"
                   sx={{ width: 1, position: 'relative', backgroundSize: 'cover', display: { xs: 'none', sm: 'block' } }}
                />
                </CardContent>
            </Card>
        </Grid>



      <Grid container spacing={3}>
        <Grid item>

        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}