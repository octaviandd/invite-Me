/** @format */

import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import setToken from "../../utils/setToken";

import {
  SET_ERROR,
  SET_USER,
  AUTH_ERROR,
  SUCCES_LOGIN,
  SUCCES_REGISTER,
  FAILED_LOGIN,
  FAILED_REGISTER,
  CLEAR_ERROR,
  LOG_OUT
} from "../types";

const AuthState = props => {
  const initState = {
    user: null,
    userAuth: null,
    errors: null,
    token: localStorage.getItem("token"),
    loadiing: true
  };

  const [state, dispatch] = useReducer(authReducer, initState);

  const getUser = async () => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }

    try {
      const res = await axios.get("/auth");
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error
      });
    }
  };

  // register user
  const registerUser = async userData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/register", userData, config);
      dispatch({
        type: SUCCES_REGISTER,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: FAILED_REGISTER,
        payload: error.response.data.error
      });
    }
  };

  const loginUser = async formData => {
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/auth", formData, config);
      dispatch({
        type: SUCCES_LOGIN,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FAILED_LOGIN,
        payload: err.response.data.msg
      });
    }
  };

  const setError = err => {
    dispatch({
      type: SET_ERROR,
      payload: err
    });
  };

  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR
    });
  };

  const logOut = () => {
    dispatch({
      type: LOG_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        userAuth: state.userAuth,
        errors: state.errors,
        loading: state.loading,
        token: state.token,
        loginUser,
        registerUser,
        setError,
        clearError,
        logOut,
        getUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
