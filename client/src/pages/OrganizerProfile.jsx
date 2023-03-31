import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useLocation } from "react-router-dom"
import {
    Avatar,
    Button,
    Container,
    Grid,
    Paper,
    Typography,
    createTheme,
    Divider
} from '@mui/material';
import { LocationOn,EmailRounded,Phone,Business, PersonAdd } from '@mui/icons-material';
import CustomDialogBox from "../components/CustomDialogBox.jsx";
import axios from "axios";

const theme = createTheme();

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    avatar: {
        margin: `${theme.spacing(3)} 0`,
        
    },
    contactInfo: {
        padding: theme.spacing(3),
    },
    contactInfoItem: {
        display: 'flex',
        alignItems: 'center',
        margin: `${theme.spacing(2)} 0`,
    },
    subscribeButton:{
        display: 'flex',
        margin: `${theme.spacing(3)} 0`,
        alignItems:'center',
    },
    contactInfoIcon: {
        marginRight: theme.spacing(1),
    },

}));

const OrganizerProfile = () => {
    const classes = useStyles();

    // const organizer = useLocation().state.organizer;
    const organizerId = useLocation().state.organizerId;
    console.log(organizerId)
    const [isAuthenticated,setIsAutenticated] = useState()

    const [openDialog,setOpenDialog] = useState(false);
    const [dialogDiscription,setDialogDiscription] = useState("");
    const REMOVE_DIALOG_DESCR = "Organizer removed successfully."
    const AUTHENTICATE_DIALOG_DESCR = "Authentication Successful. Now you can post events."
    const user = localStorage.getItem("user")
    const USER_TYPE = "user"
    const IS_USER = JSON.parse(user).userType == USER_TYPE
    const [organizer,setOrganizer] = useState({})

    // console.log(JSON.parse(user))

    useEffect( ()=>{
        axios({
  
            // Endpoint to send files
            url: "http://127.0.0.1:5000/organizer/"+organizerId,
            method: "GET",
            headers:{
                "Access-Control-Allow-Origin": "*"
            }

          })
        
            // Handle the response from backend here
            .then((res) => {
                console.log(res)
                setOrganizer(res.data)
                setIsAutenticated(res.data.isAuthenticated)
             })
        
            // Catch errors if any
            .catch((err) => { });
    
    })

    const openDialogBox = (description) =>{
        setOpenDialog(true)
        setDialogDiscription(description)

    }

    const handleAuthenticationRemoveClick = () =>{
        setOpenDialog(false)
        console.log("In click")
    }
    

    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} style = {{margin: "16px 0px"}}>
                        <Divider />
                        <div align="center">
                            <Typography sx = {{mt:5}}>   </Typography>
                            <Avatar
                                alt="Profile Picture"
                                src="https://picsum.photos/200"
                                className={classes.avatar}
                                sx={{ width: 150, height: 150}}   
                            />
                        </div>
                        
                        <Typography variant="h5" align="center">
                           {organizer.organizationName}
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                        {organizer.subscribers} Subscribers
                        </Typography>
                      
                        <Typography variant="subtitle2" align="center">
                            <LocationOn fontSize="small" className={classes.contactInfoIcon} />
                            {organizer.state}
                        </Typography>
                       {IS_USER && <div align="center">
                       
                       <Button variant="contained" sx={{mt:10}}>Subscribe</Button>
                   </div> } 
                        
                        <Divider sx={{m:5}}/>
                        
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8} sx = {{mt:2}}>
                    <Paper elevation={3} className={classes.contactInfo}>
                        <Typography variant="h5" align="center">
                            Organization Information
                        </Typography>
                        <div className={classes.contactInfoItem}>
                            <Typography variant="subtitle1" paragraph={true} className={classes.contactInfoIcon}>
                            {organizer.about}
                            </Typography>
                            
                        </div>
                        <div className={classes.contactInfoItem}>
                            <Typography variant="subtitle1" sx={{fontWeight: 'bold'}} className={classes.contactInfoIcon}>
                                Managed By : 
                            </Typography>
                            <Typography variant="subtitle1" sx={{ml:1}}>{organizer.managedBy}</Typography>
                        </div>
                        <div className={classes.contactInfoItem}>
                            <Typography variant="subtitle1" sx={{fontWeight: 'bold'}} className={classes.contactInfoIcon}>
                                Occupation : 
                            </Typography>
                            <Typography variant="subtitle1" sx={{ml:1}}>{organizer.occupation}</Typography>
                        </div>
                        <div className={classes.contactInfoItem}>
                            <EmailRounded/>
                            <Typography variant="subtitle1" sx={{ml:2}}> {organizer.email}</Typography>
                        </div>
                        <div className={classes.contactInfoItem}>
                            <Phone />
                            <Typography variant="subtitle1" sx={{ml:2}}>{organizer.contactNo}</Typography>
                        </div>
                       
                        <div className={classes.contactInfoItem}>
                            <Business />
                            <Typography variant="subtitle1" sx={{ml:2}}>{organizer.location}</Typography>
                        </div>
                        
                        {!IS_USER &&( isAuthenticated ==true ? 
                            <div align="center">
                                <Button variant='outlined' color="error" onClick={() => openDialogBox(REMOVE_DIALOG_DESCR,)}> Remove </Button>
                            </div> 
                            
                            :<div align="center">
                                <Button variant='contained' onClick={() => openDialogBox(AUTHENTICATE_DIALOG_DESCR)}> Authenticate </Button>
                            </div>)
                        }
                        <CustomDialogBox openDialog={openDialog} dialogDiscription={dialogDiscription} handleClose={handleAuthenticationRemoveClick}/> 
                        
                </Paper>

            </Grid>
        </Grid>
</Container >
);
};

export default OrganizerProfile;

