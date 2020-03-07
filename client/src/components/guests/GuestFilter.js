/** @format */

import React, { useContext, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import GuestContext from "../../context/guestContext/guestContext";

export default function GuestFilter() {
  const { toggleFilter } = useContext(GuestContext);

  const [checked, setCheck] = useState(false);

  const handleChange = event => {
    setCheck(event.target.checked);
    toggleFilter();
  };

  return (
    <Grid>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        value="primary"
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      <p className="lead">Show attending only!</p>
    </Grid>
  );
}
