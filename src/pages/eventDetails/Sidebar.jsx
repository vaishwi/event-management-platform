import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";
import IncrementDecrement from './IncrementDecrement.jsx'
function Sidebar(props) {
  const { social, price, url, title } = props;
  const navigate = useNavigate();

    const handleRedirection = (element , url , title) => {
      navigate(element, {state : {
      url,
      title
      }});
    }

  return (
    <Grid item xs={12} md={4} sx = {{alignItems:"center"}} >
    {console.log(url)}
    {console.log(title)}

      <Paper elevation={0} sx={{ p: 5, bgcolor: 'grey.200' }}>
        <Box sx = {{padding: 1.2}}>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom sx = {{alignItems:"center", fontWeight:"bold"}} >
                  From ${price}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                 <IncrementDecrement />
              </Grid>
              <Grid item xs={12}>
                 <Button sx = {{bgcolor: 'red', alignItems:"center"}} size = "large" fullWidth = "true" variant="contained" onClick={() => handleRedirection('/checkout', url , title )}>Get tickets</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Typography></Typography>
      </Paper>


      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Social
      </Typography>
      {social.map((network) => (
        <Link
          display="block"
          variant="body1"
          href="#"
          key={network.name}
          sx={{ mb: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <network.icon />
            <span>{network.name}</span>
          </Stack>
        </Link>
      ))}
    </Grid>

  );
}


export default Sidebar;