// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

export const LABELS = {
  noScenario: {
    title: 'ut_noScenario_title',
    label: 'ut_noScenario_label',
  },
  noDashboard: {
    label: 'ut_noDashboard_label',
  },
  noRun: {
    label: 'ut_noRun_label',
  },
  inProgress: {
    label: 'ut_inProgress_label',
  },
  hasErrors: {
    label: 'ut_hasErrors_label',
  },
  hasUnknownStatus: {
    label: 'ut_hasUnknownStatus_label',
  },
  downloadButton: 'ut_downloadButton_label',
  refreshTooltip: 'ut_refreshTooltip_label',
  errors: {
    unknown: 'ut_unknownErrors_label',
    details: 'ut_errorsDetails_label',
  },
};

export const SCENARIO_STATES = {
  noRun: 'NotStarted',
  runInProgress: 'Running',
  hasError: 'Failed',
  success: 'Successful',
  unknown: 'Unknown',
};

export const DEFAULT_SCENARIO = {
  id: 'ut_sc_id',
  name: 'ut_sc_name',
  state: SCENARIO_STATES.noRun,
  rootId: 'ut_sc_rootId',
  parentId: 'ut_sc_parentId',
  ownerId: 'ut_sc_ownerId',
  solutionId: 'ut_sc_solutionId',
};
