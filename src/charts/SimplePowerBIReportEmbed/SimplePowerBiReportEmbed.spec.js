import React from 'react';
import { render } from '@testing-library/react';

import { TypographyTesting } from '../../../tests/MuiComponentsTesting';

import { SimplePowerBIReportEmbed } from '.';
import { LABELS, DEFAULT_SCENARIO, SCENARIO_STATES } from '../../../tests/samples/DashboardSample';

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

const setUp = (props) => {
  render(<SimplePowerBIReportEmbed {...props} />);
};

describe('SimplePowerBiReportEmbed', () => {
  describe('PlaceHolder', () => {
    const setUpWithScenarioState = (scenarioState) => {
      const props = {
        ...defaultProps,
        scenario: {
          ...defaultProps.scenario,
          state: scenarioState,
        },
      };

      setUp(props);
    };

    test.each([
      { scenarioState: SCENARIO_STATES.noRun, placeHolderLabel: LABELS.noRun.label },
      { scenarioState: SCENARIO_STATES.dataInTransfer, placeHolderLabel: LABELS.dataInTransfer.label },
      { scenarioState: SCENARIO_STATES.hasError, placeHolderLabel: LABELS.hasErrors.label },
      { scenarioState: SCENARIO_STATES.runInProgress, placeHolderLabel: LABELS.inProgress.label },
      { scenarioState: SCENARIO_STATES.unknown, placeHolderLabel: LABELS.hasUnknownStatus.label },
    ])(
      '$scenarioState Scenario state display placeholder with label $placeHolderLabel',
      ({ scenarioState, placeHolderLabel }) => {
        setUpWithScenarioState(scenarioState);
        expect(TypographyPlaceholderLabel.text).toEqual(placeHolderLabel);
      }
    );
  });
});
