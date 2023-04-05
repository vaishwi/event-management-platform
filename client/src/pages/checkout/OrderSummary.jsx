/**
 * @author Khushi Shah (B00923816)
 * This is the main component which is used for the checkout process
 * This component imports various MUI Components, it calls various other components which are used for checkout process
 * This shows the final summary of the order which is being placed by the user
 */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';

export default function AddressForm(props) {
  const {eventData, counter} = props;


  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Order Summary
      </Typography>
        <Grid  sx={{ display: 'flex', gap: 2, mb: 3}}>
            <Card  sx={{ flex: 1 , boxShadow: 0}}>
              <CardContent>
                <Grid container justify="space-between">
                    <Typography component="h7" variant="h5" align="left" >
                    {counter} x General Admission:
                    </Typography>
                    <Typography inline variant="h5" align="right">
                        CA $ {counter * eventData?.price}
                    </Typography>
                </Grid>
                <Divider sx = {{mt:3, mb:1}}/>
                <Grid container justify="space-between">
                    <Typography inline variant="h5" align = "left">
                      {counter} x Delivery:
                    </Typography>
                    <Typography inline variant="h5" align="right">
                            CA $ 0.0
                    </Typography>
                </Grid>
                <Divider sx = {{mt:3, mb:1}}/>
                <Grid container justify="space-between">
                    <Typography inline variant="h5" align = "left">
                      Total:
                    </Typography>
                    <Typography inline variant="h5" align="right">
                       CA $ {counter * eventData?.price}
                    </Typography>
                </Grid>
              </CardContent>
            </Card>
            <Card align = "center" sx={{ flex: 1 , boxShadow: 0}}>
                <Typography variant="h5" sx = {{fontWeight:"normal", fontStyle: "normal"}}>
                    {eventData?.title}
                </Typography>
                <CardContent sx={{ flex: 1 }}>
                    <CardMedia

                       src = {eventData?.banner_image}
                       component="img"
                       sx={{ maxWidth: "auto", height: "auto", position: 'relative', backgroundSize: 'cover', display: { sm: 'block' } }}
                    />
                </CardContent>
            </Card>
        </Grid>
    </React.Fragment>
  );
}