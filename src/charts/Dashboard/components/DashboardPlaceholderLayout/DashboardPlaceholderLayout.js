// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Button, LinearProgress } from '@mui/material';

const DashboardPlaceholderLayout = (props) => {
  const { title = null, label, icon, downloadLogsFile, downloadLabel, inProgress = false } = props;

  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}
    >
      <Grid>
        <Typography variant="h3">{title}</Typography>
      </Grid>
      <Grid>
        {icon !== undefined && <div style={{ textAlign: 'center' }}>{icon}</div>}
        <Typography
          data-cy="dashboard-placeholder"
          variant="body1"
          sx={{ marginTop: '10px', textAlign: 'center' }}
          color="textSecondary"
        >
          {label}
        </Typography>
        {inProgress && <LinearProgress data-cy="dashboard-in-progress" sx={{ minWidth: '300px', marginTop: '10px' }} />}
      </Grid>
      {downloadLogsFile && (
        <Grid>
          <Button variant="contained" color="primary" onClick={downloadLogsFile}>
            {downloadLabel}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

DashboardPlaceholderLayout.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string,
  icon: PropTypes.object,
  downloadLogsFile: PropTypes.func,
  downloadLabel: PropTypes.string,
  inProgress: PropTypes.bool,
};

export default DashboardPlaceholderLayout;
