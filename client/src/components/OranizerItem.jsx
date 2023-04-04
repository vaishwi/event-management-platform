/**
 * This module imports necessary components and hooks from the Material UI and React libraries.
 * It also imports a custom dialog box component and the Axios library for making HTTP requests.
 * @module
 */
import {ListItem, ListItemText, ListItemButton, Divider, Button } from '@mui/material'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import CustomDialogBox from "./CustomDialogBox.jsx";
import axios from "axios";

const BASE_URL= "http://127.0.0.1:5000/"
const SERVER_ERROR  = "Sever Error. Please try again."

const OrganizerItem = (organizer) => {
    
    const naviagte = useNavigate();
    const organizerInfo = organizer.organizer;


    const [openDialog,setOpenDialog] = useState(false);
    const [dialogDiscription,setDialogDiscription] = useState("Authentication Successful. Now you can post events.");

    const handleClick = () =>{
        console.log(organizer);
        naviagte("/organizerProfile",{state: {organizerId:organizerInfo.id}})
    }

    const handleAuthenticationClick = () =>{
        setOpenDialog(false)
        console.log("In authentication handle")
        
    }


    /**
     * Sends a POST request to the server to authenticate the organizer and opens a dialog box.
     */
    const openDialogBox= () => {
        console.log("In open dialog box")
        const url = BASE_URL+"authenticate/"+organizerInfo.id
                axios({
                    url: url,
                    method: "POST",
                    headers:{
                        "Access-Control-Allow-Origin": "*"
                    }
                  })
                    .then((res) => {
                        setOpenDialog(true)
                        // setIsAutenticated(true)
                        organizerInfo.isAuthenticated = true
                        
                     })
                    .catch((err) => { 
                        setOpenDialog(true)
                        setDialogDiscription(SERVER_ERROR)
                    });

    }

    /**
     * Renders a list item component with the organizer's information and an optional
     * authentication button.
     * @param {{Object}} organizerInfo - An object containing the organizer's information.
     * @param {{boolean}} isAuthenticated - A boolean indicating whether the organizer is authenticated.
     * @param {{Function}} openDialogBox - A function to open the authentication dialog box.
     * @param {{Function}} handleAuthenticationClick - A function to handle the authentication button click.
     * @param {{string}} dialogDiscription - A string describing the authentication dialog box.
     * @returns A React component that renders a list item with the organizer's information and an optional authentication button.
     */
    return ( 

        <div>
            <ListItem>
                
                <ListItemButton onClick={handleClick}>
                    <ListItemText primary={organizerInfo.organizationName} secondary={organizerInfo.managedBy} />
                    
                </ListItemButton>
                {!organizerInfo.isAuthenticated && 
                    <Button color='primary' variant="contained" onClick={openDialogBox}>Authenticate</Button>
                    }
                    <CustomDialogBox openDialog={openDialog} dialogDiscription={dialogDiscription} handleClose={handleAuthenticationClick}/> 
                
            </ListItem>
            <Divider/>
            
            
        </div>
    );
    }
 
export default OrganizerItem;