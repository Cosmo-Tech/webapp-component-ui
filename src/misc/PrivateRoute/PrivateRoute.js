// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = (props) => {
  const { render, authenticated, authorized, noAuthRedirect, noPermRedirect, ...other } = props;

  let route = <Route {...other} render={render} />;

  if (!authenticated) {
    route = (
      <Route
        {...other}
        render={(routeProps) => (
          <Redirect
            to={{
              pathname: props.noAuthRedirect,
              state: { from: routeProps.location },
            }}
          />
        )}
      />
    );
  } else if (!authorized && noPermRedirect !== undefined) {
    route = (
      <Route
        {...other}
        render={(routeProps) => (
          <Redirect
            to={{
              pathname: props.noPermRedirect,
              state: { from: routeProps.location },
            }}
          />
        )}
      />
    );
  }

  return route;
};

PrivateRoute.propTypes = {
  render: PropTypes.func,
  authenticated: PropTypes.bool,
  authorized: PropTypes.bool,
  noAuthRedirect: PropTypes.string,
  noPermRedirect: PropTypes.string,
};
