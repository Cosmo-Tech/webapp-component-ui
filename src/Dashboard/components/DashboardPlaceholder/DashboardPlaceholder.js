// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Grid,
  makeStyles
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
  const classes = useStyles();
  const { t } = useTranslation();
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

export default DashboardPlaceholder;
