import React from "react";
import Typography from "@mui/material/Typography";
import EventCard from "./SearchEventCards.jsx";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const TrendingEvents = ({events}) => {
  // const [result] = useQuery({
  //   query: GET_EVENTS,
  // });
  // const { data, fetching, error } = result;
  // if (fetching) return <p>Loading...</p>;
  // if (error) return <p>Error...{error.message}</p>;
  // const trendingEvents = data.events.data;

  return (
    <div>
      {/*<Typography variant="h4" component="h3" align="center">*/}
      {/*    Trending Events*/}
      {/*</Typography>*/}
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "gray.800",
          color: "#fafafa",
          mb: 4,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1262&q=80)`,
        }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom>
                {"Find your next event"}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {"Go Eventify!"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {events.map((event) => {
        return <EventCard key={event.id} event={event} />;
      })}
    </div>
  );
};

export default TrendingEvents;
