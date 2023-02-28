import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function EmailForgetPassword() {

    const emailValidation = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

    const [emailError, setEmailError] = React.useState(false);

    const handleEmailChange = (event) => {
        const newValue = event.target.value;
        // setEmail(newValue);
        if (!emailValidation.test(newValue)) {
            setEmailError(true);
        } else {
            setEmailError(false);
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
