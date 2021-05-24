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
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const useStyles = makeStyles(theme => ({
  gridContainer: {
    height: '100%'
  },
  iconContainer: {
    textAlign: 'center'
  },
  iframe: {
    display: 'block',
    height: '100%',
    width: '100%'
  },
  label: {
    size: 14
  }
}));

const Dashboard = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    iframeTitle,
    url,
    scenarioName,
    scenarioId,
    scenarioState,
    ...otherProps
  } = props;
  const formattedUrl = url.replaceAll('<ScenarioName>', scenarioName).replaceAll('<ScenarioId>', scenarioId);

  const getPlaceHolder = (label_key, default_label, icon) => {
    return <Grid container justify="center" alignItems="center" className={classes.gridContainer}>
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
          {t(label_key, default_label)}
        </Typography>
      </Grid>
    </Grid>
  }

  // Handle optional status property
  const noRun = scenarioState === 'Created';
  const runInProgress = scenarioState === 'Running';
  const hasError = scenarioState === 'Failed';
  const isReady = scenarioState === undefined || scenarioState === 'Successful';

  return (
    <>
      {
        noRun && getPlaceHolder(
          'commoncomponents.iframe.scenario.results.text.uninitialized',
          'The scenario has not been run yet')
      }
      {
        runInProgress && getPlaceHolder(
          'commoncomponents.iframe.scenario.results.text.running',
          'Scenario run in progress...',
          <AccessTimeIcon color="primary" fontSize="large"/>)
      }
      {
        hasError && getPlaceHolder(
          'commoncomponents.iframe.scenario.results.text.error',
          'An error occured during the scenario run')
      }
      { isReady && formattedUrl !== '' &&
        <iframe
          className={classes.iframe}
          title={iframeTitle}
          frameBorder="0"
          allowFullScreen={true}
          src={formattedUrl} {...otherProps}
        />
      }
      { isReady && formattedUrl === '' && getPlaceHolder(
          'commoncomponents.iframe.scenario.results.text.no.result',
          'No dashboards for this scenario.')
      }
    </>
  );
};

Dashboard.propTypes = {
  iframeTitle: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  scenarioName: PropTypes.string,
  scenarioId: PropTypes.string,
  scenarioState: PropTypes.string
};

export default withStyles(useStyles)(Dashboard);
