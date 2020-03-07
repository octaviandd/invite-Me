/** @format */

import {
  SUCCES_REGISTER,
  SUCCES_LOGIN,
  FAILED_REGISTER,
  FAILED_LOGIN,
  SET_ERROR,
  CLEAR_ERROR,
  LOG_OUT,
  SET_USER,
  AUTH_ERROR
} from "../types";

/** @format */

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        userAuth: true,
        errors: null,
        loading: false
      };

    case SUCCES_REGISTER:
    case SUCCES_LOGIN:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        userAuth: true,
        errors: null,
        loading: false
      };
    case FAILED_REGISTER:
    case FAILED_LOGIN:
    case LOG_OUT:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        userAuth: null,
        errors: action.payload,
        token: null,
        loading: false,
        user: null
      };
    case SET_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    case CLEAR_ERROR:
      return {
        ...state,
        errors: null
      };

    default:
      return state;
  }
};
