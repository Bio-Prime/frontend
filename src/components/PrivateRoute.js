import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";
import AuthService from "../services/AuthService";
export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        AuthService.isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
