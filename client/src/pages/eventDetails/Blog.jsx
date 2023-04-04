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
  const navigate = useNavigate();

  const eve = {
    "title": "Right-sized radical productivity",
    "description": "Modi tempora tempora eius sed non. Magnam labore voluptatem quaerat dolorem. Consectetur numquam etincidunt consectetur modi. Labore sed sit etincidunt quiquia. Ipsum dolorem consectetur est amet sit. Ipsum magnam neque dolor. Numquam modi amet dolorem tempora est aliquam. Non ut velit voluptatem aliquam ut. Quaerat neque etincidunt eius dolor etincidunt. Dolorem voluptatem non quaerat.",
    "banner_image": "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0MTU0OTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk4NjY2MjA&ixlib=rb-4.0.3&q=85",
    "images": [
        "https://images.unsplash.com/photo-1472691681358-fdf00a4bfcfe?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0MTU0OTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk4NjY2MjA&ixlib=rb-4.0.3&q=85",
        "https://images.unsplash.com/photo-1514441615332-67834d513dea?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0MTU0OTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk4NjY2MjA&ixlib=rb-4.0.3&q=85",
        "https://images.unsplash.com/photo-1484494789010-20fc1a011197?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0MTU0OTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk4NjY2MjA&ixlib=rb-4.0.3&q=85",
        "https://images.unsplash.com/photo-1513623935135-c896b59073c1?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0MTU0OTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk4NjY2MjA&ixlib=rb-4.0.3&q=85",
        "https://images.unsplash.com/photo-1528605105345-5344ea20e269?crop=entropy&cs=srgb&fm=jpg&ixid=Mnw0MTU0OTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk4NjY2MjA&ixlib=rb-4.0.3&q=85"
    ],
    "date": "04/13/2023",
    "time": "17:00",
    "address": "01731 James Parkway Apt. 022, Ruthstad, KY 89084",
    "price": 62.73,
    "city": "Causse-de-la-Selle",
    "country": "France",
    "runtime": 1,
    "organizer": "10jp5Ijn3A9clKX06tk2",
    "type": "Paid",
    "id": "GNjdBgOM5G8kXTIzDCpB",
    "key": "event/GNjdBgOM5G8kXTIzDCpB"
  }
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
