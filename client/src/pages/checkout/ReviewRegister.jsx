import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function ReviewRegister(props) {

  const {contactInfo} = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>
      <List disablePadding>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total:" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            CA $ 0.0
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>

        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Contact Information
          </Typography>
          <Grid container>
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>First Name: </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{contactInfo?.firstName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Last Name: </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{contactInfo?.lastName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Email: </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{contactInfo?.email}</Typography>
                </Grid>
<               Grid item xs={6}>
                  <Typography gutterBottom>Phone Number: </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{contactInfo?.phoneNumber}</Typography>
                </Grid>
              </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}