import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, IconButton, MenuItem, Stack, Typography } from '@mui/material';
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
  variant = 'button',
}) => {
  const labels = { ...DEFAULT_LABELS, ...tmpLabels };
  const [open, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);

  useEffect(() => {
    if (isIconButton != null)
      console.warn(
        'DEPRECATED: the prop isIconButton in the CreateScenarioButton component has been deprecated. ' +
          'Please use the prop variant="icon"|"menuItem"|"button" instead.'
      );
  }, [isIconButton]);

  const buttonContent = useMemo(() => {
    const openDialog = () => setOpen(true);

    if (variant === 'icon' || isIconButton === true)
      return (
        <IconButton
          data-cy="create-scenario-button"
          size="medium"
          onClick={openDialog}
          color="primary"
          disabled={disabled}
        >
          <AddCircleIcon />
        </IconButton>
      );

    if (variant === 'menuItem')
      return (
        <MenuItem data-cy="create-scenario-button" onClick={openDialog} disabled={disabled}>
          <Stack spacing={2} direction="row">
            <AddCircleIcon size="small" />
            <Typography>{labels.button.title}</Typography>
          </Stack>
        </MenuItem>
      );

    return (
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
  }, [isIconButton, variant, disabled, labels.button.title]);

  const buttonWrapper = useMemo(() => {
    if (isIconButton !== true && variant !== 'icon' && !disabled) return buttonContent;
    return (
      <FadingTooltip disableInteractive title={labels.button.tooltip}>
        {buttonContent}
      </FadingTooltip>
    );
  }, [buttonContent, isIconButton, disabled, labels.button.tooltip, variant]);

  return (
    <>
      {buttonWrapper}
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
    </>
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
   *  DEPRECATED: use the "variant" prop instead
   *  Defines the CreateScenarioButton's form:
   *  - true : the button is round shaped and has an Add icon instead of title
   *  - false (default value): the button is contained and has a title
   */
  isIconButton: PropTypes.bool,
  /**
   *  Defines the style of the RolesEditionButton element:
   *  - button (default value): the button is contained and has a title
   *  - icon : the button is round shaped icon, the label is replaced by a tolltip on mouse hover
   *  - menuItem : a MenuItem element is returned, containing an icon and a label
   */
  variant: PropTypes.string,
};
