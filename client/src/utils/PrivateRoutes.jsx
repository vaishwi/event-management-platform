/**
 * A component that renders the private routes of the application. If the user is logged in,
 * the component renders the child routes using the Outlet component from react-router-dom.
 * If the user is not logged in, the component redirects the user to the login page.
 */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    // localStorage.setItem("loginStatus",false)
    
    const loggedIn = localStorage.getItem("loginStatus") === "true";
    console.log("Login status: "+loggedIn)
    const defaultNavigatePage = "/login";
    return loggedIn ? <Outlet/> : <Navigate to={defaultNavigatePage}/>;
};

export default PrivateRoutes;
