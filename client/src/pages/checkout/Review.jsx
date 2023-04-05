/**
 * @author Khushi Shah (B00923816)
 * This is the main component which is used for the checkout process
 * This component imports various MUI Components, it calls various other components which are used for checkout process
 * This is the page which is used to review the details of the order for paid events
 */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function Review(props) {

  const {eventData, counter, payment} = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>
      <List disablePadding>
{/*         {products.map((product) => ( */}
{/*           <ListItem key={product.name} sx={{ py: 1, px: 0 }}> */}
{/*             <ListItemText primary={product.name} secondary={product.desc} /> */}
{/*             <Typography variant="body2">{product.price}</Typography> */}
{/*           </ListItem> */}
{/*         ))} */}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total:" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            CA $ {counter * eventData.price}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>

        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card Name: </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment?.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card Number: </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment?.cardNumber}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Expiry: </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment?.expiry}</Typography>
                </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}