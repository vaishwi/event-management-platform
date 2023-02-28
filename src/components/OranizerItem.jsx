import {ListItem, ListItemText, ListItemButton, Divider, Button } from '@mui/material'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import CustomDialogBox from "./CustomDialogBox.jsx";

const OrganizerItem = (organizer) => {
    
    const naviagte = useNavigate();
    const organizerInfo = organizer.organizer;


    const [openDialog,setOpenDialog] = useState(false);
    const [dialogDiscription,setDialogDiscription] = useState("Authentication Successful. Now you can post events.");

    const handleClick = () =>{
        console.log(organizer);
        naviagte("/organizerProfile",{state: {organizer:organizerInfo}})
        
    }

    const handleAuthenticationClick = () =>{
        setOpenDialog(false)
        console.log("In authentication handle")
    }


    const openDialogBox= () => {
        setOpenDialog(true)
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