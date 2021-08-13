// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Grid,
  Button,
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
  const { title, label, icon, downloadLogsFile } = props;

  return (
    <Grid container
      spacing={2}
      direction="column"
      justifyContent="center"
      wrap="nowrap"
      alignItems="center"
      className={classes.gridContainer}
    >
      <Grid>
        <Typography variant="h2" >
          {title}
        </Typography>
      </Grid>
      <Grid item>
        { icon !== undefined &&
          <div className={classes.iconContainer}>
            {icon}
          </div>
        }
        <Typography
          data-cy="dashboard-placeholder"
          color="textSecondary"
          className={classes.label}
        >
          {label}
        </Typography>
      </Grid>
      { downloadLogsFile &&
        <Grid item>
          <Button variant="contained" color="primary" onClick={downloadLogsFile}>
            {t('commoncomponents.iframe.scenario.results.button.downloadlogs', 'Download logs')}
          </Button>
        </Grid>
      }
    </Grid>
  );
};

DashboardPlaceholder.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string,
  icon: PropTypes.object,
  downloadLogsFile: PropTypes.func
};

DashboardPlaceholder.defaultProps = {
  title: null
};

export default DashboardPlaceholder;
