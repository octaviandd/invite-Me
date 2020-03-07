/** @format */

import React, { useContext, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import GuestContext from "../../context/guestContext/guestContext";

export default function GuestSearch() {
  const { searchGuest, clearSearch } = useContext(GuestContext);

  //create reference
  const searchValue = useRef("");

  //if input value is empty, set search to null, if search contains any letter, set search to guest with filter(reg)
  const handleChange = e => {
    if (searchValue.current.value !== "") {
      searchGuest(e.target.value);
    } else {
      clearSearch();
    }
  };

  return (
    <div>
      <TextField
        onChange={handleChange}
        id="outlined-basic"
        //set reference to input text
        ref={searchValue}
        label="Search"
        variant="outlined"
        placeholder="Search guest by name"
      />
    </div>
  );
}
