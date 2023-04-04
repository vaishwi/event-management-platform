/**
 * A functional component that renders a single subscriber item.
 * @param {{Object}} props - The props object containing the subscriber data.
 * @param {{Object}} props.subscriber - The subscriber object containing the subscriber's name, location, and subscription date.
 * @returns A React component that displays the subscriber's name, location, and subscription date.
 */
import { ListItem, ListItemText, Divider } from '@mui/material'

const SubscriberItem = (props) => {
    
    const subscriber = props.subscriber
    
    /**
     * Renders a list item with the subscriber's name, location, and subscription date.
     */
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