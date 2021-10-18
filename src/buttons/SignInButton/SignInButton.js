// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Typography, Avatar } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';

const PREFIX = 'SignInButton';

const classes = {
  root: `${PREFIX}-root`,
  logo: `${PREFIX}-logo`,
  label: `${PREFIX}-label`
};

const Root = styled('button')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    border: 0,
    background: theme.palette.background.signInButton,
    boxShadow: 'none',
    borderRadius: '0px',
    height: '41px',
    paddingRight: '12px',
    cursor: 'pointer',
  },

  [`& .${classes.logo}`]: {
    height: '21px',
    width: '21px',
    marginLeft: '12px',
    marginRight: '12px',
  },

  [`& .${classes.label}`]: {
    fontSize: '15px',
    font: 'Sogoe UI Regular',
    weight: 600,
    color: theme.palette.text.primary,
  }
}));

export const SignInButton = (props) => {


  const { id, label, logo, onClick } = props;

  return (
    <Root className={classes.root} onClick={onClick} data-cy={'sign-in-with-' + id + '-button'}>
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
    </Root>
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
