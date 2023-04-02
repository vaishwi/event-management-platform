import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
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
      key: '1',
      icon: '../Images/Event1.png',
      hoverIcon: '../Images/Event1.png',
      title: 'Unicycling Race',
      price: '40',
      date: 'March 23,2023',
      time: '4 PM Onwards',
      location: 'Citadel Hill Halifax',
      url: '/event',
      detailedTitle: 'Unicycling race - March 23,2023',
      eventInfo: "Unicycling race age dependent, winners will get excited prizes. It's a fund raising event",
      organizer: 'Halifax Community Center',
      runtime: '3',
      ticket: 'Mobile e-ticket',
      image1: '../Images/Event1.1.jpg',
      image2: '../Images/Event1.2.jpg',
      image3: '../Images/Event1.3.png',
      image4: '../Images/Event1.4.jpg',
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    }
    const [data, setData] = useState(null);

    useEffect(() => {
        {console.log(location.state)}
        if(location.state != null){
            setData(location.state);
        }
        if(params.hasOwnProperty('id')){
          setData(eve)
        }
    },[])

    return (
        <> {
            data ? (
              <ThemeProvider theme={theme}>
              <Container maxWidth="lg" sx = {{boxShadow:5, borderRadius:4, padding: 1,mt:2}}>
                <main>
                  <div className = "mainEventImage">
                    <MainFeaturedPost title = {data.title} image= {data.banner_image} />
                  </div>
{                        console.log(data?.organizer)}
                  <Grid container spacing={2}>
                    <MainEvent description = {data.description} type = {data.type} runtime = {data.runtime} time = {data.time} location = {data.address} organizer = {data.organizer} date = {data.date} title= {data.title} />
                    <Sidebar
                      price = {data.price}
                      social={sidebar.social}
                      title = {data.title}
                      url = {data.icon}
                      type = {data.type}
                      eventState = {data}
                    />
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={10} md={12}>
                          <CardActionArea >
                            <Card sx={{ display: 'flex' }}>
                            {data.images.map((element, index) => (
                               <CardMedia
                                 src = {element}
                                 component="img"
                                 sx={{ width: 100, flex:1, display: { xs: 'none', sm: 'block' } }}
                               />
                            ))}
                            </Card>
                          </CardActionArea>
                        </Grid>
                  </Grid>
                </main>
              </Container>
              <Footer/>
              </ThemeProvider>
            ) : (
                <div> No data </div>
            )
        } </>

    );
}

export default Blog;
