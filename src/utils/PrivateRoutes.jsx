import React from "react";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoutes = () => {
    const loggedIn = true;
    const defaultNavigatePage = "/login";
    return loggedIn ? <Outlet/> : <Navigate to={defaultNavigatePage}/>;
};

export default PrivateRoutes;
