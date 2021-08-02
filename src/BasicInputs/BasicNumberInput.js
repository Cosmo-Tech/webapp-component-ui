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

const BasicNumberInput = (props) => {
  const classes = useStyles();
  const { label, textFieldProps, inputProps, changeNumberField } = props;
  // Optional props for UI
  let { containerProps, labelProps, ...otherProps } = props;
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
    <Grid container className={classes.root} {...containerProps} {...otherProps}>
      <Grid item >
        <Typography {...labelProps}>{label}</Typography>
      </Grid>
      <Grid item >
        <TextField {...textFieldProps}
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
  label: PropTypes.string.isRequired,
  textFieldProps: PropTypes.object.isRequired,
  changeNumberField: PropTypes.func.isRequired,
  inputProps: PropTypes.object.isRequired,
  containerProps: PropTypes.object,
  labelProps: PropTypes.object
};

export default BasicNumberInput;
