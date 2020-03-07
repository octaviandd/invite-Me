/** @format */

import React, { useReducer } from "react";
import GuestContext from "./guestContext";
import guestReducer from "./guestReducer";
import {
  TOGGLE_FILTER,
  SEARCH_GUEST,
  CLEAR_SEARCH,
  ADD_GUEST,
  DELETE_GUEST,
  UPDATE_GUEST,
  EDIT_GUEST,
  CLEAR_EDIT,
  GET_GUESTS,
  GUEST_ERROR,
  CLEAR_GUESTS
} from "../types";
import axios from "axios";

const GuestState = props => {
  const initState = {
    filterGuest: false,
    search: null,
    editAble: null,
    guests: [],
    errors: null
  };

  const [state, dispatch] = useReducer(guestReducer, initState);

  //get guests from database

  const getGuests = async () => {
    try {
      const res = await axios.get("/guests");
      dispatch({
        type: GET_GUESTS,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: GUEST_ERROR,
        payload: error.response.msg
      });
    }
  };

  const addGuest = async guest => {
    const config = {
      "Content-Type": "application/json"
    };
    try {
      const res = await axios.post("/guests", guest, config);
      dispatch({
        type: ADD_GUEST,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: GUEST_ERROR,
        payload: error.response.msg
      });
    }
  };

  const deleteGuest = async id => {
    try {
      await axios.delete(`/guests/${id}`);
      dispatch({
        type: DELETE_GUEST,
        payload: id
      });
    } catch (error) {
      dispatch({
        type: GUEST_ERROR,
        payload: error
      });
    }
  };

  const updateGuest = async guest => {
    const config = {
      "Content-Type": "application/json"
    };
    try {
      const res = await axios.put(`/guests/${guest._id}`, guest, config);
      dispatch({
        type: UPDATE_GUEST,
        payload: res.data
      });

      getGuests();
    } catch (error) {
      dispatch({
        type: GUEST_ERROR,
        payload: error.response
      });
    }
  };

  const editGuest = guest => {
    dispatch({
      type: EDIT_GUEST,
      payload: guest
    });
  };

  const clearEdit = () => {
    dispatch({
      type: CLEAR_EDIT
    });
  };

  const toggleFilter = () => {
    dispatch({
      type: TOGGLE_FILTER
    });
  };

  const searchGuest = guest => {
    dispatch({
      type: SEARCH_GUEST,
      payload: guest
    });
  };

  const clearSearch = () => {
    dispatch({
      type: CLEAR_SEARCH
    });
  };

  const clearGuests = () => {
    dispatch({
      type: CLEAR_GUESTS
    });
  };

  return (
    <GuestContext.Provider
      value={{
        guests: state.guests,
        search: state.search,
        editAble: state.editAble,
        filterGuest: state.filterGuest,
        errors: state.errors,
        loading: state.loading,
        addGuest,
        deleteGuest,
        toggleFilter,
        searchGuest,
        updateGuest,
        clearSearch,
        editGuest,
        clearEdit,
        getGuests,
        clearGuests
      }}
    >
      {props.children}
    </GuestContext.Provider>
  );
};

export default GuestState;
