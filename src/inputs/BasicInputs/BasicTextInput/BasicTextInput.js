// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { Grid, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';
import React from 'react';

const PREFIX = 'BasicTextInput';

const classes = {
  root: `${PREFIX}-root`
};

const StyledGrid = styled(Grid)((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
  }
}));

export const BasicTextInput = (props) => {

  const { label, value, textFieldProps, changeTextField, containerProps, labelProps } = props;

  return (
    <StyledGrid container className={classes.root} {...containerProps}>
      <Grid item>
        <Typography {...labelProps}>{label}</Typography>
      </Grid>
      <Grid item>
        <TextField {...textFieldProps} value={value} onChange={(event) => changeTextField(event.target.value)} />
      </Grid>
    </StyledGrid>
  );
};

BasicTextInput.propTypes = {
  /**
   * BasicTextInput's label
   */
  label: PropTypes.string,
  /**
   * BasicTextInput's value
   */
  value: PropTypes.string.isRequired,
  /**
   * Function used when the user changes the BasicTextInput value
   */
  changeTextField: PropTypes.func.isRequired,
  /**
   * Additional props that you can specify for the BasicTextInput's textField that displays the text value selected
   */
  textFieldProps: PropTypes.object,
  /**
   * Additional props that you can specify for the BasicTextInput's Grid container that displays both label and input
   */
  containerProps: PropTypes.object,
  /**
   * Additional props that you can specify for the BasicTextInput's label
   */
  labelProps: PropTypes.object,
};

BasicTextInput.defaultProps = {
  containerProps: {
    direction: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    spacing: 2,
  },
  labelProps: {
    variant: 'subtitle2',
  },
};
