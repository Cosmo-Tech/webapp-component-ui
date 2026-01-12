// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';
import { RUNNER_RUN_STATE } from '../../common/apiConstants';
import DashboardPlaceholderLayout from './components';

const DEFAULT_LABELS = {
  noScenario: {
    title: 'No scenario yet',
    label: 'You can create a scenario by clicking on the CREATE button in Scenario View',
  },
  noRun: {
    title: '',
    label: 'The scenario has not been run yet',
  },
  inProgress: {
    title: '',
    label: 'Scenario run in progress...',
  },
  hasErrors: {
    title: '',
    label: 'An error occured during the scenario run',
  },
  downloadButton: 'Download logs',
  noResult: {
    title: '',
    label: 'No dashboards for this scenario.',
  },
};

export const Dashboard = (props) => {
  const {
    iframeTitle,
    url,
    scenarioName,
    scenarioId,
    csmSimulationRun,
    scenarioState,
    noScenario = false,
    downloadLogsFile,
    labels: tmpLabels,
    ...otherProps
  } = props;

  const labels = { ...DEFAULT_LABELS, ...tmpLabels };
  const formattedUrl = url
    .replace(/<ScenarioName>/g, scenarioName)
    .replace(/<ScenarioId>/g, scenarioId)
    .replace(/<CsmSimulationRun>/g, csmSimulationRun);

  // Handle optional status property
  const noRun = scenarioState === RUNNER_RUN_STATE.CREATED || scenarioState === null;
  const runInProgress = scenarioState === RUNNER_RUN_STATE.RUNNING;
  const hasError = scenarioState === RUNNER_RUN_STATE.FAILED;
  const isReady = (scenarioState === undefined || scenarioState === RUNNER_RUN_STATE.SUCCESSFUL) && !noScenario;

  return (
    <>
      {noScenario && <DashboardPlaceholderLayout label={labels.noScenario.label} title={labels.noScenario.title} />}
      {noRun && <DashboardPlaceholderLayout label={labels.noRun.label} title={labels.noRun.title} />}
      {runInProgress && (
        <DashboardPlaceholderLayout label={labels.inProgress.label} title={labels.inProgress.title} inProgress />
      )}
      {hasError && (
        <DashboardPlaceholderLayout
          label={labels.hasErrors.label}
          title={labels.hasErrors.title}
          downloadLogsFile={downloadLogsFile}
          downloadLabel={labels.downloadButton}
        />
      )}
      {isReady && formattedUrl !== '' && (
        <iframe
          style={{ display: 'block', height: '100%', width: '100%' }}
          title={iframeTitle}
          frameBorder="0"
          allowFullScreen={true}
          src={formattedUrl}
          {...otherProps}
        />
      )}
      {isReady && formattedUrl === '' && (
        <DashboardPlaceholderLayout label={labels.noResult.label} title={labels.noResult.title} />
      )}
    </>
  );
};

Dashboard.propTypes = {
  /**
   *  Iframe's title
   */
  iframeTitle: PropTypes.string.isRequired,
  /**
   *  Dashboard's url
   */
  url: PropTypes.string.isRequired,
  /**
   *  Current scenario name
   */
  scenarioName: PropTypes.string,
  /**
   *  Current scenario id
   */
  scenarioId: PropTypes.string,
  /**
   *  Current scenario, last run id
   */
  csmSimulationRun: PropTypes.string,
  /**
   *  Current scenario state
   */
  scenarioState: PropTypes.string,
  /**
   *  Has scenario or not
   */
  noScenario: PropTypes.bool,
  /**
   * Function linked to download logs button
   */
  downloadLogsFile: PropTypes.func,
  /**
   * Structure:
   * <pre>
   * {
      noScenario: {
        title:'string',
        label:'string'
        },
      noRun: {
        title: 'string',
        label: 'string'
        },
      inProgress: {
        title: 'string',
        label:'string'
        },
      hasErrors: {
        title:'string',
        label: 'string'
      },
      downloadButton: 'string',
      noResult: {
        title: 'string',
        label: 'string'
      }
   }
   * </pre>
   */
  labels: PropTypes.shape({
    noScenario: PropTypes.shape({
      title: PropTypes.string,
      label: PropTypes.string.isRequired,
    }).isRequired,
    noRun: PropTypes.shape({
      title: PropTypes.string,
      label: PropTypes.string.isRequired,
    }).isRequired,
    inProgress: PropTypes.shape({
      title: PropTypes.string,
      label: PropTypes.string.isRequired,
    }).isRequired,
    hasErrors: PropTypes.shape({
      title: PropTypes.string,
      label: PropTypes.string.isRequired,
    }).isRequired,
    downloadButton: PropTypes.string.isRequired,
    noResult: PropTypes.shape({
      title: PropTypes.string,
      label: PropTypes.string.isRequired,
    }).isRequired,
  }),
};
