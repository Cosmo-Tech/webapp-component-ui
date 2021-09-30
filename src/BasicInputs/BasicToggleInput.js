// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Switch, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export const BasicToggleInput = (props) => {
  const classes = useStyles();
  const { label, checked, switchProps, changeSwitchType, containerProps, labelProps } = props;

  return (

      <Grid container className={classes.root} {...containerProps}>
          <Grid item >
              <Typography {...labelProps}>{label}</Typography>
          </Grid>
          <Grid item >
              <Switch
                onChange={(event) => changeSwitchType(event.target.checked)}
                checked = {checked}
                {...switchProps}
              />
          </Grid>
      </Grid>

  );
};

BasicToggleInput.propTypes = {
  /**
   * BasicToggleInput's label
   */
  label: PropTypes.string,
  /**
   * BasicToggleInput's checked
   */
  checked: PropTypes.string.isRequired,
  /**
   * Function used when the user changes the BasicToggleInput value
   */
  changeSwitchType: PropTypes.func.isRequired,
  /**
   * Additional props that you can specified for the BasicToggleInput's toggle
   */
  switchProps: PropTypes.object,
  /**
   * Additional props that you can specified for the BasicToggleInput's Grid container that display both label and input
   */
  containerProps: PropTypes.object,
  /**
   * Additional props that you can specified for the BasicToggleInput's label
   */
  labelProps: PropTypes.object
};

BasicToggleInput.defaultProps = {
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
