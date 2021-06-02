// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DashboardPlaceholder from './components';

const useStyles = makeStyles(theme => ({
  iframe: {
    display: 'block',
    height: '100%',
    width: '100%'
  }
}));

const Dashboard = (props) => {
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

  // Handle optional status property
  const noRun = scenarioState === 'Created';
  const runInProgress = scenarioState === 'Running';
  const hasError = scenarioState === 'Failed';
  const isReady = scenarioState === undefined || scenarioState === 'Successful';

  return (
    <>
      {
        noRun && <DashboardPlaceholder
          labelKey='commoncomponents.iframe.scenario.results.text.uninitialized'
          defaultLabel='The scenario has not been run yet'
        />
      }
      {
        runInProgress && <DashboardPlaceholder
          labelKey='commoncomponents.iframe.scenario.results.text.running'
          defaultLabel='Scenario run in progress...'
          icon={ <AccessTimeIcon color="primary" fontSize="large"/> }
        />
      }
      {
        hasError && <DashboardPlaceholder
          labelKey='commoncomponents.iframe.scenario.results.text.error'
          defaultLabel='An error occured during the scenario run'
        />
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
      { isReady && formattedUrl === '' && <DashboardPlaceholder
        labelKey='commoncomponents.iframe.scenario.results.text.no.result'
        defaultLabel='No dashboards for this scenario.'
      />
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

export default Dashboard;
