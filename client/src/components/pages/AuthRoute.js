/** @format */

import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/authContext/authContext";

export default function AuthRoute({ component: Component, ...rest }) {
  const { userAuth, loading } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        !userAuth && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    ></Route>
  );
}
