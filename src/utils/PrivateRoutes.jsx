import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import ResponsiveAppBar from "../components/Navbar";

const PrivateRoutes = () => {
    // localStorage.setItem("loginStatus",false)
    
    const loggedIn = localStorage.getItem("loginStatus");
    console.log("Login status: "+loggedIn)
    const defaultNavigatePage = "/login";
    return loggedIn ? <Outlet/> : <Navigate to={defaultNavigatePage}/>;
};

export default PrivateRoutes;
