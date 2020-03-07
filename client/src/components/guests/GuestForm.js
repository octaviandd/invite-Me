/** @format */

import React, { useState, useContext, useEffect } from "react";
import GuestContext from "../../context/guestContext/guestContext";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PhoneIcon from "@material-ui/icons/Phone";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

export const GuestForm = () => {
  const context = useContext(GuestContext);
  const { addGuest, editAble, updateGuest, clearEdit } = context;

  useEffect(() => {
    if (editAble !== null) {
      setGuest(editAble);
    } else {
      setGuest({
        name: "",
        phone: "",
        diet: "Non-Veg"
      });
    }
  }, [editAble, context]);

  const [guest, setGuest] = useState({
    name: "",
    phone: "",
    diet: "Non-Veg"
  });
  const { name, phone, dietary } = guest;

  const handleChange = e => {
    setGuest({
      ...guest,
      [e.target.name]: e.target.value
    });
  };

  const onsubmit = e => {
    e.preventDefault();
    if (editAble === null) {
      addGuest(guest);
    } else {
      updateGuest(guest);
      clearEdit();
    }
    setGuest({
      name: "",
      phone: "",
      dietary: ""
    });
  };

  return (
    <div>
      <form onSubmit={onsubmit}>
        <FormControl component="fieldset">
          <RadioGroup aria-label="position" name="position">
            <Grid container spacing={0} alignItems="flex-end" justify="center">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={name}
                />
              </Grid>
              <Grid item>
                <PhoneIcon />
              </Grid>
              <TextField
                id="input-with-icon-grid"
                label="Phone"
                name="phone"
                onChange={handleChange}
                required
                value={phone}
              />
            </Grid>
            <Grid container spacing={0} alignItems="center" justify="center">
              <FormControlLabel
                value="Vegan"
                onChange={handleChange}
                control={<Radio color="primary" />}
                label="Vegan"
                name="dietary"
                labelPlacement="end"
                checked={dietary === "Vegan"}
              />
              <FormControlLabel
                value="Non-Veg"
                control={
                  <Radio checked={dietary === "Non-Veg"} color="primary" />
                }
                name="dietary"
                label="Non-Veg"
                labelPlacement="end"
                onChange={handleChange}
              />
              <FormControlLabel
                value="Pescatarian"
                control={<Radio color="primary" />}
                label="Pescatarian"
                name="dietary"
                labelPlacement="end"
                onChange={handleChange}
                checked={dietary === "Pescatarian"}
              />
            </Grid>
          </RadioGroup>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth={true}
          >
            {editAble ? "Edit Guest" : "Add Guest"}
          </Button>
        </FormControl>
      </form>
    </div>
  );
};
