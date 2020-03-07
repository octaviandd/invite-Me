/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Particles from "react-particles-js";
import Typography from "@material-ui/core/Typography";
import AuthContext from "../../context/authContext/authContext";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    },
    width: "100%",
    maxWidth: 500,
    textAlign: "center"
  }
}));

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

export default function Login(props) {
  const classes = useStyles();

  const { loginUser, userAuth, errors, clearError } = useContext(AuthContext);

  useEffect(() => {
    if (userAuth) {
      props.history.push("/");
      clearError();
    } else {
      clearError();
    }
  }, [userAuth, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
    clearError();
    if (errors !== null) {
      clearError();
    }
  };

  const onsubmit = e => {
    e.preventDefault();
    loginUser({ email, password });
    clearError();
  };
  return (
    <React.Fragment>
      <Particles className="particles" params={particlesOptions} />
      <Grid
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <div className={classes.root}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
        </div>
        <form
          onSubmit={onsubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="Email"
              variant="outlined"
              onChange={handleChange}
              name="email"
              value={email}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              required
              onChange={handleChange}
              name="password"
              value={password}
            />
          </div>
          <Button type="submit" color="primary" size="large">
            <span style={{ fontSize: "25px" }}>&rarr;</span>
          </Button>
        </form>
      </Grid>{" "}
    </React.Fragment>
  );
}
