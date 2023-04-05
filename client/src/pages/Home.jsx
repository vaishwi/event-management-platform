/**
 * @author Khushi Shah (B00923816)
 * This is the main component for user login
 * This is the landing page when the user logins
 * This component imports various MUI Components, it calls various other components which helps us to display all the event details and upon clicking the events some other components are called
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout, Button } from 'antd';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import '../index.scss';
import '../styles/pagination.css';
import { ToastContainer } from "react-toastify";
import axios from 'axios';

const { Content } = Layout;
const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();


  const TempList = [
    {
      key: '1',
      icon: '/Images/Event1.png',
      hoverIcon: '/Images/Event1.png',
      title: `${t('Unicycling Race')}`,
      price: 'Price: $40',
      date: 'March 23,2023',
      time: '4 PM Onwards',
      location: 'Location: Halifax',
      url: '/deleteEvent',
      detailedTitle: 'Unicycling race - March 23,2023',
      eventInfo: "Unicycling race age dependent, winners will get excited prizes. It's a fund raising event",
      organizer: 'Halifax Community Center',
      runtime: '3',
      likes: 100,
      ticket: 'Mobile e-ticket',
      image1: 'Images/Event1.1.jpg',
      image2: 'Images/Event1.2.jpg',
      image3: 'Images/Event1.3.png',
      image4: 'Images/Event1.4.jpg',
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      key: '2',
      icon: '/Images/Event2.jpg',
      hoverIcon: '/Images/Event2.jpg',
      title: `${t('Night party')}`,
      price: 'Price: $30',
      location: 'Location: Halifax',
      date: 'Feb 2,2023',
      likes: 200,
      url: '/deleteEvent',
    },
    {
      key: '3',
      icon: '/Images/Event3.jpg',
      hoverIcon: '/Images/Event3.jpg',
      title: `${t('Tswift Party')}`,
      price: 'Price: $20',
      date: 'Feb 1,2023',
      location: 'Location: Halifax',
      likes: 300,
      url: '/deleteEvent',
    },
    {
      key: '4',
      icon: '/Images/Event4.jpg',
      hoverIcon: '/Images/Event4.jpg',
      title: `${t('Kite fight')}`,
      price: 'Price: $10',
      date: 'Feb 1,2023',
      location: 'Location: Halifax',
      likes: 400,
      url: '/deleteEvent',
    },
    {
      key: '5',
      icon: '/Images/Event5.jpg',
      hoverIcon: '/Images/Event5.jpg',
      title: `${t('Colors hub')}`,
      price: 'Price: $40',
      date: 'Feb 1,2023',
      location: 'Location: Halifax',
      likes: 500,
      url: '/deleteEvent',
    },
    {
      key: '6',
      icon: '/Images/Event6.jpg',
      hoverIcon: '/Images/Event6.jpg',
      title: `${t('Concert')}`,
      price: 'Price: $40',
      date: 'Feb 1,2023',
      location: 'Location: Halifax',
      likes: 600,
      url: '/deleteEvent',
    }

  ];

  const handleRedirection_organization = (element) => {
    const organizerInfo = element?.id
    navigate('/organizerProfile', { state: { organizerId: organizerInfo } })
  }

  const handleRedirection = (element) => {
    navigate("/event", { state: element });
  }

  const searchNavigation = (element) => {
    navigate(element);
  }

  const [events, setEvents] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [userType, setUserType] = useState(null);


  useEffect(() => {
    const user = localStorage.getItem('user');
    const userType = JSON.parse(user).userType;
    console.log(userType, "userTyp>>>>>>>>>>>>>>")
    setUserType(userType);
    localStorage.setItem("events", JSON.stringify(TempList));
    console.log("home", JSON.parse(localStorage.getItem("events")))
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/events`)
        const response1 = await axios.get(`${import.meta.env.VITE_SERVER_URL}/organizers`)
        if (response.status === 200) {
          setEvents(response.data.data)
          setOrganizers(response1.data.data)
        }
      } catch (e) {
        console.log(e)
        console.log(e.response.status)

      }
    };
    fetchEvents();
  }, [])

  return (
    <Layout>
      <React.Fragment>
        <Content>
          <div className="layout-padding">
            <div>
              {userType != "admin" ? <Paper
                sx={{
                  position: 'relative',
                  backgroundColor: 'grey.800',
                  color: '#fff',
                  mb: 4,
                  height: 330,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundImage: 'url(Images/carousel.jpg)',
                }}
              >
                {/* Increase the priority of the hero background image */}
                {<img style={{ display: 'none' }} src={'Images/Image1.png'} alt={'Images/Image1.png'} />}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.4)',
                  }}
                />
                <Grid container>
                  <Grid item md={6}>
                    <Box
                      sx={{
                        position: 'relative',
                        p: { xs: 3, md: 6 },
                        pr: { md: 0 },
                      }}
                    >
                      <Typography sx={{ fontFamily: 'Raleway' }} component="h2" variant="h3" color="inherit" gutterBottom>
                        FIND YOUR NEXT EVENT
                      </Typography>
                      <Button onClick={() => searchNavigation('/search')}  >EXPLORE</Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper> : null}
            </div>
            <div>
              <h1>Trending Events</h1>
              <div className=" top-boxes full-width horizontal-scroll container">
                {events
                  .filter((number, index) => index % 2 !== 0)
                  .map((element, index) => (
                    <div className="full-width single-box">
                      <div className="full-width" key={element.id} onClick={() => handleRedirection(element)}>
                        <img className=" center-img" src={element.banner_image} alt="product" />
                        <div className="earning-text full-width">{element.title}</div>
                        <div className="earning-text full-width new-line" >
                          $ {element.price > 0.0 ? element.price : 'Free'}
                        </div>
                        <div className="earning-text full-width new-line">{element.date}</div>
                        <div className="earning-text full-width">{element.city}</div>
                      </div>
                      {/*<div>
                                <Checkbox style={{padding: "inherit"}} icon={<FavoriteBorder />}
                                          checkedIcon={<Favorite />}
                                          name="checkedH"
                                          onClick={notify1}

                                />
                                <Checkbox style={{padding: "inherit", borderSpacing: "2"}} icon={<ShareIcon />}
                                          checkedIcon={<ShareIcon />}
                                          name="checkedH"
                                          onClick={notify2}
                                />
                              </div>*/}
                    </div>
                  ))}

              </div>

            </div>

            <div class="space">
              <h1>Other Events</h1>
              <div className=" top-boxes full-width horizontal-scroll container">
                {events
                  .filter((number, index) => index % 2 == 0)
                  .map((element, index) => (
                    <div className="full-width single-box">
                      <div className="full-width" key={element.id} onClick={() => handleRedirection(element)}>
                        <img className=" center-img" src={element.banner_image} alt="product" />
                        <div className="earning-text full-width">{element.title}</div>
                        <div className="earning-text full-width new-line" >
                          $ {element.price > 0.0 ? element.price : 'Free'}
                        </div>
                        <div className="earning-text full-width new-line">{element.date}</div>
                        <div className="earning-text full-width">{element.city}</div>
                      </div>
                      {/*<div>
                                 <Checkbox style={{padding: "inherit"}} icon={<FavoriteBorder />}
                                           checkedIcon={<Favorite />}
                                           name="checkedH"
                                           onClick={notify1}

                                 />
                                 <Checkbox style={{padding: "inherit", borderSpacing: "2"}} icon={<ShareIcon />}
                                           checkedIcon={<ShareIcon />}
                                           name="checkedH"
                                           onClick={notify2}
                                 />
                               </div>*/}
                    </div>
                  ))}

              </div>
            </div>

            {userType != "admin" ? <div>
              {console.log(organizers)}
              <h1>Organizations</h1>
              <div className="top-boxes full-width horizontal-scroll">
                {organizers.map((element, index) => (
                  <div className="full-width single-box">
                    <div className="full-width" key={element.key} onClick={() => handleRedirection_organization(element, true)}>
                      <div className="earning-text full-width">{element.organizationName}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div> : null}
          </div>
          <ToastContainer />
        </Content>
      </React.Fragment>
    </Layout>
  );
};

export default Dashboard;
