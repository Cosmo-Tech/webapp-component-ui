// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';
import { Grid2 as Grid, Typography, Avatar } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    border: 0,
    background: theme.palette.microsoft.main,
    boxShadow: 'none',
    borderRadius: '0px',
    height: '41px',
    paddingRight: '12px',
    cursor: 'pointer',
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
    color: theme.palette.microsoft.contrastText,
  },
}));

export const SignInButton = (props) => {
  const classes = useStyles();

  const { id, label = 'Sign in', logo = '../../assets/microsoft_logo.png', onClick, autoFocus = false } = props;

  return (
    <button className={classes.root} onClick={onClick} data-cy={'sign-in-with-' + id + '-button'} autoFocus={autoFocus}>
      <Grid container spacing={0} direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-start' }}>
        <Grid>
          <Avatar className={classes.logo} variant="square" src={logo} />
        </Grid>
        <Grid>
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
  /**
   * Autofocus by default
   */
  autoFocus: PropTypes.bool,
};
