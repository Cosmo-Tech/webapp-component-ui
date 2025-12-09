// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import { SimplePowerBIReportEmbed } from '.';
import { TypographyTesting } from '../../../tests/MuiComponentsTesting';
import { LABELS, DEFAULT_SCENARIO, SCENARIO_STATES } from '../../../tests/samples/DashboardSample';
import { getByDataCy, renderInMuiThemeProvider } from '../../../tests/utils';

const defaultProps = {
  index: 0,
  refreshTimeout: 15000,
  alwaysShowReports: false,
  useAAD: false,
  lang: 'en',
  reports: {},
  reportConfiguration: [],
  refreshable: true,
  scenario: { ...DEFAULT_SCENARIO },
  labels: LABELS,
};

const TypographyPlaceholderLabel = new TypographyTesting({ dataCy: 'dashboard-placeholder' });
const getLinearProgress = () => getByDataCy('dashboard-in-progress');

const setUp = (props) => {
  renderInMuiThemeProvider(<SimplePowerBIReportEmbed {...props} />);
};

describe('SimplePowerBiReportEmbed', () => {
  describe('PlaceHolder', () => {
    const setUpWithLastRunStatus = (lastRunStatus) => {
      const props = {
        ...defaultProps,
        scenario: {
          ...defaultProps.scenario,
          lastRunInfo: { lastRunId: 'run-00000000', lastRunStatus },
        },
      };

      setUp(props);
    };

    test.each([
      { lastRunStatus: SCENARIO_STATES.noRun, placeHolderLabel: LABELS.noRun.label },
      { lastRunStatus: SCENARIO_STATES.hasError, placeHolderLabel: LABELS.hasErrors.label },
      { lastRunStatus: SCENARIO_STATES.runInProgress, placeHolderLabel: LABELS.inProgress.label },
      { lastRunStatus: SCENARIO_STATES.unknown, placeHolderLabel: LABELS.hasUnknownStatus.label },
    ])(
      '$lastRunStatus Scenario state display placeholder with label $placeHolderLabel',
      ({ lastRunStatus, placeHolderLabel }) => {
        setUpWithLastRunStatus(lastRunStatus);
        expect(TypographyPlaceholderLabel.text).toEqual(placeHolderLabel);
      }
    );

    test.each([
      { lastRunStatus: SCENARIO_STATES.noRun, displayInProgress: false },
      { lastRunStatus: SCENARIO_STATES.hasError, displayInProgress: false },
      { lastRunStatus: SCENARIO_STATES.runInProgress, displayInProgress: true },
      { lastRunStatus: SCENARIO_STATES.unknown, displayInProgress: false },
    ])(
      '$lastRunStatus Scenario state display progress bar $displayInProgress',
      ({ lastRunStatus, displayInProgress }) => {
        setUpWithLastRunStatus(lastRunStatus);
        const linearProgress = getLinearProgress();
        if (displayInProgress) {
          expect(linearProgress).toBeInTheDocument();
        } else {
          expect(linearProgress).not.toBeInTheDocument();
        }
      }
    );
  });
});
