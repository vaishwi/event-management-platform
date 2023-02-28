import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import Blog from "./pages/eventDetails/Blog.jsx";
import Checkout from "./pages/checkout/Checkout.jsx";
import About from "./pages/About.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import "./App.css";
import Search from "./pages/Search.jsx";
import ResponsiveAppBar from "./components/Navbar.jsx";
import OrganizerList from "./pages/OrganizerList.jsx";
import OrganizerProfile from "./pages/OrganizerProfile.jsx";
import RegisteredEvents from "./pages/eventDetails/myRegisteredEvents.jsx";
import Payments from "./pages/eventDetails/payments.jsx";
import CheckoutForgetPassword from "./pages/forgetPassword/CheckoutForgetPassword.jsx";
import Logout from "./pages/Logout.jsx";
import SubscriberList from "./pages/SubscriberList.jsx";
import PostEvent from "./pages/PostEvent.jsx";
import OrganizerEvents from "./pages/OrganizerEvents.jsx";
import ManageEventsList from "./pages/manageEvents/ManageEventsList.jsx";
import DeleteEvent from "./pages/manageEvents/DeleteEvent.jsx";
import ViewAllUsers from "./pages/manageEvents/VIewAllUsers.jsx";

let loginStatus = localStorage.getItem("loginStatus") === "true"

if(localStorage.getItem("loginStatus") == null){
  console.log("In null login status")
  localStorage.setItem("loginStatus",false)
  loginStatus = localStorage.getItem("loginStatus") === "true"
  console.log(typeof(loginStatus))
}

function App() {
  // localStorage.setItem("user",JSON.stringify({userType:""}))

  if(localStorage.getItem("loginStatus") == null){
    console.log("In null login")
    localStorage.setItem("loginStatus",'false')
  }

  if(localStorage.getItem("user") == null){
    localStorage.setItem("user",JSON.stringify({userType:""}))
  }

  if(localStorage.getItem("pages") == null){
    localStorage.setItem("pages",JSON.stringify([]))
  }

  // const loginStatus = localStorage.getItem("loginStatus")

  const user = JSON.parse(localStorage.getItem("user"))

  console.log(localStorage.getItem("loginStatus"))


  // console.log(loginStatus)
  
  return (
    <div>

      {loginStatus && <ResponsiveAppBar />}


      <Routes>
        {/* Unprotected Routes */}
        <Route element={<Login />} path="/login" />
        <Route element={<SignUp />} path="/signup" />
        <Route element={<CheckoutForgetPassword />} path="/forgetPassword" />


        {/* Protected Routes */}
        <Route element={<PrivateRoutes />}>
          {user.userType === "organizer"? <Route element={<SubscriberList />} path="/" /> : user.userType === "user" ?<Route element={<Home />} path="/" />: <Route element={<OrganizerList isAutheticationRequests={true}/>} path="/" />}
          
          <Route element={<Home />} path="/home" />
          <Route element={<About />} path="/about" />
          <Route element={<Search />} path="/search" />
          <Route element={<OrganizerList isAutheticationRequests={false}/>} path="/organizers" />
          <Route element= {<Blog />} path = "/event" />
          <Route element= {<Blog />} path = "/event/:id" />
          <Route element= {<Checkout />} path = "/checkout" />
          <Route element= {<RegisteredEvents />} path = "/myEvents" />
          <Route element= {<Payments />} path = "/billing" />
{/*           <Route element= {<Search />} path = "/search" /> */}
          <Route element={<Checkout />} path="/checkout" />


          <Route element={<OrganizerList />} path="/organizers" />
          <Route element={<OrganizerProfile />} path="/organizerProfile" />
          <Route element={<OrganizerList isAutheticationRequests={true}/>} path="/authenticationRequests" />
          <Route element={<OrganizerEvents />} path="/organizerevents" />
          <Route element={<Logout />} path="/logout" />
          <Route element={<SubscriberList/>} path="/subscribers"/>
          <Route element={<PostEvent />} path="/postevent" />


          <Route element={<ManageEventsList />} path="/manageEvents" />
          <Route element={<DeleteEvent />} path="/deleteEvent" />
          <Route element={<ViewAllUsers />} path="/viewAllUsers" />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
