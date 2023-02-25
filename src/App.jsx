import React from "react";
import {Routes, Route} from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import "./App.css";
import Search from "./pages/Search.jsx";

function App() {
    return (<div>
        <Routes>
            {/* Unprotected Routes */}
            <Route element={<Login/>} path="/login"/>
            <Route element={<SignUp/>} path="/signup"/>

        {/* Protected Routes */}
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" />
          <Route element={<Home />} path="/home" />
          <Route element={<About />} path="/about" />
          <Route element={<Search />} path="/search" />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
