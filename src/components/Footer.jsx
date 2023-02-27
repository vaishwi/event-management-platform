import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://reactjs.org/">
        eventify
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "#efefef", py: 3, mt: 3 }}
      className="footer">
      <Container maxWidth="lg">
        {/*<Typography variant="h6" align="center" gutterBottom>*/}
        {/*  {"Eventify"}*/}
        {/*</Typography>*/}
        {/*<Typography*/}
        {/*  variant="subtitle1"*/}
        {/*  align="center"*/}
        {/*  color="text.secondary"*/}
        {/*  component="p">*/}
        {/*  {"All rights are reserved"}*/}
        {/*</Typography>*/}
        <Copyright />
      </Container>
    </Box>
  );
}

export default Footer;
