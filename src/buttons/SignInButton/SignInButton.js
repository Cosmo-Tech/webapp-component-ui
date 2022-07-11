// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { makeStyles, Grid, Typography, Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';

// See https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-add-branding-in-azure-ad-apps
// for further information on how to to style a 'Sign in with Microsoft' button
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.type === 'dark' ? '#2F2F2F' : '#FFFFFF',
    boxShadow: 'none',
    borderRadius: '0px',
    height: '41px',
    paddingRight: '12px',
    cursor: 'pointer',
    border: theme.palette.type === 'dark' ? '1px #8C8C8C' : 'none',
  },
  logo: {
    height: '21px',
    width: '21px',
    marginLeft: '12px',
    marginRight: '12px',
  },
  label: {
    fontSize: '15px',
    font: 'Sogoe UI Regular',
    weight: 600,
    color: theme.palette.type === 'dark' ? '#FFFFFF' : '#5E5E5E',
  },
}));

export const SignInButton = (props) => {
  const classes = useStyles();

  const { id, label, logo, onClick } = props;

  return (
    <button className={classes.root} onClick={onClick} data-cy={'sign-in-with-' + id + '-button'}>
      <Grid container spacing={0} direction="row" alignItems="center" justifyContent="flex-start">
        <Grid item>
          <Avatar className={classes.logo} variant="square" src={logo} />
        </Grid>
        <Grid item zeroMinWidth>
          <Typography noWrap className={classes.label}>
            {label}
          </Typography>
        </Grid>
      </Grid>
    </button>
  );
};

SignInButton.propTypes = {
  /**
   * Button's id
   */
  id: PropTypes.string.isRequired,
  /**
   * Logo to display
   */
  logo: PropTypes.string,
  /**
   * Button's label
   */
  label: PropTypes.string,
  /**
   * Function used when the button is clicked.
   * As you can specify it, you can use custom auth providers:
   * - Microsoft Authentication Library provider (defined in @cosmotech/azure package)
   * - Custom one: to do this, use the **Auth.js** file (defined in @cosmotech/core package) as pattern
   */
  onClick: PropTypes.func.isRequired,
};

SignInButton.defaultProps = {
  logo: '../../assets/microsoft_logo.png',
  label: 'Sign in',
};
