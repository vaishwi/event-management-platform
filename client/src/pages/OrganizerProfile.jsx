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

const theme = createTheme();
const SERVER_ERROR = "Sever Error. Please try again.";
const SUBSCRIPTION_MESSAGE = "Successfully Subscribed.";



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

const OrganizerProfile = () => {
  const classes = useStyles();
  const user = localStorage.getItem("user");
  // const organizer = useLocation().state.organizer;
  var organizerId
    try {
        organizerId = useLocation().state.organizerId;
    } catch (e) {
        organizerId = JSON.parse(user).id;
    }
//   const organizerId = useLocation().state.organizerId;
  const naviagte = useNavigate();

  console.log(organizerId);
  const [isAuthenticated, setIsAutenticated] = useState();

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogDiscription, setDialogDiscription] = useState("");
  const REMOVE_DIALOG_DESCR = "Organizer removed successfully.";
  const AUTHENTICATE_DIALOG_DESCR =
    "Authentication Successful. Now you can post events.";

  // const USER_TYPE = "attendee"
  const IS_ATTENDEE = JSON.parse(user).userType == "attendee";
  const IS_ORGANIZER = JSON.parse(user).userType == "organizer";
  const IS_ADMIN = JSON.parse(user).userType == "admin";

  const [organizer, setOrganizer] = useState({});

  const [attendeeId, setAttendeeID] = useState("");
  const [hasAttendeeSubscribed, setHasAttendeeSubscribed] = useState("");

  // console.log(JSON.parse(user))

  useEffect(() => {
    axios({
      // Endpoint to fetch organizer profile
      url: `${import.meta.env.VITE_SERVER_URL}/organizer/${organizerId}`,
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      // Handle the response from backend here
      .then((res) => {
        console.log(res);
        setOrganizer(res.data);
        setIsAutenticated(res.data.isAuthenticated);
      })

      // Catch errors if any
      .catch((err) => {});
    if (IS_ATTENDEE) {
      let attendee = localStorage.getItem("user");
      attendee = JSON.parse(attendee);
      setAttendeeID(attendee.id);
      // API CALL TO CHECK IF ATTENDEE IS ALREADY SUBSCRIBED OR NOT
      console.log("In call of getting subscription detail.")
      const data_json = { organizerId: organizerId, attendeeId: attendee.id }
      console.log(data_json)
      axios({
        // Endpoint to send files
        url: `${import.meta.env.VITE_SERVER_URL}/checksubscription`,
        method: "POST",
        // headers: {
        //   "Access-Control-Allow-Origin": "*",
        // },
        data: data_json,
      })
        .then((res) => {
            console.log(res)
            console.log(res.data.is_subscribed)
          setHasAttendeeSubscribed(res.data.is_subscribed);
          
        })
        .catch((err) => {});
    }
  }, [hasAttendeeSubscribed]);

  const openDialogBox = (description) => {
    if (IS_ATTENDEE) {
      console.log("In subscribe")
      console.log("AttendeeId")
      console.log(attendeeId)
      console.log("organizer")
      console.log(organizerId)
      axios({
        url: `${import.meta.env.VITE_SERVER_URL}/subscribe`,
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        data: { organizerId: organizerId, attendeeId: attendeeId },
      })
        .then((res) => {
          setOpenDialog(true);
          setDialogDiscription(SUBSCRIPTION_MESSAGE);
          setHasAttendeeSubscribed(true)
        })
        .catch((err) => {
          setOpenDialog(true);
          setDialogDiscription(SERVER_ERROR);
        });
    } else if (IS_ADMIN) {
      if (isAuthenticated) {
        axios({
          url: `${import.meta.env.VITE_SERVER_URL}/organizer/${organizerId}`,
          method: "DELETE",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then((res) => {
            setOpenDialog(true);
            setDialogDiscription(description);
          })
          .catch((err) => {
            setOpenDialog(true);
            setDialogDiscription(SERVER_ERROR);
          });
      } else {
        axios({
          url: `${import.meta.env.VITE_SERVER_URL}/authenticate/${organizerId}`,
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then((res) => {
            setOpenDialog(true);
            setDialogDiscription(description);
            setIsAutenticated(true);
          })
          .catch((err) => {
            setOpenDialog(true);
            setDialogDiscription(SERVER_ERROR);
          });
      }
    }
  };

  const handleAuthenticationRemoveClick = () => {
    setOpenDialog(false);
    if(IS_ADMIN){
        naviagte("/organizers");
    }
    
    console.log("In click");
  };

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
              {organizer.organizationName}
            </Typography>
            <Typography variant="subtitle1" align="center">
              {organizer.subscribers} Subscribers
            </Typography>

            <Typography variant="subtitle2" align="center" sx={{mt:2}}>
              <LocationOn
                fontSize="small"
                className={classes.contactInfoIcon}
              />
                            {organizer.location}
                        </Typography>
                        <Typography variant="subtitle2" align="center" >

              {organizer.city + " "+organizer.state}
            </Typography>
            {IS_ATTENDEE && (
              <div align="center">
                <Button
                  variant="contained"
                  disabled={hasAttendeeSubscribed}
                  sx={{ mt: 10 }}
                  onClick={() => openDialogBox(SUBSCRIPTION_MESSAGE)}>
                  {hasAttendeeSubscribed ? "Subscribed" : "Subscribe"}
                 
                </Button>
              </div>
            )}

            <Divider sx={{ m: 5 }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} sx={{ mt: 2 }}>
          <Paper elevation={3} className={classes.contactInfo}>
            <Typography variant="h5" align="center">
              Organization Information
            </Typography>
            <div className={classes.contactInfoItem}>
              <Typography
                variant="subtitle1"
                paragraph={true}
                className={classes.contactInfoIcon}>
                {organizer.about}
              </Typography>
            </div>
            <div className={classes.contactInfoItem}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold" }}
                className={classes.contactInfoIcon}>
                Managed By :
              </Typography>
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                {organizer.managedBy}
              </Typography>
            </div>
            <div className={classes.contactInfoItem}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold" }}
                className={classes.contactInfoIcon}>
                Occupation :
              </Typography>
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                {organizer.occupation}
              </Typography>
            </div>
            <div className={classes.contactInfoItem}>
              <EmailRounded />
              <Typography variant="subtitle1" sx={{ ml: 2 }}>
                {" "}
                {organizer.email}
              </Typography>
            </div>
            <div className={classes.contactInfoItem}>
              <Phone />
              <Typography variant="subtitle1" sx={{ ml: 2 }}>
                {organizer.contactNo}
              </Typography>
            </div>

            <div className={classes.contactInfoItem}>
              <Business />
              <Typography variant="subtitle1" sx={{ ml: 2 }}>
                {organizer.location}
              </Typography>
            </div>

            {IS_ADMIN &&
              (isAuthenticated == true ? (
                <div align="center">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => openDialogBox(REMOVE_DIALOG_DESCR)}>
                    {" "}
                    Remove{" "}
                  </Button>
                </div>
              ) : (
                <div align="center">
                  <Button
                    variant="contained"
                    onClick={() => openDialogBox(AUTHENTICATE_DIALOG_DESCR)}>
                    {" "}
                    Authenticate{" "}
                  </Button>
                </div>
              ))}

            {IS_ORGANIZER && (
              <div align="center">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    naviagte("/editOrganizer", {
                      state: { organizer: organizer },
                    });
                  }}>
                  {" "}
                  Edit{" "}
                </Button>
              </div>
            )}

            <CustomDialogBox
              openDialog={openDialog}
              dialogDiscription={dialogDiscription}
              handleClose={handleAuthenticationRemoveClick}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrganizerProfile;

