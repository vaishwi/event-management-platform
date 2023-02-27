import { Box, List, ListItem, ListItemText, ListItemButton, Divider, Button } from '@mui/material'
const OrganizerItem = (organizer) => {
    
    const organizerInfo = organizer.organizer;

    const handleClick = () =>{
        console.log(organizer);
    }
    return ( 
    // navigate("page route", { state: { inputs: inputs } })
    
    // onClick={() => {navigate('/info')}}
        <div>
            <ListItem>
                
                <ListItemButton onClick={handleClick}>
                    <ListItemText primary={organizerInfo.organizationName} secondary={organizerInfo.managedBy} />
                    
                </ListItemButton>
                <Button color='primary' variant="contained">Authenticate</Button>
                
            </ListItem>
            <Divider/>
            
            
        </div>
    );
    }
 
export default OrganizerItem;