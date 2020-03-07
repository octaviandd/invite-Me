/** @format */

import React, { useContext } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import GuestContext from "../../context/guestContext/guestContext";

export default function Guest({ guest }) {
  const { deleteGuest, updateGuest, editGuest, clearEdit } = useContext(
    GuestContext
  );
  const { _id, name, dietary, isConfirmed, phone } = guest;
  console.log(_id);

  const handleRemove = () => {
    deleteGuest(_id);
    clearEdit();
  };

  const handleIsConfirmed = () => {
    updateGuest({ ...guest, isConfirmed: !isConfirmed });
  };

  return (
    <div className="guest-card">
      <div className="card-head">
        <div>
          <label className={`${isConfirmed && "confirm"}`}>
            Confirmed
            <Checkbox
              checked={isConfirmed ? true : false}
              onChange={handleIsConfirmed}
              color="default"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </label>
        </div>
        <div>
          <button onClick={() => editGuest(guest)}>
            <i className="fas fa-user-edit"></i>
          </button>
          <button onClick={handleRemove}>
            <i className="fas fa-trash-alt remove"></i>
          </button>
        </div>
      </div>
      <div className="card-body">
        <h2>{name}</h2>
        <span
          className={
            "badge " +
            (dietary === "Non-Veg"
              ? "red"
              : dietary === "Vegan"
              ? "green"
              : "seaGreen")
          }
        >
          {dietary}
        </span>
        <div className="contact">
          <i className="fas fa-phone-alt"></i>
          <p>{phone}</p>
        </div>
      </div>
    </div>
  );
}
