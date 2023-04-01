import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function EmailForgetPassword(props) {

    const emailValidation = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

    // const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState(false);

    

    const handleSubmit = (event) => {
        const code = Math.floor(100000 + Math.random() * 900000);
        const config = {
            SecureToken : "fc76aea0-116c-47b5-b1f7-636870591b32",
            To: email ,
            From : "eventifyG07@gmail.com",
            Subject : "Eventify forget password reset code",
            Body : "Your password reset code is: " + code
        }
        if (window.Email) {
            window.Email.send(config)
            .then((message) => console.log("email sent " + message))
        }
    }

    const handleEmailChange = (event) => {
        const newValue = event.target.value;
        // setEmail(newValue);
        if (!emailValidation.test(newValue)) {
            setEmailError(true);
            props.email("");
        } else {
            setEmailError(false);
            // setEmail(newValue);
            props.email(newValue);
        }
    };
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Registered Email Addrress
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleEmailChange}
                        error={emailError}
                        helperText={
                            emailError && "Please enter valid email address"
                        }
                        autoFocus
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
