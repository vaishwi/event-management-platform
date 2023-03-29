import { useEffect, useState } from "react";
import { Box,Typography } from '@mui/material'
import OrganizerItem from "../components/OranizerItem";
import axios from "axios";

const OrganizerList = (props) => {
    
    console.log(props.isAutheticationRequests)
    const isAutheticationRequests = props.isAutheticationRequests 
    const [unAuthenticatedOrganizerList,setUnAuthenticatedOrganizerList] = useState([]) 
    const [organizerList, setOrganizerList] = useState([])

    // https://legacy.reactjs.org/docs/hooks-effect.html
    useEffect( () =>{

        if(isAutheticationRequests){
            axios({
  
                // Endpoint to send files
                url: "http://127.0.0.1:5000/unauthOrganizers",
                method: "GET",

              })
            
                // Handle the response from backend here
                .then((res) => {
                    console.log(res)
                    console.log(res.data.data)
                    setUnAuthenticatedOrganizerList(res.data.data)
    
                 })
            
                // Catch errors if any
                .catch((err) => { });
    
        }

        // https://www.geeksforgeeks.org/axios-in-react-a-guide-for-beginners/
        axios({
  
            // Endpoint to send files
            url: "http://127.0.0.1:5000/organizers",
            method: "GET",
            // headers: {
        
            //   // Add any auth token here
            //   authorization: "your token comes here",
            // },
        
            // Attaching the form data
            // data: formData,
          })
        
            // Handle the response from backend here
            .then((res) => {
                console.log(res)
                console.log(res.data.data)
                setOrganizerList(res.data.data)

             })
        
            // Catch errors if any
            .catch((err) => { });

    })

    return (
    <div>
       < Box sx={{ mt:5,ml:30,mr:30,}}>
        <Typography variant="h3" component="h2" align="center">
            {isAutheticationRequests == true ? "Authentication Requests" : "Organizers List"}
        </Typography>
        </Box>
        <Box sx={{width: 'auto', mt:5,ml:5,mr:10,bgcolor: '#efefef'}}> 
        
        {/* {isAutheticationRequests == false ? organizerList.map( (org) => <OrganizerItem organizer = {org}/>) : unAuthenticatedOrganizerList.map( (org) => <OrganizerItem organizer = {org}/>)} */}

        {isAutheticationRequests == false ? 
            organizerList.map( (org) => <OrganizerItem organizer = {org}/>) : 
            unAuthenticatedOrganizerList.map( (org) => <OrganizerItem organizer = {org}/>)}
            
         </Box>
        
    </div>  );
}
 
export default OrganizerList;