/**
 * A React component that displays user information and allows the user to edit their profile.
 * @returns {JSX.Element} - A React component that displays user information and allows the user to edit their profile.
 */
import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  createTheme,
  Divider,
} from "@mui/material";
import {
  LocationOn,
  EmailRounded,
  Phone,
  Business,
  PersonAdd,
} from "@mui/icons-material";
import CustomDialogBox from "../components/CustomDialogBox.jsx";
import axios from "axios";
import WorkIcon from '@mui/icons-material/Work';
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";

const theme = createTheme();

const SERVER_ERROR = "Sever Error. Please try again.";
const SUBSCRIPTION_MESSAGE = "Successfully Subscribed.";

/**
 * Defines the styles for a component using the makeStyles hook from Material-UI.
 * @returns An object containing the CSS styles for the component.
 */
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  avatar: {
    margin: `${theme.spacing(3)} 0`,
  },
  contactInfo: {
    padding: theme.spacing(3),
  },
  contactInfoItem: {
    display: "flex",
    alignItems: "center",
    margin: `${theme.spacing(2)} 0`,
  },
  subscribeButton: {
    display: "flex",
    margin: `${theme.spacing(3)} 0`,
    alignItems: "center",
  },
  contactInfoIcon: {
    marginRight: theme.spacing(1),
  },
}));

const AttendeeProfile = () => {
  const classes = useStyles();
  const user = localStorage.getItem("user");
  const attendeeId = JSON.parse(user).id;

  const naviagte = useNavigate();

  const [attendee, setAttendee] = useState({});

  
  /**
   * Fetches attendee data from the server and sets the attendee state.
   * @param {{string}} attendeeId - The ID of the attendee to fetch.
   */
  useEffect(() => {
    console.log("attendeeId:", attendeeId);

    axios({
      // Endpoint to fetch organizer profile
      url: `${import.meta.env.VITE_SERVER_URL}/attendee/${attendeeId}`,
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      // Handle the response from backend here
      .then((res) => {
        console.log(res);
        setAttendee(res.data);
      })

      // Catch errors if any
      .catch((err) => {});
  }, []);

  /**
   * Renders a container with attendee information, including their profile picture, name, location, 
   * occupation, contact information, and subscribed organizations.
   * @param {{Object}} attendee - The attendee object containing their information.
   * @returns A container with the attendee's information.
   */
  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ margin: "16px 0px" }}>
            <Divider />
            <div align="center">
              <Typography sx={{ mt: 5 }}> </Typography>
              <Avatar
                alt="Profile Picture"
                src="https://picsum.photos/200"
                className={classes.avatar}
                sx={{ width: 150, height: 150 }}
              />
            </div>

            <Typography variant="h5" align="center">
              {attendee.firstName} {attendee.lastName}
            </Typography>
            {/* <Typography variant="subtitle1" align="center">
              {organizer.subscribers} Subscribers
            </Typography> */}

            <Typography variant="subtitle2" align="center" sx={{ mt: 2 }}>
              <LocationOn
                fontSize="small"
                className={classes.contactInfoIcon}
              />
              {attendee.location}
            </Typography>
            <Typography variant="subtitle2" align="center">
              {/* {attendee.city + " " + attendee.state} */}
              {attendee.city ? attendee.city : "City"} ,{" "}
              {attendee.state ? attendee.state : "State"}
            </Typography>

            <Divider sx={{ m: 5 }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} sx={{ mt: 2 }}>
          <Paper elevation={3} className={classes.contactInfo}>
            <Typography variant="h5" align="center">
              User Information
            </Typography>
            <div className={classes.contactInfoItem}>
              <Typography
                variant="subtitle1"
                paragraph={true}
                className={classes.contactInfoIcon}>
                {attendee.about}
              </Typography>
            </div>
            
            <div className={classes.contactInfoItem}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold" }}
                              className={classes.contactInfoIcon}>
                              <WorkIcon />
              </Typography>
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                {attendee.occupation ? attendee.occupation : "Not set"}
              </Typography>
            </div>
            <div className={classes.contactInfoItem}>
              <EmailRounded />
              <Typography variant="subtitle1" sx={{ ml: 2 }}>
                {" "}
                {attendee.email}
              </Typography>
            </div>
            <div className={classes.contactInfoItem}>
              <Phone />
              <Typography variant="subtitle1" sx={{ ml: 2 }}>
                {attendee.contactNo}
              </Typography>
            </div>

            <div className={classes.contactInfoItem}>
              <Business />
              <Typography variant="subtitle1" sx={{ ml: 2 }}>
                {attendee.location ? attendee.location : "Not set"}
              </Typography>
            </div>
            <div>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold" }}
                              className={classes.contactInfoIcon}>
                              <SubscriptionsIcon /> Subscribed Organizations 
              </Typography> 
              <Typography variant="subtitle1" sx={{ ml: 2 }}>
                {attendee.subscribered_organization ? attendee.subscribered_organization.map((organizer) => <li>{organizer.organizationName}</li>) : "Not set"}
              </Typography>
            </div>
            <div align="center">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  naviagte("/editAttendee", {
                    state: { attendee: attendee },
                  });
                }}>
                {" "}
                Edit{" "}
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AttendeeProfile;
