// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { Grid, TextField, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { NumberFormatCustom } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export const BasicNumberInput = (props) => {
  const classes = useStyles();
  const {
    label,
    value,
    textFieldProps,
    inputProps,
    changeNumberField,
    containerProps,
    labelProps,
    ...otherProps
  } = props;

  return (
    <Grid container className={classes.root} {...containerProps} {...otherProps}>
      <Grid item >
        <Typography {...labelProps}>{label}</Typography>
      </Grid>
      <Grid item >
        <TextField {...textFieldProps}
          value={value}
          onChange={(event) => changeNumberField(parseFloat(event.target.value))}
          inputProps={inputProps}
          InputProps={{
            inputComponent: NumberFormatCustom
          }}
        />
      </Grid>
    </Grid>
  );
};

BasicNumberInput.propTypes = {
  /**
   * BasicNumberInput's label
   */
  label: PropTypes.string,
  /**
   * BasicNumberInput's value
   */
  value: PropTypes.string.isRequired,
  /**
   * Function used when the user changes the BasicNumberInput value
   */
  changeNumberField: PropTypes.func.isRequired,
  /**
   * Additional props that you can specify for the BasicNumberInput's textField that displays the number value selected
   */
  textFieldProps: PropTypes.object,
  /**
   * Additional props that you can specify for the BasicNumberInput's Grid container that displays both label and input
   */
  inputProps: PropTypes.object,
  /**
   * Additional props that you can specify for the BasicNumberInput's Grid container that displays both label and input
   */
  containerProps: PropTypes.object,
  /**
   * Additional props that you can specify for the BasicNumberInput's label
   */
  labelProps: PropTypes.object
};

BasicNumberInput.defaultProps = {
  containerProps: {
    direction: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    spacing: 2
  },
  labelProps: {
    variant: 'subtitle2'
  },
  inputProps: {
    min: -9999,
    max: 9999
  }
};
