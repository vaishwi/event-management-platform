import {ListItem, ListItemText, ListItemButton, Divider, Button } from '@mui/material'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import CustomDialogBox from "./CustomDialogBox.jsx";
import axios from "axios";

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


    const openDialogBox= () => {
        console.log("In open dialog box")
            axios({
                url: `${import.meta.env.VITE_SERVER_URL}/authenticate/${organizerInfo.id}`,
                method: "POST",
                headers:{
                    "Access-Control-Allow-Origin": "*"
                }
              }).then((res) => {
                setOpenDialog(true)
                // setIsAutenticated(true)
                organizerInfo.isAuthenticated = true
                 })
                .catch((err) => {
                    setOpenDialog(true)
                    setDialogDiscription(SERVER_ERROR)
                });

    }

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