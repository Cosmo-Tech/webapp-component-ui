// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { Grid, TextField, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = theme => ({
  root: {
    flexGrow: 1
  }
});

const BasicNumberInput = (props) => {
  const { classes, label, textFieldProps, inputProps, changeNumberField } = props;
  // Optional props for UI
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
                    onChange={(event) => changeNumberField(event.target.value)}
                    type="number"
                    inputProps={inputProps}
                    {...textFieldProps} />
            </Grid>
        </Grid>
  );
};

BasicNumberInput.propTypes = {
  classes: PropTypes.any,
  label: PropTypes.string.isRequired,
  textFieldProps: PropTypes.object.isRequired,
  changeNumberField: PropTypes.func.isRequired,
  inputProps: PropTypes.object.isRequired,
  containerProps: PropTypes.object,
  labelProps: PropTypes.object
};

export default withStyles(useStyles)(BasicNumberInput);
