// @mui
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

export default function MyEventsComponent() {

  return (

      <Container sx = {{mt:5}}>
      <Typography align = "center" component = "h4" variant="h4" gutterBottom sx = {{fontWeight:"bolder", mb:2}}>
        My Registered Events
      </Typography>
      <Divider />
        <Card sx = {{width:1, mt:4}} >
            <TableContainer >
              <Table>
                <TableBody >
                    <TableRow hover tabIndex={-1} sx={{ height:100}} >
                        <TableCell component="th" scope="row" padding="none" >
                            <Stack direction="row" alignItems="center" spacing={1} sx = {{ml:5, mr:5}}>
                                <Typography component="div" variant="body1" sx = {{fontWeight:"bold"}} align = "center">
                                      <h2>March</h2>
                                      <h2>23</h2>
                                </Typography>
                                <CardMedia
                                    src = 'Images/Event1.png'
                                    component="img"
                                    sx={{ width:0.3, height:1, padding:2}}
                                />
                                <Typography component="div" variant="body1" sx = {{fontWeight:"bold"}}>
                                      <h2>Unicycling Race</h2><br />
                                      Thu, March 23rd. 10:00 AM ADT <br />
                                      Order placed today at 9:00 AM
                                </Typography>
                                <Box sx={{ flexGrow: 1, padding: 1}}>
                                      <Grid container >
                                        <Grid item xs={12}>
                                          <Button style={{maxWidth: '100%', maxHeight: '100%', minWidth: '30px', minHeight: '30px'}} sx = {{bgcolor: 'green', alignItems:"center", mb:2}} size = "large" fullWidth = "true" variant="contained" onClick={() => handleRedirection('/checkout')}>Print tickets</Button>
                                          <Button style={{maxWidth: '100%', maxHeight: '100%', minWidth: '30px', minHeight: '30px'}} sx = {{bgcolor: 'red', alignItems:"center"}} size = "large" fullWidth = "true" variant="contained" onClick={() => handleRedirection('/checkout')}>Cancel Registration</Button>

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
        </Card>
      </Container>
  );
}
