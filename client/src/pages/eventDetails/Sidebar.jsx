import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IncrementDecrement from './IncrementDecrement.jsx'
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import {toast} from "react-toastify"; // Import css

function Sidebar(props) {
      const { social, price, url, title, type, eventState } = props;
      const navigate = useNavigate();

    const handleRedirection = (element, eventState) => {
      navigate(element, {state : {
        eventData: eventState,
        counter: counter
      }});
    }
    const [counter, setCounter] = useState(1);
    const [isRegistered, setIsRegistered] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [userType, setUserType] = useState(null);

    const handleDecrement = () => {
        setCounter(counter-1);
        }

    const handleIncrement = () => {
        setCounter(counter+1);
        }
      const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

    const handleDeleteRedirection = async (url) => {
        try {
            const response = await axios.delete('http://127.0.0.1:5000/deleteEventAdmin/' + eventState?.id)
            if(response.status === 200) {
                toast("Event Deleted Successfully")
                navigate(url);
            }
        } catch (e) {
            toast("Something went wrong")
            navigate(url);
        }

    }
    const submit = () => {
        confirmAlert({
            title: 'Are you sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDeleteRedirection("/manageEvents")
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    };

    const handleTableOpen = (i) => {
        console.log(i,"i>>>>>>>>>>")
        navigate('/viewAllUsers', {state: {eventID:i}})
    }

    const checkRegistered = async () => {
                try{
                const userID = localStorage.getItem('user');
                const id = JSON.parse(userID).id;
                console.log(id);
                    const response = await axios.get('http://127.0.0.1:5000/registerEvent/'+id+'/'+eventState?.id)
                    console.log(eventState?.id)
                    console.log(response.data)
                    if(response.data) {
                        setIsRegistered(true);
                    }
                    else {
                        setIsRegistered(false);
                    }
                } catch (e) {
                    console.log(e)
                    console.log(e.response.status)

                }
      };

    const cancelRegistration = async () => {
                try{
                    const response = await axios.delete('http://127.0.0.1:5000/deleteEvent/'+eventState?.id)
                    checkRegistered();
                    handleClose();

                } catch (e) {

                }
      };
    useEffect(() => {
        const user = localStorage.getItem('user');
        const userType = JSON.parse(user).userType;
        console.log(userType,"userTyp>>>>>>>>>>>>>>")
        console.log(eventState, "eventState>>>>>>>>")
        setUserType(userType);
        checkRegistered();
    },[])
  return (
    <Grid item xs={12} md={4} sx = {{alignItems:"center"}} >


      <Paper elevation={0} sx={{ p: 5, bgcolor: 'grey.200' }}>
        <Box sx = {{padding: 1.2}}>
            {userType != "admin" ?
                <Box sx={{ flexGrow: 1 }}>
            { type == 'Paid' && !isRegistered &&<Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom sx = {{alignItems:"center", fontWeight:"bold"}} >
                  From ${price}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                 <IncrementDecrement counter = {counter} handleIncrement = {handleIncrement} handleDecrement = {handleDecrement}/>
                 {console.log(counter)}
              </Grid>
              <Grid item xs={12}>
                 <Button sx = {{bgcolor: 'red', alignItems:"center"}} size = "large" fullWidth = "true" variant="contained" onClick={() => handleRedirection('/checkout', eventState )}>Get tickets</Button>
              </Grid>
            </Grid>
            }
            { type == 'Paid' && isRegistered &&<Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button sx = {{bgcolor: 'red', alignItems:"center"}} size = "large" fullWidth = "true" variant="contained">You are already Registered</Button>
                </Grid>
                 <Grid item xs={12}>
                     <Button sx = {{bgcolor: 'red', alignItems:"center"}} size = "large" fullWidth = "true" variant="contained" onClick={() => handleClickOpen()}>Click here to cancel your registeration!!</Button>
                 </Grid>
                </Grid>
            }
            { type != 'Paid'&& !isRegistered &&  <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button sx = {{bgcolor: 'red', alignItems:"center"}} size = "large" fullWidth = "true" variant="contained" onClick={() => handleRedirection('/registerEvent', eventState )}>Register Now</Button>
                </Grid>
                </Grid>
            }
            { type != 'Paid' && isRegistered &&  <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button sx = {{bgcolor: 'red', alignItems:"center"}} size = "large" fullWidth = "true" variant="contained">You are already Registered</Button>
                </Grid>
                 <Grid item xs={12}>
                     <Button sx = {{bgcolor: 'red', alignItems:"center"}} size = "large" fullWidth = "true" variant="contained" onClick={() => handleClickOpen()}>Click here to cancel your registeration!!</Button>
                 </Grid>
                </Grid>
            }
          </Box>:
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button sx = {{bgcolor: 'red', alignItems:"center"}} size = "large" fullWidth = "true" variant="contained" onClick={submit}>Delete Event</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button sx = {{bgcolor: 'blue', alignItems:"center"}} size = "large" fullWidth = "true" variant="contained" onClick={() => handleTableOpen(eventState?.id)}>View Registered Users</Button>
                        </Grid>
                    </Grid>
                </Box>
            }
        </Box>
        <Typography></Typography>
      </Paper>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to cancel your registration?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => handleClose()}>No</Button>
          <Button onClick={() => cancelRegistration()} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

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