import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';

export default function AddressForm(props) {
  const {url , title} = props;

  return (
    <React.Fragment>
        {console.log(url)}

      <Typography variant="h4" gutterBottom>
        Order Summary
      </Typography>
        <Grid item xs={12} md={12} sx={{ display: 'flex', gap: 2, mb: 3}}>
            <Card  sx={{ flex: 1 , boxShadow: 0}}>
              <CardContent>
                <Grid container justify="space-between" sx={{gap: 5}}>
                    <Typography component="h7" variant="h5" align="left" >
                    1 x General Admission:
                    </Typography>
                    <Typography inline variant="h5" align="right">
                    CA$40
                    </Typography>
                </Grid>
                <Divider sx = {{mt:3, mb:1}}/>
                <Grid container justify="space-between" sx={{gap: 21}}>
                <Typography inline variant="h5" align = "left">
                  1 x Delivery:
                </Typography>
                    <Typography inline variant="h5" align="right">
                   CA$0
                </Typography>
                </Grid>
                <Divider sx = {{mt:3, mb:1}}/>
            <Grid container justify="space-between" sx={{gap: 28}}>
                <Typography inline variant="h5" align = "left">
                  Total:
                </Typography>
                <Typography inline variant="h5" align="right">
                   CA$40
                </Typography>
                </Grid>
              </CardContent>
            </Card>
            <Card align = "center" sx={{ flex: 1 , boxShadow: 0}}>
                <Typography variant="h5" sx = {{fontWeight:"normal", fontStyle: "normal"}}>
                    {title}
                </Typography>
                <CardContent sx={{ flex: 1 }}>
                <CardMedia
                   src = {url}
                   component="img"
                   sx={{ width: 1, position: 'relative', backgroundSize: 'cover', display: { xs: 'none', sm: 'block' } }}
                />
                </CardContent>
            </Card>
        </Grid>
    </React.Fragment>
  );
}