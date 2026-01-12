// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';
import { RUNNER_RUN_STATE } from '../../common/apiConstants';
import DashboardPlaceholderLayout from '../DashboardPlaceholderLayout';

const DEFAULT_LABELS = {
  noScenario: {
    title: 'No scenario yet',
    label: 'You can create a scenario by clicking on the CREATE button',
  },
  noDashboard: { label: "There isn't any dashboard configured for this run type" },
  noRun: { label: 'The scenario has not been run yet' },
  inProgress: { label: 'Scenario run in progress...' },
  hasErrors: { label: 'An error occured during the scenario run' },
  hasUnknownStatus: {
    label: 'This scenario has an unknown state, if the problem persists, please, contact your administrator',
  },
  resultsDisplayDisabled: 'Display of results is disabled',
  downloadButton: 'Download logs',
  errors: {
    unknown: 'Unknown error',
    details: 'Something went wrong when fetching PowerBI reports info',
  },
};

const DashboardPlaceholder = (props) => {
  const {
    alwaysShowReports,
    disabled,
    downloadLogsFile,
    noDashboardConfigured,
    labels: tmpLabels,
    scenario,
    scenarioDTO,
  } = props;
  const labels = { ...DEFAULT_LABELS, ...tmpLabels };

  const noScenario = scenario === null;
  const scenarioLastRunStatus = noScenario ? RUNNER_RUN_STATE.CREATED : scenarioDTO.lastRunStatus;
  const noRun = scenarioLastRunStatus === RUNNER_RUN_STATE.CREATED || scenarioLastRunStatus === null;
  const runInProgress = scenarioLastRunStatus === RUNNER_RUN_STATE.RUNNING;
  const hasError = scenarioLastRunStatus === RUNNER_RUN_STATE.FAILED;
  const hasUnknownStatus = scenarioLastRunStatus === RUNNER_RUN_STATE.UNKNOWN;

  if (alwaysShowReports) return null;
  if (noScenario) return <DashboardPlaceholderLayout label={labels.noScenario.label} title={labels.noScenario.title} />;
  if (noRun) return <DashboardPlaceholderLayout label={labels.noRun.label} title={labels.noRun.title} />;
  if (runInProgress)
    return <DashboardPlaceholderLayout label={labels.inProgress.label} title={labels.inProgress.title} inProgress />;
  if (hasError)
    return (
      <DashboardPlaceholderLayout
        label={labels.hasErrors.label}
        title={labels.hasErrors.title}
        downloadLogsFile={downloadLogsFile}
        downloadLabel={labels.downloadButton}
      />
    );
  if (hasUnknownStatus) return <DashboardPlaceholderLayout label={labels.hasUnknownStatus.label} />;
  if (disabled) return <DashboardPlaceholderLayout label={labels.resultsDisplayDisabled} />;
  if (noDashboardConfigured) return <DashboardPlaceholderLayout label={labels.noDashboard.label} />;
  return null;
};

DashboardPlaceholder.propTypes = {
  alwaysShowReports: PropTypes.bool,
  disabled: PropTypes.bool,
  downloadLogsFile: PropTypes.func,
  noDashboardConfigured: PropTypes.bool,
  scenario: PropTypes.object,
  scenarioDTO: PropTypes.object,
  labels: PropTypes.object,
};

export default DashboardPlaceholder;
