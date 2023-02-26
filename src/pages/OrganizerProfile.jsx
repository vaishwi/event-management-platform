import { Avatar, ListItem, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system';
const OrganizerProfile = () => {
    return ( 
        <div>
            <Stack direction="row">
                <Box sx={{p:2,mx: 'auto', mt:5,ml:5,mr:10,bgcolor: '#efefef'}}>
                      <Avatar></Avatar>      
                      <Typography>Hello</Typography>
                </Box>
                <Box sx={{width: '200', mt:5,ml:5,mr:10,bgcolor: '#efefef'}}>
                    <Stack direction="column">
                        <ListItem>About</ListItem>
                        <ListItem>Managed By</ListItem>
                        <ListItem>Occupation</ListItem>
                        <ListItem></ListItem>
                    </Stack>               
                </Box>
            </Stack>
        </div>
    );
}
 
export default OrganizerProfile;