import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import ResponsiveAppBar from "../components/Navbar";

const PrivateRoutes = () => {
    const loggedIn = false;
    localStorage.setItem("loginStatus", loggedIn)
    const defaultNavigatePage = "/login";
    return loggedIn ? <Outlet/> : <Navigate to={defaultNavigatePage}/>;
};

export default PrivateRoutes;
