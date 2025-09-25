// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

export const DEFAULT_LABELS = {
  status: 'Run status:',
  runTemplateLabel: 'Run type:',
  successful: 'Successful',
  running: 'Running',
  dataingestioninprogress: 'Transferring results',
  failed: 'Failed',
  created: 'Created',
  delete: 'Delete this scenario',
  edit: 'Edit scenario name',
  scenarioRename: {
    title: 'Scenario name',
    errors: {
      emptyScenarioName: 'Scenario name cannot be empty',
      forbiddenCharsInScenarioName:
        'Scenario name has to start with a letter, and can only contain ' +
        'letters, digits, spaces, underscores, hyphens and dots.',
    },
  },
  deleteDialog: {
    description:
      'This operation is irreversible. Dataset(s) will not be removed, but the scenario parameters will be lost. ' +
      'If this scenario has children, they will be moved to a new parent. ' +
      'The new parent will be the parent of the deleted scenario.',
    cancel: 'Cancel',
    confirm: 'Confirm',
  },
  dataset: 'Dataset:',
  noDataset: 'None',
  datasetNotFound: 'Not Found',
  searchField: 'Filter',
  toolbar: {
    expandAll: 'Expand all',
    expandTree: 'Expand tree',
    collapseAll: 'Collapse all',
  },
  validationStatus: {
    rejected: 'Rejected',
    validated: 'Validated',
  },
};
