import { useEffect, useState } from "react";
import { Box,Typography } from '@mui/material'
import OrganizerItem from "../components/OranizerItem";
import axios from "axios";

const OrganizerList = (props) => {
    
    console.log(props.isAutheticationRequests)
    const isAutheticationRequests = props.isAutheticationRequests
    // const contactNo = "+1 (902) 989-7898"
    // const orgAbout = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    // const email = "vs439755@dal.ca"
    // const location = "Halifax"

    // const organizer1 = {id:1,organizationName:"Eco Club",managedBy:"Vaishwi Patel", occupation:"Club Owner", about:orgAbout ,contactNo:contactNo, email:email, location:location, subscribers:100,state:"Halifax, NS", isAuthenticated:true}
    // const organizer2 = {id:2,organizationName:"Dalhousie",managedBy:"Arpitkumar Patel", occupation:"Dalhousie Event Manager", about:orgAbout ,contactNo:contactNo, email:email, location:location, subscribers:70,state:"Halifax, NS",isAuthenticated:true}
    // const organizer3 = {id:3,organizationName:"Fancy Dance Event",managedBy:"Purvesh Rathod", occupation:"Event Organizer", about:orgAbout ,contactNo:contactNo, email:email, location:location, subscribers:30,state:"Halifax, NS",isAuthenticated:false   }
    // const organizer4 = {id:4,organizationName:"Halifax Public Library",managedBy:"Khushi Shah", occupation:"Public Library ", about:orgAbout ,contactNo:contactNo, email:email, location:location, subscribers:25,state:"Halifax, NS",isAuthenticated:true}
    // const organizer5 = {id:5,organizationName:"Halifax Event Club", managedBy:"Deep Dave", occupation:"Club Owner", about:orgAbout ,contactNo:contactNo, email:email, location:location, subscribers:10,state:"Halifax, NS",isAuthenticated:false}

    // const organizerStaticList1 = [organizer1,organizer2,organizer3,organizer4,organizer5]    
    // const organizerStaticList2 = [organizer3,organizer5]   
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
        
        {isAutheticationRequests == false ? organizerList.map( (org) => <OrganizerItem organizer = {org}/>) : unAuthenticatedOrganizerList.map( (org) => <OrganizerItem organizer = {org}/>)}
            
         </Box>
        
    </div>  );
}
 
export default OrganizerList;