/** @format */

import React from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import GuestState from "./context/guestContext/GuestState";
import setToken from "./utils/setToken";
import AuthState from "./context/authContext/AuthState";
import AuthRoute from "./components/pages/AuthRoute";

if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <GuestState>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <AuthRoute exact path="/" component={Home}></AuthRoute>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>
            </Switch>
          </div>
        </Router>
      </GuestState>
    </AuthState>
  );
}

export default App;
