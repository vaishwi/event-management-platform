import React from "react";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoutes = () => {
<<<<<<< HEAD
    const loggedIn = true;
    localStorage.setItem("loginStatus",loggedIn)
=======
    const loggedIn = false;
    localStorage.setItem("loginStatus", loggedIn)
>>>>>>> develop
    const defaultNavigatePage = "/login";
    return loggedIn ? <Outlet/> : <Navigate to={defaultNavigatePage}/>;
};

export default PrivateRoutes;
