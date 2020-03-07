/** @format */

/** @format */

import React, { useEffect, useContext, useState } from "react";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Particles from "react-particles-js";
import Typography from "@material-ui/core/Typography";
import AuthContext from "../../context/authContext/authContext";
import Button from "@material-ui/core/Button";

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
      value: 40,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

export default function Register(props) {
  const classes = useStyles();
  const { registerUser, userAuth, errors, setError, clearError } = useContext(
    AuthContext
  );

  useEffect(() => {
    if (userAuth) {
      props.history.push("/");
    }
  }, [userAuth, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = user;

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
    clearError();
    if (errors !== null) {
      clearError();
    }
  };

  const onsubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setError({ msg: "Passwords don`t match" });
    } else {
      registerUser({ name, email, password });
    }
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
            Register
          </Typography>
        </div>
        <form
          onSubmit={onsubmit}
          className={classes.root}
          style={{ display: "flex", flexDirection: "column" }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="outlined-required"
            label="Name"
            variant="outlined"
            onChange={handleChange}
            name="name"
            value={name}
          />
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
            onChange={handleChange}
            required
            name="password"
            value={password}
          />
          <TextField
            id="outlined-password-input"
            label="Repeat Passoword"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={handleChange}
            required
            name="password2"
            value={password2}
          />
          <Button type="submit" color="primary" size="large">
            +
          </Button>
        </form>
      </Grid>{" "}
    </React.Fragment>
  );
}
