// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = (props) => {
  const { children, authenticated, authorized, noAuthenticationRedirect, noAuthorizationRedirect } = props;

  if (!authenticated) {
    return <Navigate to={noAuthenticationRedirect} />;
  } else if (!authorized && noAuthorizationRedirect !== undefined) {
    return <Navigate to={noAuthorizationRedirect} />;
  }
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.any,
  authenticated: PropTypes.bool,
  authorized: PropTypes.bool,
  noAuthenticationRedirect: PropTypes.string,
  noAuthorizationRedirect: PropTypes.string,
};
