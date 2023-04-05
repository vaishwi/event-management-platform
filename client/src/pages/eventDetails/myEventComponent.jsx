/**
 * @author Khushi Shah (B00923816)
 * This is the main component which is to see the registered events of the users and will allow the user to print the pdf
 *///
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardMedia,
  Table,
  Divider,
  Grid,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReactDOMServer from 'react-dom/server';

export default function MyEventsComponent() {
      const navigate = useNavigate();
      const[registeredEvents, setRegisteredEvents] = useState([]);
      const [open, setOpen] = React.useState(false);
      const[deleteID, setDeleteId] = useState([]);

          const fetchRegisteredEvents = async () => {
                      try{
                          const userID = localStorage.getItem('user');
                          const id = JSON.parse(userID).id;
                          const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/getUserRegisterEvents/${id}`);
                          console.log(response.data)
                          if(response.status === 200) {
                              setRegisteredEvents(response.data)
                          }
                      } catch (e) {
                          console.log(e)
                          console.log(e.response.status)

                      }
                  };
      const handleRedirection = (eventID) => {
           navigate('/event/'+eventID);
      };
      const cancelRegistration = async (eventID) => {
                      try{
                          const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/deleteEvent/${eventID}`)
                          fetchRegisteredEvents();
                          handleClose();
                      } catch (e) {

                      }
            };
      const handleClickOpen = (element) => {
      setDeleteId(element?.eventID);
              setOpen(true);
            };

      const handleClose = () => {
              setOpen(false);
            };
        const printPDF = (element) => {
          const content = ReactDOMServer.renderToString(
            <ul>
                <h2>Event: {element.eventName}</h2>
                <h2>Date: {element.eventDate}</h2>
                <h2>Time: {element.eventTime} Onwards</h2>
                <h2>Address: {element.eventAddress}</h2>
                <h2>City: {element.eventName}</h2>
                <h2>Country: {element.eventName}</h2>
                <h2>Ticket Quantity: {element.count}</h2>
                <h2> Price: {element.price} </h2>
                <h2> Event type: {element.eventType} </h2>
            </ul>

          );
          const pdfWindow = window.open('', '_blank');
          pdfWindow.document.write(`
            <html>
              <head>
                <title>Printable PDF</title>
              </head>
              <body>
                <div>${content}</div>
              </body>
            </html>
          `);
          pdfWindow.document.close();
          pdfWindow.print();
        };

      useEffect(() => {
                  fetchRegisteredEvents();
      },[])

  return (

      <Container sx = {{mt:5}}>
      <Typography align = "center" component = "h4" variant="h4" gutterBottom sx = {{fontWeight:"bolder", mb:2}}>
        My Registered Events
      </Typography>
      <Divider />
        <Card sx = {{width:1, mt:4}} >
        {console.log(registeredEvents)}
        { registeredEvents.length === 0 ?
            <Card sx = {{display: 'flex', boxShadow: 0.5}} style={{backgroundColor: "lightgray"}}>
                            <CardContent sx = {{flex:3}}>
                                <Typography component="h6" variant="h6" gutterBottom>
                                    <InfoIcon sx = {{mr:1, mt:2}}/>
                                     You have not registered in any events
                                </Typography>

                                <Typography component="h6" variant="h6" gutterBottom>
                                </Typography>
                            </CardContent>
                        </Card>
        :
                    registeredEvents
                       .map((element, index) => (
                       <>
            <TableContainer sx = {{mb:3}} >
              <Table>
                <TableBody >
                    <TableRow hover tabIndex={-1} sx={{ height:100}} >
                        <TableCell component="th" scope="row" padding="none" >
                            <Stack direction="row" alignItems="center" spacing={1} sx = {{ml:5, mr:5}}>
                                <Typography component="div" variant="body1" sx = {{fontWeight:"bold"}} align = "center">
                                      <h2>{element?.eventDate}</h2>
                                      <h2>{element?.eventTime}</h2>
                                </Typography>
                                <CardMedia
                                    src = {element.eventBanner}
                                    component="img"
                                    sx={{ width:0.3, height:1, padding:2}}
                                />
                                <Typography component="div" variant="body1" sx = {{fontWeight:"bold"}}>
                                      <h2 role="presentation" onClick={() => handleRedirection(element.eventID)} className="text-link">{element.eventName}</h2><br />
                                      {element.eventAddress} <br />
                                      {element.eventCity} <br />
                                      {element.eventCountry}
                                </Typography>
                                <Typography component="div" variant="body1" sx = {{fontWeight:"bold"}}>
                                      <h3>Ticket Count: {element.count}</h3>
                                      <h3>Price: $ {element.price}</h3>

                                </Typography>
                                <Box sx={{ flexGrow: 1, padding: 1}}>
                                      <Grid container >
                                        <Grid item xs={12}>
                                          <Button style={{maxWidth: '100%', maxHeight: '100%', minWidth: '30px', minHeight: '30px'}} sx = {{bgcolor: 'green', alignItems:"center", mb:2}} size = "large" fullWidth = "true" variant="contained" onClick={() => printPDF(element)}>Print tickets</Button>
                                          <Button style={{maxWidth: '100%', maxHeight: '100%', minWidth: '30px', minHeight: '30px'}} sx = {{bgcolor: 'red', alignItems:"center"}} size = "large" fullWidth = "true" variant="contained" onClick={() => handleClickOpen(element)}>Cancel Registration</Button>

                                        </Grid>
                                        <Grid item xs={12}>
                                        </Grid>
                                      </Grid>
                                    </Box>
                            </Stack>
                        </TableCell>
                     </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
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
                              <Button onClick={() => cancelRegistration(deleteID)} autoFocus>
                                Yes
                              </Button>
                            </DialogActions>
            </Dialog>
            </>
            ))}
        </Card>

      </Container>
  );
}
