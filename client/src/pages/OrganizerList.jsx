import { useEffect, useState } from "react";
import { Box,Typography } from '@mui/material'
import OrganizerItem from "../components/OranizerItem";
import axios from "axios";
import { Divider } from "antd";


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
                url: `${import.meta.env.VITE_SERVER_URL}/unauthOrganizers`,
                method: "GET",
                headers:{
                    "Access-Control-Allow-Origin": "*"
                }
              })
            
                // Handle the response from backend here
                .then((res) => {
                    console.log(res)
                    console.log(res.data.data)
                    setUnAuthenticatedOrganizerList(res.data.data)
    
                 })
            
                // Catch errors if any
                .catch((err) => { });
    
        }else{
            // https://www.geeksforgeeks.org/axios-in-react-a-guide-for-beginners/
        axios({
  
            // Endpoint to send files
            url: `${import.meta.env.VITE_SERVER_URL}/organizers`,
            method: "GET",
            headers:{
                "Access-Control-Allow-Origin": "*"
            }
          })
        
            // Handle the response from backend here
            .then((res) => {
                console.log(res)
                console.log(res.data.data)
                setOrganizerList(res.data.data)

             })
        
            // Catch errors if any
            .catch((err) => { });
        }

    },[isAutheticationRequests])

    return (
    <div>
       < Box sx={{ mt:5,ml:30,mr:30,}}>
        <Typography variant="h3" component="h2" align="center">
            {isAutheticationRequests == true ? "Authentication Requests" : "Organizers List"}
            
        </Typography>
        <Divider/>
        <Typography variant="h5" component="h2" align="center">
            
            {isAutheticationRequests == true ? (unAuthenticatedOrganizerList.length==0 ?"No pending requests.":""):""}
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