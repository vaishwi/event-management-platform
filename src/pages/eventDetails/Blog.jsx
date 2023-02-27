import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedEvent from './FeaturedEvent';
import MainEvent from './MainEvent';
import Sidebar from './Sidebar';
import Footer from './Footer';
import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useParams } from "react-router-dom";


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
    console.log(params)
    const location = useLocation();
    const navigate = useNavigate();

    const [data, setData] = useState(null);

    useEffect(() => {
        {console.log(location.state)}
        if(location.state != null){
            setData(location.state);
        }
    },[])

    return (
        <> {
            data ? (
              <ThemeProvider theme={theme}>
              <Container maxWidth="lg" sx = {{boxShadow:5, borderRadius:4, padding: 1,mt:2}}>
                <main>
                  <div className = "mainEventImage">
                    <MainFeaturedPost title = {data.title} image= {data.icon} />
                  </div>
                  <Grid container spacing={2} sx={{ mt: 3}} >
                    <MainEvent about = {data.about} ticket = {data.ticket} runtime = {data.runtime} time = {data.time} location = {data.location} organizer = {data.organizer} date = {data.date} title= {data.detailedTitle} eventInfo={data.eventInfo} />
                    <Sidebar
                      price = {data.price}
                      social={sidebar.social}
                      title = {data.title}
                      url = {data.icon}
                    />
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={10} md={12}>
                          <CardActionArea >
                            <Card sx={{ display: 'flex' }}>
                              <CardMedia
                                src = {data.image1}
                                component="img"
                                sx={{ width: 100, flex:1, display: { xs: 'none', sm: 'block' } }}
                              />
                              <CardMedia
                                src = {data.image2}
                                component="img"
                                sx={{ width: 100, flex:1, display: { xs: 'none', sm: 'block' } }}
                              />
                              <CardMedia
                                src = {data.image3}
                                component="img"
                                sx={{ width: 100, flex:1, display: { xs: 'none', sm: 'block' } }}
                              />
                              <CardMedia
                                src = {data.image4}
                                component="img"
                                sx={{ width: 100, flex:1, display: { xs: 'none', sm: 'block' } }}
                              />
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
