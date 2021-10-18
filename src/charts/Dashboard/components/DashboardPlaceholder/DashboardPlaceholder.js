// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Typography, Grid, Button } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const PREFIX = 'DashboardPlaceholder';

const classes = {
  gridContainer: `${PREFIX}-gridContainer`,
  iconContainer: `${PREFIX}-iconContainer`,
  label: `${PREFIX}-label`
};

const StyledGrid = styled(Grid)((
  {
    theme
  }
) => ({
  [`&.${classes.gridContainer}`]: {
    height: '100%',
  },

  [`& .${classes.iconContainer}`]: {
    textAlign: 'center',
  },

  [`& .${classes.label}`]: {
    size: 14,
  }
}));

const DashboardPlaceholder = (props) => {

  const { title, label, icon, downloadLogsFile, downloadLabel } = props;

  return (
    <StyledGrid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      wrap="nowrap"
      alignItems="center"
      className={classes.gridContainer}
    >
      <Grid>
        <Typography variant="h2">{title}</Typography>
      </Grid>
      <Grid item>
        {icon !== undefined && <div className={classes.iconContainer}>{icon}</div>}
        <Typography data-cy="dashboard-placeholder" color="textSecondary" className={classes.label}>
          {label}
        </Typography>
      </Grid>
      {downloadLogsFile && (
        <Grid item>
          <Button variant="contained" color="primary" onClick={downloadLogsFile}>
            {downloadLabel}
          </Button>
        </Grid>
      )}
    </StyledGrid>
  );
};

DashboardPlaceholder.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string,
  icon: PropTypes.object,
  downloadLogsFile: PropTypes.func,
  downloadLabel: PropTypes.string,
};

DashboardPlaceholder.defaultProps = {
  title: null,
};

export default DashboardPlaceholder;
