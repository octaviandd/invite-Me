/** @format */

import React, { useContext, useEffect } from "react";
import Guest from "./Guest";
import GuestContext from "../../context/guestContext/guestContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AuthContext from "../../context/authContext/authContext";

export default function Guests() {
  const { guests, filterGuest, search, getGuests } = useContext(GuestContext);
  const { loading } = useContext(AuthContext);
  useEffect(() => {
    getGuests();

    //eslint-disable-next-line
  }, []);

  if (guests === null || guests.length === 0) {
    return (
      <h3 className="no-guest">
        {loading ? "Loading guests..." : "Please add a guest"}
      </h3>
    );
  }

  return (
    <div>
      <TransitionGroup className="guests">
        {search !== null
          ? search.map(guest => (
              <CSSTransition key={guest._id} timeout={300} classNames="item">
                <Guest guest={guest} />
              </CSSTransition>
            ))
          : guests
              .filter(guest => !filterGuest || guest.isConfirmed)
              .map(guest => (
                <CSSTransition key={guest._id} timeout={300} classNames="item">
                  <Guest guest={guest} />
                </CSSTransition>
              ))}
      </TransitionGroup>
    </div>
  );
}
