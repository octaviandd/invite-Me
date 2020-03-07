/** @format */

import React, { useContext, useEffect } from "react";
import { GuestForm } from "../guests/GuestForm";
import { GuestCounter } from "../guests/GuestCounter";
import GuestFilter from "../guests/GuestFilter";
import GuestSearch from "../guests/GuestSearch";
import Guests from "../guests/Guests";
import AuthContext from "../../context/authContext/authContext";

export default function Home() {
  const { getUser } = useContext(AuthContext);

  useEffect(() => {
    getUser();

    //eslint-disable-next-line
  }, []);
  return (
    <div className="app-container">
      <div className="main">
        <div className="filter">
          <GuestForm />
        </div>
        <GuestCounter />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "2rem",
          flexDirection: "column"
        }}
      >
        <GuestFilter />
        <GuestSearch />
      </div>
      <Guests />
    </div>
  );
}
