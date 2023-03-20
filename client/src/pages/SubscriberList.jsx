import { useState } from "react";
import { Box, Typography } from '@mui/material'
import SubscriberItem from "../components/SubscriberItem";

const SubscriberList = (props) => {
    
    const subscriber1 = {id:1,name:"Vaishwi",location:"Halifax,NS"}
    const subscriber2 = {id:2,name:"Arpit",location:"Halifax,NS"}
    const subscriber3 = {id:3,name:"Purvesh",location:"Halifax,NS"}
    const subscriber4 = {id:4,name:"Khushi",location:"Halifax,NS"}
    const subscriber5 = {id:5,name:"Deep",location:"Halifax,NS"}

    

    const subList = [subscriber1,subscriber2,subscriber3,subscriber4,subscriber5]    
    
    const [subscriberList, setSubscriberList] = useState(subList)


    return (
    <div>
       < Box sx={{ mt:5,ml:30,mr:30,}}>
        <Typography variant="h3" component="h2" align="center">
            Subscriber List
        </Typography>
        </Box> 
        <Box sx={{ mt:5,ml:30,mr:30,bgcolor: '#efefef'}}> 
        
           { subscriberList.map( (sub) => <SubscriberItem subscriber = {sub}/>)}
            
         </Box>
        
    </div>  );
}
 
export default SubscriberList;