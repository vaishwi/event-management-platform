/**
 * @author Khushi Shah (B00923816)
 * This is the component shows the details of the event
 * This component imports various MUI Components, it calls various other components which are used to display the details of the events
 */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from './MainFeaturedPost';
import MainEvent from './MainEvent';
import Sidebar from './Sidebar';
import Footer from './Footer';
import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useParams } from "react-router-dom";
import axios from 'axios';


const sidebar = {
  social: [
    { name: 'Instagram', icon: InstagramIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const theme = createTheme();

const Blog = () => {
  const params = useParams();
  const location = useLocation();

  const [data, setData] = useState(null);

  useEffect(() => {
    { console.log(location.state) }
    if (location.state != null) {
      setData(location.state);
    }
    if (params.hasOwnProperty('id')) {
      let url = `${import.meta.env.VITE_SERVER_URL}/event/${params.id}`
      axios.get(url)
        .then(res => {
          setData(res.data);
        });
    }
  }, [])

  return (
    <> {
      data ? (
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg" sx={{ boxShadow: 5, borderRadius: 4, padding: 1, mt: 2 }}>
            <main>
              <div className="mainEventImage">
                <MainFeaturedPost title={data.title} image={data.banner_image} />
              </div>
              {console.log(data?.organizer)}
              <Grid container spacing={2}>
                <MainEvent description={data.description} type={data.type} runtime={data.runtime} time={data.time} location={data.address} organizer={data.organizer} date={data.date} title={data.title} />
                <Sidebar
                  price={data.price}
                  social={sidebar.social}
                  title={data.title}
                  url={data.icon}
                  type={data.type}
                  eventState={data}
                />
              </Grid>
              <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                  <CardActionArea >
                    <Card sx={{ display: 'flex' }}>
                      {data.images.map((element, index) => (
                        <CardMedia
                          src={element}
                          component="img"
                          sx={{ width: 100, flex: 1, }}
                        />
                      ))}
                    </Card>
                  </CardActionArea>
                </Grid>
              </Grid>
            </main>
          </Container>
          <Footer />
        </ThemeProvider>
      ) : (
        <div> No data </div>
      )
    } </>

  );
}

export default Blog;
