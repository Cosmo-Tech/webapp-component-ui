// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DashboardPlaceholder from './components';
import { useTranslation } from 'react-i18next';

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
    csmSimulationRun,
    scenarioState,
    noScenario,
    downloadLogsFile,
    ...otherProps
  } = props;

  const formattedUrl = url
    .replaceAll('<ScenarioName>', scenarioName)
    .replaceAll('<ScenarioId>', scenarioId)
    .replaceAll('<CsmSimulationRun>', csmSimulationRun);

  const { t } = useTranslation();

  // Handle optional status property
  const noRun = scenarioState === 'Created' || scenarioState === null;
  const runInProgress = scenarioState === 'Running';
  const hasError = scenarioState === 'Failed';
  const isReady = (scenarioState === undefined || scenarioState === 'Successful') && !noScenario;

  return (
    <>
      { noScenario && <DashboardPlaceholder
          label={t('commoncomponents.iframe.scenario.noscenario.label',
            'You can create a scenario by clicking on') + ' "' +
            t('commoncomponents.button.create.scenario.label', 'Create new Scenario') + '"'}
          title={t('commoncomponents.iframe.scenario.noscenario.title', 'No scenario yet')}
        />
      }
      { noRun && <DashboardPlaceholder
          label={t('commoncomponents.iframe.scenario.results.label.uninitialized',
            'The scenario has not been run yet')}
        />
      }
      { runInProgress && <DashboardPlaceholder
          label={t('commoncomponents.iframe.scenario.results.label.running', 'Scenario run in progress...')}
          icon={ <AccessTimeIcon color="primary" fontSize="large"/> }
        />
      }
      {
        hasError && <DashboardPlaceholder
          label={t('commoncomponents.iframe.scenario.results.text.error', 'An error occured during the scenario run')}
          downloadLogsFile={downloadLogsFile}
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
        label={t('commoncomponents.iframe.scenario.results.label.no.result', 'No dashboards for this scenario.')}
      />
      }
    </>
  );
};

Dashboard.propTypes = {
  iframeTitle: PropTypes.string.isRequired,
  url: PropTypes.string,
  scenarioName: PropTypes.string,
  scenarioId: PropTypes.string,
  csmSimulationRun: PropTypes.string,
  scenarioState: PropTypes.string,
  noScenario: PropTypes.bool,
  downloadLogsFile: PropTypes.func
};

Dashboard.defaultProps = {
  noScenario: false
};

export default Dashboard;
