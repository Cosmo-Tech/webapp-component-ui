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

const BasicEnumInput = (props) => {
  const classes = useStyles();
  const { label, textFieldProps, enumValues, changeEnumField } = props;
  let { containerProps, labelProps } = props;
  containerProps = containerProps || {
    direction: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    spacing: 2
  };
  labelProps = labelProps || {
    variant: 'subtitle2'
  };

  return (
    <Grid container className={classes.root} {...containerProps}>
      <Grid item >
        <Typography {...labelProps}>{label}</Typography>
      </Grid>
      <Grid item >
        <TextField
          select
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
  label: PropTypes.string.isRequired,
  textFieldProps: PropTypes.object.isRequired,
  changeEnumField: PropTypes.func.isRequired,
  enumValues: PropTypes.array.isRequired,
  containerProps: PropTypes.object,
  labelProps: PropTypes.object
};

export default BasicEnumInput;
