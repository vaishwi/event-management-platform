import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import PaymentComponent from '../../components/paymentComponent.jsx';

export default function PaymentForm() {
const theme = createTheme();

const [showPayments, setShowPayments] = React.useState(false)
const onClick = () => setShowPayments(true)

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Typography align = "center" component = "h4" variant="h4" gutterBottom sx = {{fontWeight:"bolder", mt:5}}>
                Debit/Credit Cards
        </Typography>
        <Container align = "center" component="main" maxWidth="md" sx={{ mb: 4 }}>
          <Divider />
          <Grid item xs={12} md={8} sx = {{mt:3, mb:3}}>
            <Card sx = {{display: 'flex', boxShadow: 0.5}} style={{backgroundColor: "lightgray"}}>
                <CardContent sx = {{flex:3}}>
                    <Typography component="h6" variant="h6" gutterBottom>
                        <InfoIcon sx = {{mr:1, mt:2}}/>
                         You currently don't have any debit or credit cards saved.
                    </Typography>
                    <Typography component="h6" variant="h6" gutterBottom>
                    </Typography>
                </CardContent>
            </Card>
            <Divider/>
            <Button style={{maxWidth: '25%'}} sx = {{bgcolor: 'green', alignItems:"center", mt:2}} size = "large" fullWidth = "true" variant="contained" onClick={onClick}>Add your card</Button>
            { showPayments && <PaymentComponent />}

          </Grid>
        </Container>
      </ThemeProvider>
  );
}

