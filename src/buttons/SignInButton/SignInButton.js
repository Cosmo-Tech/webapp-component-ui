// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled('button')(({ theme }) => ({
  border: 0,
  background: theme.palette.microsoft.main,
  boxShadow: 'none',
  borderRadius: '0px',
  height: '41px',
  paddingRight: '12px',
  cursor: 'pointer',
}));

export const SignInButton = (props) => {
  const { id, label = 'Sign in', logo = '../../assets/microsoft_logo.png', onClick, autoFocus = false } = props;

  return (
    <StyledButton onClick={onClick} data-cy={'sign-in-with-' + id + '-button'} autoFocus={autoFocus}>
      <Grid container spacing={0} direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-start' }}>
        <Grid>
          <Avatar
            sx={{ height: '21px', width: '21px', marginLeft: '12px', marginRight: '12px' }}
            variant="square"
            src={logo}
          />
        </Grid>
        <Grid>
          <Typography
            noWrap
            sx={{
              fontSize: '15px',
              font: 'Sogoe UI Regular',
              weight: 600,
              color: (theme) => theme.palette.microsoft.contrastText,
            }}
          >
            {label}
          </Typography>
        </Grid>
      </Grid>
    </StyledButton>
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
