import { Box, List, ListItem, ListItemText, ListItemButton, Divider, Button } from '@mui/material'
import { Typography } from 'antd';

const SubscriberItem = (props) => {
    
    const subscriber = props.subscriber
    
    return ( 
        <div>
        <ListItem>
            
            
                
                <ListItemText primary={subscriber.name} secondary={subscriber.location}>Student of Dalhousie</ListItemText>
                <ListItemText sx={{ml:-5}} primary = "Student of Dalhousie" secondary="Subscription Date: 19th January 2020"></ListItemText>
                {/* <Typography sx={{ml:2}}>Student of dalhousie </Typography> */}
            
        </ListItem>
        <Divider/>
        
        
    </div>
     );
}
 
export default SubscriberItem;