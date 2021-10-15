import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CreateScenarioDialog from './components';

export const CreateScenarioButton = ({
  currentScenario,
  datasets,
  scenarios,
  runTemplates,
  user,
  createScenario,
  workspaceId,
  solution,
  disabled,
  nameValidator,
  labels,
}) => {
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const datasetsFilter = (dataset) => {
    if (dataset.tags === null) return false;
    return dataset.tags.includes('dataset');
  };

  return (
    <div>
      <Tooltip arrow title={labels.button.tooltip}>
        <div>
          <Button
            data-cy="create-scenario-button"
            size="medium"
            startIcon={<AddIcon />}
            variant="contained"
            onClick={openDialog}
            color="primary"
            disabled={disabled}
          >
            {labels.button.title}
          </Button>
        </div>
      </Tooltip>
      <CreateScenarioDialog
        createScenario={createScenario}
        workspaceId={workspaceId}
        solution={solution}
        open={open}
        currentScenario={currentScenario}
        datasets={datasets}
        closeDialog={closeDialog}
        runTemplates={runTemplates}
        scenarios={scenarios}
        user={user}
        nameValidator={nameValidator}
        datasetsFilter={datasetsFilter}
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
   * RegExp used to validate scenario name
   */
  nameValidator: PropTypes.instanceOf(RegExp),
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
};

CreateScenarioButton.defaultProps = {
  disabled: false,
  labels: {
    button: {
      title: 'Create new Scenario',
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
  },
};
