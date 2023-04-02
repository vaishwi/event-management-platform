import { ListItem, ListItemText, Divider } from '@mui/material'

const SubscriberItem = (props) => {
    
    const subscriber = props.subscriber
    
    return ( 
        <div>
        <ListItem>
                <ListItemText primary={subscriber.name} secondary={subscriber.location}>Student of Dalhousie</ListItemText>
                <ListItemText sx={{ml:-5}} primary = "Student of Dalhousie" secondary="Subscription Date: 19th January 2020"></ListItemText>
        </ListItem>
        <Divider/>
    </div>
     );
}
 
export default SubscriberItem;