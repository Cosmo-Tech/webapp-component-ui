// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { Grid, MenuItem, TextField, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export const BasicEnumInput = (props) => {
  const classes = useStyles();
  const { label, value, textFieldProps, enumValues, changeEnumField } = props;
  const { containerProps, labelProps } = props;

  return (
    <Grid container className={classes.root} {...containerProps}>
      <Grid item >
        <Typography {...labelProps}>{label}</Typography>
      </Grid>
      <Grid item >
        <TextField
          select
          value={value}
          {...textFieldProps}
          onChange={(event) => {
            return changeEnumField(event.target.value);
          }}
        >
          {enumValues.map((option) => (
            <MenuItem key={option.key} value={option.key}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

BasicEnumInput.propTypes = {
  /**
   * BasicEnumInput's label
   */
  label: PropTypes.string.isRequired,
  /**
   * BasicEnumInput's value
   */
  value: PropTypes.string.isRequired,
  /**
   * Additional props that you can specified for the BasicEnumInput's textField that display the enum value selected
   */
  textFieldProps: PropTypes.object,
  /**
   * Function used when the user change the BasicEnumInput value
   */
  changeEnumField: PropTypes.func.isRequired,
  /**
   * List of all BasicEnumInput's value possible. A value (JS object) has two attributes : **key** and **value**
   *  `{
         key: 'thisIsAKey',
         value: 'This is a Value'
       }`
   */
  enumValues: PropTypes.array.isRequired,
  /**
   * Additional props that you can specified for the BasicEnumInput's Grid container that display both label and input
   */
  containerProps: PropTypes.object,
  /**
   * Additional props that you can specified for the BasicEnumInput's label
   */
  labelProps: PropTypes.object
};

BasicEnumInput.defaultProps = {
  containerProps: {
    direction: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    spacing: 2
  },
  labelProps: {
    variant: 'subtitle2'
  }

};
