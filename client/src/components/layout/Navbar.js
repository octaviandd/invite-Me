/** @format */

import React, { useContext, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../../context/authContext/authContext";
import { Link } from "react-router-dom";
import logo1 from "../../logo/logo1.png";
import GuestContext from "../../context/guestContext/guestContext";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 500,
    textAlign: "center"
  }
}));

export default function Navbar() {
  const { logOut, clearError, userAuth, user } = useContext(AuthContext);
  const { clearGuests } = useContext(GuestContext);
  const classes = useStyles();

  const handleLogOut = () => {
    logOut();
    clearGuests();
    clearError();
  };

  const userLinks = (
    <Fragment>
      <li>Hello, {user ? user.name : null}</li>
      <span className="sm-hide">|</span>
      <li onClick={handleLogOut}>
        <a href="#">
          <span>Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const authLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <span className="sm-hide">|</span>
      <li onClick={handleLogOut}>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar">
      <div className="logo">
        <div className={classes.root}>
          <img src={logo1} alt="logo"></img>
        </div>
      </div>
      <ul>{userAuth ? userLinks : authLinks}</ul>
    </div>
  );
}
