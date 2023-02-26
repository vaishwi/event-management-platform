import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';
import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

function MainEvent(props) {
  const { eventInfo, title, date, organizer, location, time, runtime, ticket, about} = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {date}
      </Typography>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Typography component="h6" variant="h6" gutterBottom>
        {eventInfo}
      </Typography>

      <Grid item xs={12} md={8} sx = {{mt:3, mb:3}}>
        <Card sx = {{display: 'flex', boxShadow: 0.5}}>
            <CardContent sx = {{flex:3}}>
                <Typography component="h8" variant="h10" gutterBottom>
                  By {organizer}
                </Typography>
            </CardContent>
            <CardContent sx = {{flex:1}}>
                <Button variant="contained">Visit</Button>
            </CardContent>
        </Card>
      </Grid>

    <Typography variant="h5" gutterBottom>
        When and Where
    </Typography>
    <Grid item xs={12} md={12} sx={{ display: 'flex', gap: 2, mb: 3}}>
            <Card sx={{ flex: 1 , boxShadow: 2 }}>
              <CardContent>
                <Typography component="h5" variant="h5">
                  <CalendarMonthIcon/>
                  Date and time
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {date}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                    {time}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 , boxShadow: 2 }}>
                <CardContent sx={{ flex: 1 }}>
                <Typography component="h5" variant="h5">
                  <LocationOnIcon/>
                  Location
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {location}
                </Typography>

              </CardContent>
            </Card>
        </Grid>
        <Divider />

      <Grid item xs={12} md={12} sx = {{mt:3, mb:3}}>
          <Typography variant="h5" gutterBottom>
            About this event
          </Typography>
            <Grid item xs={5} md={5} sx = {{mt:1}}>
              <Card sx = {{display: 'flex', boxShadow: 0}}>
                  <CardContent sx = {{flex:1}}>
                      <Typography component="h8" variant="h10" gutterBottom>
                        <AccessTimeIcon/> {runtime}
                      </Typography>

                  </CardContent>
                  <CardContent sx = {{flex:2}}>
                      <Typography component="h8" variant="h10" gutterBottom>
                        <BookOnlineIcon/> {ticket}
                      </Typography>
                  </CardContent>
              </Card>
            </Grid>
          <Typography variant="h" component="h7" color = "black">
            {about}
          </Typography>
      </Grid>
    </Grid>
  );
}

export default MainEvent;