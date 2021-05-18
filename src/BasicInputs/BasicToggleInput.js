// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Switch, Typography, withStyles } from '@material-ui/core';

const useStyles = theme => ({
  root: {
    flexGrow: 1
  }
});

const BasicToggleInput = (props) => {
  const { classes, label, switchProps, changeSwitchType } = props;
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
              <Switch
                onChange={(event) => changeSwitchType(event.target.checked)}
                {...switchProps}
              />
          </Grid>
      </Grid>

  );
};

BasicToggleInput.propTypes = {
  classes: PropTypes.any,
  label: PropTypes.string.isRequired,
  changeSwitchType: PropTypes.func.isRequired,
  switchProps: PropTypes.object.isRequired,
  containerProps: PropTypes.object,
  labelProps: PropTypes.object,
};

export default withStyles(useStyles)(BasicToggleInput);
