// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Button, makeStyles, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: '100%',
  },
  iconContainer: {
    textAlign: 'center',
  },
  linearProgress: {
    minWidth: '300px',
    marginTop: '10px',
  },
  label: {
    textAlign: 'center',
  },
}));

const DashboardPlaceholder = (props) => {
  const classes = useStyles();
  const { title, label, icon, downloadLogsFile, downloadLabel, inProgress } = props;

  return (
    <Grid
      container
      spacing={4}
      direction="column"
      justifyContent="center"
      wrap="nowrap"
      alignItems="center"
      className={classes.gridContainer}
    >
      <Grid>
        <Typography variant="h3">{title}</Typography>
      </Grid>
      <Grid item>
        {icon !== undefined && <div className={classes.iconContainer}>{icon}</div>}
        <Typography data-cy="dashboard-placeholder" color="textSecondary" variant="body1" className={classes.label}>
          {label}
        </Typography>
        {inProgress && <LinearProgress data-cy="dashboard-in-progress" className={classes.linearProgress} />}
      </Grid>
      {downloadLogsFile && (
        <Grid item>
          <Button variant="contained" color="primary" onClick={downloadLogsFile}>
            {downloadLabel}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

DashboardPlaceholder.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string,
  icon: PropTypes.object,
  downloadLogsFile: PropTypes.func,
  downloadLabel: PropTypes.string,
  inProgress: PropTypes.bool,
};

DashboardPlaceholder.defaultProps = {
  title: null,
  inProgress: false,
};

export default DashboardPlaceholder;
