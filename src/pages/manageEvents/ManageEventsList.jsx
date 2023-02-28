import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from 'antd';
import '../../index.scss';
import Checkbox from '@mui/material/Checkbox';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import ShareIcon from '@mui/icons-material/Share';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { Content } = Layout;

let temp = false;
const ManageEventsList = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [eventList, setEventList] = useState(JSON.parse(localStorage.getItem("events")));
    const notify1 = () => toast("You Like this event");
    const notify2 = () => toast("You Share this event");
    const notify3 = () => {
        toast("View all Register users")
        navigate("/viewAllUsers");
    };

    const TrendingEventBox = [
        {
            key: '1',
            icon: 'public/Images/Event1.png',
            hoverIcon: 'public/Images/Event1.png',
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
            icon: 'public/Images/Event2.jpg',
            hoverIcon: 'public/Images/Event2.jpg',
            title: `${t('Night party')}`,
            price: 'Price: $30',
            location: 'Location: Halifax',
            date: 'Feb 2,2023',
            likes: 200,
            url: '/deleteEvent',
        },
        {
            key: '3',
            icon: 'public/Images/Event3.jpg',
            hoverIcon: 'public/Images/Event3.jpg',
            title: `${t('Tswift Party')}`,
            price: 'Price: $20',
            date: 'Feb 1,2023',
            location: 'Location: Halifax',
            likes: 300,
            url: '/deleteEvent',
        },
        {
            key: '4',
            icon: 'public/Images/Event4.jpg',
            hoverIcon: 'public/Images/Event4.jpg',
            title: `${t('Kite fight')}`,
            price: 'Price: $10',
            date: 'Feb 1,2023',
            location: 'Location: Halifax',
            likes: 400,
            url: '/deleteEvent',
        },
        {
            key: '5',
            icon: 'public/Images/Event5.jpg',
            hoverIcon: 'public/Images/Event5.jpg',
            title: `${t('Colors hub')}`,
            price: 'Price: $40',
            date: 'Feb 1,2023',
            location: 'Location: Halifax',
            likes: 500,
            url: '/deleteEvent',
        },
        {
            key: '6',
            icon: 'public/Images/Event6.jpg',
            hoverIcon: 'public/Images/Event6.jpg',
            title: `${t('Concert')}`,
            price: 'Price: $40',
            date: 'Feb 1,2023',
            location: 'Location: Halifax',
            likes: 600,
            url: '/deleteEvent',
        }

    ];

    useEffect(()=>{
        setEventList(JSON.parse(localStorage.getItem("events")))
        console.log(eventList, "oooooooooo",JSON.parse(localStorage.getItem("events")))
    },[])


    const handleRedirection = (element) => {
        navigate(element.url, { state: { element } });
    }

    return (
        <Layout>
            <React.Fragment>
                <Content>
                    <div className="layout-padding">
                        <div>
                            <div className="top-boxes full-width horizontal-scroll">
                                {TrendingEventBox.map((element, index) => (
                                    <div className="full-width single-box">
                                        <div className="full-width" key={element.key} onClick={() => handleRedirection(element)}>
                                            <img className=" center-img" src={element.icon} alt="product" />
                                            <div className="earning-text full-width">{element.title}</div>
                                            <div className="earning-text full-width new-line" >
                                                {element.price}
                                            </div>
                                            <div className="earning-text full-width new-line">{element.date}</div>
                                            <div className="earning-text full-width">{element.location}</div>
                                        </div>
                                        <div>
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

                                            <Checkbox style={{padding: "inherit", borderSpacing: "2"}} icon={<SendIcon />}
                                                      checkedIcon={<SendIcon />}
                                                      name="checkedH"
                                                      onClick={notify3}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </Content>
            </React.Fragment>
        </Layout>
    );
};

export default ManageEventsList;
