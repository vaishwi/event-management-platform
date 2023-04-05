/**
 * @author Khushi Shah (B00923816)
 * This is the component which is used to display the main event details
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import axios from 'axios';

function MainEvent(props) {
  const { description, title, date, organizer, location, time, runtime, type } = props;
  const [organizerName, setOrganizerName] = useState(null);

  const navigate = useNavigate();
  const handleRedirection = (element) => {
    const organizerInfo = element
    navigate('/organizerProfile', { state: { organizerId: organizerInfo } })
  }
  useEffect(() => {
    const fetchOrganizerName = async () => {
      try {
        console.log(organizer)
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/organizer/${organizer}`);
        console.log(response.data)
        if (response.status === 200) {
          setOrganizerName(response.data)
        }
      } catch (e) {
        console.log(e)
        console.log(e.response.status)

      }
    };
    fetchOrganizerName();

  }, [])
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
      <Typography component="h5" variant="h5" gutterBottom>
        {date}
      </Typography>
      <Typography component="h4" variant="h4" gutterBottom sx={{ fontWeight: "bolder" }}>
        {title}
      </Typography>

      <Grid item xs={12} md={8} sx={{ mt: 1, mb: 2 }}>
        <Card sx={{ display: 'flex', boxShadow: 0.5 }}>
          <CardContent align="center" sx={{ flex: 3, mt: 1 }}>
            <Typography component="h6" variant="h6" gutterBottom>
              By {organizerName?.organizationName}
            </Typography>
          </CardContent>
          <CardContent justifyContent="center" align="center" sx={{ flex: 1, mt: 2.5 }}>
            <Button variant="contained" onClick={() => handleRedirection(organizer)}>Visit</Button>
          </CardContent>
        </Card>
      </Grid>

      <Typography component="h6" variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        When and Where
      </Typography>
      <Grid align="center" item xs={12} md={12} sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Card sx={{ flex: 1, boxShadow: 2 }}>
          <CardContent sx={{ mt: 3.5 }}>
            <Grid container rowSpacing={1} >
              <Grid xs={6}>
                <Typography component="h5" variant="h5">
                  <CalendarMonthIcon />
                  Date
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography component="h5" variant="h5">
                  <AccessTimeIcon />
                  Time
                </Typography>
              </Grid>
              <Grid xs={6}>
                {date}
              </Grid>
              <Grid xs={6}>
                {time}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, boxShadow: 2 }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h5" variant="h5">
              <LocationOnIcon />
              Location
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: "normal", fontStyle: "normal" }}>
              {location}
            </Typography>

          </CardContent>
        </Card>
      </Grid>
      <Divider />

      <Grid item xs={12} md={12} sx={{ mt: 3, mb: 3 }}>
        <Typography component="h6" variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          About this event
        </Typography>
        <Grid item xs={5} md={5} sx={{ mt: 1 }}>
          <Card sx={{ display: 'flex', boxShadow: 0 }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h8" variant="h8" gutterBottom>
                <AccessTimeIcon /> {runtime}
              </Typography>

            </CardContent>
            <CardContent sx={{ flex: 2 }}>
              <Typography component="h8" variant="h8" gutterBottom>
                <BookOnlineIcon /> {type}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Typography variant="h6" component="h7" color="black" sx={{ fontWeight: "normal", fontStyle: "normal" }}>
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default MainEvent;