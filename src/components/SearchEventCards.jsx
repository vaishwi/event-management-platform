import React from "react";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { CardActionArea } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Chip from "@mui/material/Chip";

const EventCard = ({ event }) => {
  const eventDate = new Date(Date.parse(event.attributes.start_date));
  const eventPrice =
    event.attributes.price === 0 ? "Free" : `$ ${event.attributes.price}`;
  return (
    <CardActionArea component={RouterLink} to={`/event/${event.id}`}>
      <Grid
        className="card-container"
        container
        sx={{ padding: "1rem", boxShadow: 1, margin: "1rem 0" }}
        wrap="nowrap">
        <Grid item sm={12} md={8}>
          <CardHeader
            className="card-header"
            title={event.attributes.title}
            subheader={eventDate.toString()}
          />
          <CardContent>
            <div>
              <p
                style={{
                  padding: "0.5rem 0",
                }}>
                Location: {event.attributes.address}
              </p>
              <p>
                {event.attributes.city} , {event.attributes.country}
              </p>
              <Chip
                color="primary"
                label={eventPrice}
                sx={{
                  margin: "1rem 0",
                }}
              />
            </div>
          </CardContent>
        </Grid>

        <Grid
          item
          sm={12}
          md={4}
          sx={{ display: "flex", alignItems: "center" }}>
          <CardMedia
            className="card-media"
            component="img"
            sx={{ objectFit: "cover", maxHeight: "200px" }}
            image={event.attributes.image.data[0].attributes.url}
            alt={event.attributes.title}
          />
          {/*<Carousel>*/}
          {/*    {event.attributes.image.data.map((img) => {*/}
          {/*        return <CardMedia*/}
          {/*            className="card-media"*/}
          {/*            component="img"*/}
          {/*            sx={{objectFit: 'cover'}}*/}
          {/*            image={img.attributes.url}*/}
          {/*            alt={event.attributes.title}*/}
          {/*        />*/}
          {/*    })}*/}
          {/*</Carousel>*/}
        </Grid>
      </Grid>
    </CardActionArea>
  );
};

export default EventCard;
