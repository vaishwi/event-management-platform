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
import {useEffect, useState} from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import {toast} from "react-toastify"; // Import css
function DeleteEventButton(props) {
    const {index, social } = props;
    const navigate = useNavigate();
    const handleRedirection = (url) => {
        toast("Event Deleted Successfully")
        navigate(url);
        let devicesArray  = JSON.parse(localStorage.getItem("events"))
        let newList = devicesArray.filter(d => d.key !== index)
        localStorage.setItem("events", JSON.stringify(newList));
        console.log(JSON.parse(localStorage.getItem("events")),index,"pppp")

    }

    const submit = () => {
        confirmAlert({
            title: 'Are you sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleRedirection("/manageEvents")
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    };

    useEffect(()=>{
        console.log(index,"key>>>",social,props)
    },[])

    return (
        <Grid item xs={12} md={4} sx = {{alignItems:"center"}} >
            <Paper elevation={0} sx={{ p: 5, bgcolor: 'grey.200' }}>
                <Box sx = {{padding: 1.2}}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Button sx = {{bgcolor: 'red', alignItems:"center"}} size = "large" fullWidth = "true" variant="contained" onClick={submit}>Delete Event</Button>
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


export default DeleteEventButton;