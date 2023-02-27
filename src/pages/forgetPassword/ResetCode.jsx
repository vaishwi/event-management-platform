import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function ResetCode() {

    
    const [codeError, setCodeError] = useState(false);
    const [code, setCode] = useState('');

    const handleCodeChange = (event) => {
        const newValue = event.target.value.replace(/[^0-9 +()-]/g, '');
        setCode(newValue);
        
        // const newValue = event.target.value;
        if (newValue.length < 4 || newValue.length > 4) {
            setCodeError(true);
        } else {
            setCodeError(false);
        }
    };
    
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Password Reset Code
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="code"
                        label="Reset Code"
                        name="code"
                        value={code}
                        autoComplete="code"
                        onChange={handleCodeChange}
                        error={codeError}
                        helperText={
                            codeError && "Code must be 4 digit"
                        }
                        autoFocus
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
