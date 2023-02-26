import { useState } from "react";
import { Box } from '@mui/material'
import OrganizerItem from "../components/OranizerItem";

const OrganizerList = () => {
    const contactNo = "+1 (902) 989-7898"
    const orgAbout = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    const email = "vs439755@dal.ca"
    const location = "Halifax"
    const organizer1 = {id:1,organizationName:"Eco Club",managedBy:"Vaishwi Patel", occupation:"Club Owner", about:orgAbout ,contactNo:contactNo, email:email, location:location}
    const organizer2 = {id:2,organizationName:"Dalhousie",managedBy:"Arpitkumar Patel", occupation:"Dalhousie Event Manager", about:orgAbout ,contactNo:contactNo, email:email, location:location}
    const organizer3 = {id:3,organizationName:"Fancy Dance Event",managedBy:"Purvesh Rathod", occupation:"Event Organizer", about:orgAbout ,contactNo:contactNo, email:email, location:location}
    const organizer4 = {id:4,organizationName:"Halifax Public Library",managedBy:"Khushi Shah", occupation:"Public Library ", about:orgAbout ,contactNo:contactNo, email:email, location:location}
    const organizer5 = {id:5,organizationName:"Halifax Event Club", managedBy:"Deep Dave", occupation:"Club Owner", about:orgAbout ,contactNo:contactNo, email:email, location:location}

    const organizerStaticList = [organizer1,organizer2,organizer3,organizer4,organizer5]

    const [organizerList, setOrganizerList] = useState(organizerStaticList)

    return (
    <div>
        <Box sx={{width: 'auto', mt:5,ml:5,mr:10,bgcolor: '#efefef'}}> 
            {organizerList.map( (org) => <OrganizerItem organizer = {org}/>)}
         </Box>
        
    </div>  );
}
 
export default OrganizerList;