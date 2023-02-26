import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material/";
import { Edit, Settings } from "@mui/icons-material";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     padding: theme.spacing(2),
//   },
//   avatar: {
//     width: theme.spacing(15),
//     height: theme.spacing(15),
//     margin: theme.spacing(2),
//   },
//   button: {
//     margin: theme.spacing(1),
//   },
// }));

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: 2,
    },
    avatar: {
      width: 15,
      height: 15,
      margin: 2,
    },
    button: {
      margin: 1,
    },
  }));

const Profile = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardHeader
              title="My Profile"
              action={
                <>
                  <IconButton>
                    <Settings />
                  </IconButton>
                  <IconButton>
                    <Edit />
                  </IconButton>
                </>
              }
            />
            <Divider />
            <CardContent>
              <Avatar
                alt="Profile Picture"
                src="https://picsum.photos/200"
                className={classes.avatar}
              />
              <Typography variant="h5" align="center">
                John Doe
              </Typography>
              <Typography variant="subtitle1" align="center">
                Software Developer
              </Typography>
              <Divider />
              <Typography variant="body1" align="left">
                <strong>Email:</strong> john.doe@example.com
              </Typography>
              <Typography variant="body1" align="left">
                <strong>Phone:</strong> (123) 456-7890
              </Typography>
              <Typography variant="body1" align="left">
                <strong>Location:</strong> New York, NY
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Card>
            <CardHeader title="My Skills" />
            <Divider />
            <CardContent>
              <Typography variant="body1" align="left">
                <strong>Programming Languages:</strong> JavaScript, Python, Java
              </Typography>
              <Typography variant="body1" align="left">
                <strong>Frameworks/Libraries:</strong> React, Node.js, Django
              </Typography>
              <Typography variant="body1" align="left">
                <strong>Tools/Technologies:</strong> Git, Docker, AWS
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Add Skill
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
