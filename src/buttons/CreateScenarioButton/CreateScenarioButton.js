import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, IconButton } from '@mui/material';
import { FadingTooltip } from '../../misc';
import CreateScenarioDialog from './components';

const DEFAULT_LABELS = {
  button: {
    title: 'Create',
    tooltip: 'Create new Scenario',
  },
  dialog: {
    title: 'Create new Scenario',
    scenarioName: 'Scenario Name',
    scenarioMaster: 'Master',
    scenarioParent: 'Scenario Parent',
    datasetPlaceholder: 'Dataset',
    dataset: 'Dataset',
    scenarioTypePlaceholder: 'Scenario run type',
    scenarioType: 'Run type',
    cancel: 'Cancel',
    create: 'Create',
  },
  errors: {
    emptyScenarioName: 'Scenario Name should not be empty',
    existingScenarioName: 'Scenario Name already exists',
    forbiddenCharsInScenarioName: 'Forbidden characters in Scenario Name',
  },
};
export const CreateScenarioButton = ({
  currentScenario,
  datasets,
  scenarios,
  runTemplates,
  defaultRunTemplateDataset,
  user,
  createScenario,
  workspaceId,
  solution,
  disabled = false,
  labels: tmpLabels,
  isIconButton,
}) => {
  const labels = { ...DEFAULT_LABELS, ...tmpLabels };
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const buttonContent = isIconButton ? (
    <IconButton data-cy="create-scenario-button" size="medium" onClick={openDialog} color="primary" disabled={disabled}>
      <AddCircleIcon />
    </IconButton>
  ) : (
    <Button
      data-cy="create-scenario-button"
      size="medium"
      variant="contained"
      onClick={openDialog}
      color="primary"
      disabled={disabled}
    >
      {labels.button.title}
    </Button>
  );
  return (
    <div>
      <FadingTooltip arrow title={labels.button.tooltip} disableHoverListener={!isIconButton && !disabled}>
        {buttonContent}
      </FadingTooltip>
      <CreateScenarioDialog
        createScenario={createScenario}
        workspaceId={workspaceId}
        solution={solution}
        open={open}
        currentScenario={currentScenario}
        datasets={datasets}
        closeDialog={closeDialog}
        runTemplates={runTemplates}
        defaultRunTemplateDataset={defaultRunTemplateDataset}
        scenarios={scenarios}
        user={user}
        dialogLabels={labels.dialog}
        errorLabels={labels.errors}
      />
    </div>
  );
};

CreateScenarioButton.propTypes = {
  /**
   * Selected scenario in context
   */
  currentScenario: PropTypes.object,
  /**
   * List of available scenarios
   */
  scenarios: PropTypes.array.isRequired,
  /**
   * List of available datasets
   */
  datasets: PropTypes.array.isRequired,
  /**
   * List of available scenario types
   */
  runTemplates: PropTypes.array.isRequired,
  /**
   * Optional dict of default dataset by run templates:
   *   - key: run template id
   *   - value: dataset id
   */
  defaultRunTemplateDataset: PropTypes.object,
  /**
   * User information (will be sent for scenario creation)
   */
  user: PropTypes.object.isRequired,
  /**
   * Function that create a scenario
   */
  createScenario: PropTypes.func.isRequired,
  /**
   * Current workspace id
   */
  workspaceId: PropTypes.string.isRequired,
  /**
   * Current solution
   */
  solution: PropTypes.object.isRequired,
  /**
   *  Defines the CreateScenarioButton's state:
   *  - true : the button is disabled (the tooltip will guide users on how to enable the button)
   *  - false : the button is enabled
   */
  disabled: PropTypes.bool.isRequired,
  /**
   * Structure:
   * <pre>
   *   {
          button : {
              title: 'string',
              tooltip: 'string'
          },
          dialog: {
            title: 'string',
            scenarioName: 'string',
            scenarioMaster: 'string',
            scenarioParent: 'string',
            datasetPlaceholder: 'string',
            dataset: 'string',
            scenarioTypePlaceholder: 'string',
            scenarioType: 'string',
            cancel: 'string',
            create: 'string'
          },
          errors: {
            emptyScenarioName:'string',
            existingScenarioName:'string',
            forbiddenCharsInScenarioName:'string'
          }
      }
   * </pre>
   */
  labels: PropTypes.shape({
    button: PropTypes.shape({
      title: PropTypes.string.isRequired,
      tooltip: PropTypes.string.isRequired,
    }).isRequired,
    dialog: PropTypes.object.isRequired,
    errors: PropTypes.shape({
      emptyScenarioName: PropTypes.string.isRequired,
      existingScenarioName: PropTypes.string.isRequired,
      forbiddenCharsInScenarioName: PropTypes.string.isRequired,
    }).isRequired,
  }),
  /**
   *  Defines the CreateScenarioButton's form:
   *  - true : the button is round shaped and has an Add icon instead of title
   *  - false (default value): the button is contained and has a title
   */
  isIconButton: PropTypes.bool,
};
