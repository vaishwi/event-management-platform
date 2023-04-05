/**
 * @author Khushi Shah (B00923816)
 * This is the component which calls another component that displays the event registered by the user
 */
import { Box } from '@mui/material';
import MyEventsComponent from './myEventComponent.jsx'
export default function RegisteredEvents() {

  return (
    <Box
      justifyContent="center"
      alignItems="center"
    >
      <MyEventsComponent />
    </Box>
  );
}
