// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Button, LinearProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

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
    marginTop: '10px',
    textAlign: 'center',
  },
}));

const DashboardPlaceholder = (props) => {
  const classes = useStyles();
  const { title = null, label, icon, downloadLogsFile, downloadLabel, inProgress = false } = props;

  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      className={classes.gridContainer}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid>
        <Typography variant="h3">{title}</Typography>
      </Grid>
      <Grid item>
        {icon !== undefined && <div className={classes.iconContainer}>{icon}</div>}
        <Typography data-cy="dashboard-placeholder" variant="body1" className={classes.label} color="textSecondary">
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

export default DashboardPlaceholder;
