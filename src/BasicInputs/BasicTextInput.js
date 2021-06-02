// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { Grid, TextField, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const BasicTextInput = (props) => {
  const classes = useStyles();
  const { label, textFieldProps, changeTextField } = props;
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
                <TextField {...textFieldProps} onChange={(event) => changeTextField(event.target.value)} />
            </Grid>
        </Grid>
  );
};

BasicTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  changeTextField: PropTypes.func.isRequired,
  textFieldProps: PropTypes.object.isRequired,
  containerProps: PropTypes.object,
  labelProps: PropTypes.object
};

export default BasicTextInput;
