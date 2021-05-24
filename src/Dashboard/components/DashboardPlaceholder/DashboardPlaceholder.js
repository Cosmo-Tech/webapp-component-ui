// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Grid
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  gridContainer: {
    height: '100%'
  },
  iconContainer: {
    textAlign: 'center'
  },
  label: {
    size: 14
  }
}));

const DashboardPlaceholder = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { labelKey, defaultLabel, icon } = props;

  return (
    <Grid container justify="center" alignItems="center" className={classes.gridContainer}>
      <Grid item>
        { icon !== undefined &&
          <div className={classes.iconContainer}>
            {icon}
          </div>
        }
        <Typography
          component="h2"
          color="textSecondary"
          className={classes.label}
        >
          {t(labelKey, defaultLabel)}
        </Typography>
      </Grid>
    </Grid>
  );
};

DashboardPlaceholder.propTypes = {
  labelKey: PropTypes.string.isRequired,
  defaultLabel: PropTypes.string.isRequired,
  icon: PropTypes.object
};

export default withStyles(useStyles)(DashboardPlaceholder);
