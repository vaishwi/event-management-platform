// import { useNavigate } from "react-router-dom";
//
// const Home = () => {
//   const navigator = useNavigate();
//
//   return <div>
//     <p>Homepage</p>
//   </div>;
// };
//
// export default Home;
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Layout, Menu, Table, Button, Dropdown, Pagination } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Content } = Layout;

const Dashboard = () => {
const { t, i18n } = useTranslation();
const navigate = useNavigate();

  const TrendingEventBox = [
    {
      key: '1',
      icon: 'images/Event1.jpg',
      hoverIcon: 'images/Event1.jpg',
      title: `${t('Unicycling race')}`,
      price: 'Price: $40',
      date: 'Feb 1,2023',
      location: 'Location: Halifax',
      url: '/blog',
    },
    {
      key: '2',
      icon: 'images/Event2.jpg',
      hoverIcon: 'images/Event2.jpg',
      title: `${t('Night party')}`,
      price: 'Price: $30',
      location: 'Location: Halifax',
      date: 'Feb 2,2023',
      url: '/blog',
    },
    {
      key: '3',
      icon: 'images/Event3.jpg',
      hoverIcon: 'images/Event3.jpg',
      title: `${t('Tswift Party')}`,
      price: 'Price: $20',
      date: 'Feb 1,2023',
      location: 'Location: Halifax',
      url: '/blog',
    },
    {
      key: '4',
      icon: 'images/Event4.jpg',
      hoverIcon: 'images/Event4.jpg',
      title: `${t('Kite fight')}`,
      price: 'Price: $10',
      date: 'Feb 1,2023',
      location: 'Location: Halifax',
      url: '/blog',
    },
    {
      key: '5',
      icon: 'images/Event5.jpg',
      hoverIcon: 'images/Event5.jpg',
      title: `${t('Colors hub')}`,
      price: 'Price: $40',
      date: 'Feb 1,2023',
      location: 'Location: Halifax',
      url: '/blog',
     },
     {
        key: '6',
        icon: 'images/Event6.jpg',
        hoverIcon: 'images/Event6.jpg',
        title: `${t('Concert')}`,
        price: 'Price: $40',
        date: 'Feb 1,2023',
        location: 'Location: Halifax',
        url: '/blog',
     },
  ];

    const OtherEventsBox = [
      {
        key: '1',
        icon: 'images/Event1.jpg',
        hoverIcon: 'images/Event1.jpg',
        title: `${t('Unicycling race')}`,
        price: 'Price: $40',
                    date: 'Feb 1,2023',
                          location: 'Location: Halifax',


        url: '/blog',
      },
      {
        key: '2',
        icon: 'images/Event2.jpg',
        hoverIcon: 'images/Event2.jpg',
        title: `${t('Night party')}`,
        price: 'Price: $30',
                    date: 'Feb 1,2023',
                          location: 'Location: Halifax',


        url: '/blog',
      },
      {
        key: '3',
        icon: 'images/Event3.jpg',
        hoverIcon: 'images/Event3.jpg',
        title: `${t('Tswift Party')}`,
        price: 'Price: $20',
                    date: 'Feb 1,2023',
                          location: 'Location: Halifax',


        url: '/blog',
      },
      {
        key: '4',
        icon: 'images/Event4.jpg',
        hoverIcon: 'images/Event4.jpg',
        title: `${t('Kite fight')}`,
        price: 'Price: $10',
                           date: 'Feb 1,2023',
                                 location: 'Location: Halifax',


        url: '/blog',
      },
      {
        key: '5',
        icon: 'images/Event5.jpg',
        hoverIcon: 'images/Event5.jpg',
        title: `${t('Colors hub')}`,
        price: 'Price: $40',
        date: 'Feb 1,2023',
        location: 'Location: Halifax',
        url: '/blog',
      },
      {
        key: '6',
        icon: 'images/Event6.jpg',
        hoverIcon: 'images/Event6.jpg',
        title: `${t('Concert')}`,
        price: 'Price: $40',
        date: 'Feb 1,2023',
        location: 'Location: Halifax',
        url: '/blog',
      },
    ];

      const OrganizationBox = [
        {
          key: '1',
          icon: 'images/Event1.jpg',
          hoverIcon: 'images/Event1.jpg',
          title: `${t('The laugh club')}`,
          price: '40',
        },
        {
          key: '2',
          icon: 'images/Event2.jpg',
          hoverIcon: 'images/Event2.jpg',
          title: `${t('The comedy factory')}`,
          price: '30',
        },
      ];

  const handleRedirection = (element) => {
    navigate(element.url)
  }

  return (
    <Layout>
        <React.Fragment>
          <Content>
            <div className="site-layout-background layout-padding">
            <div className="section-wrapper">
            <h3>Trending Events</h3>
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
                  </div>
                ))}
              </div>
              </div>

              <div className="section-wrapper">
              <h3>Other Events</h3>
              <div className="top-boxes full-width horizontal-scroll">
                 {OtherEventsBox.map((element, index) => (
                                <div className="full-width single-box">

                                  <div className="full-width" key={element.key} onClick={() => handleRedirection(element.url)}>
                                  <img className=" center-img" src={element.icon} alt="product" />
                                                        <div className="earning-text full-width">{element.title}</div>
                                                        <div className="earning-text full-width">{element.price}</div>
                                                                              <div className="earning-text full-width new-line">{element.date}</div>
                                                                                                    <div className="earning-text full-width">{element.location}</div>
                                                      </div>
                                </div>
                              ))}
                            </div>
                            </div>

            <div className="section-wrapper">
              <h3>Organizations</h3>
                            <div className="top-boxes full-width horizontal-scroll">
                               {OrganizationBox.map((element, index) => (
                                 <div className="full-width single-box">
                                   <div className="full-width" key={element.key}>
                                     <img className=" center-img" src={element.icon} alt="product" />
                                     <div className="earning-text full-width">{element.title}</div>
                                   </div>
                                 </div>
                                            ))}
                                          </div>
                                          </div>
            </div>
          </Content>
        </React.Fragment>

    </Layout>
  );
};

export default Dashboard;
