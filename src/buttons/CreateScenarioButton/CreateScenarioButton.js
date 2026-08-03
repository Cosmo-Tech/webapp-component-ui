import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
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
  autoFocus,
  currentScenario,
  datasets,
  scenarios,
  runTemplates,
  defaultRunTemplateDataset,
  user,
  createScenario,
  onConfirm,
  onClose,
  workspaceId,
  solution,
  disabled = false,
  editMode = false,
  labels: tmpLabels,
  isIconButton,
  variant = 'button',
}) => {
  const labels = { ...DEFAULT_LABELS, ...tmpLabels };
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
    onClose && onClose();
  };
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
          {editMode ? <EditIcon /> : <AddCircleIcon />}
        </IconButton>
      );

    if (variant === 'menuItem')
      return (
        <MenuItem autoFocus={autoFocus} data-cy="create-scenario-button" onClick={openDialog} disabled={disabled}>
          <Stack spacing={2} direction="row">
            {editMode ? <EditIcon size="small" /> : <AddCircleIcon size="small" />}
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
  }, [autoFocus, editMode, isIconButton, variant, disabled, labels.button.title]);

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
        onConfirm={onConfirm}
        workspaceId={workspaceId}
        solution={solution}
        open={open}
        editMode={editMode}
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
   *  When variant is menuItem, if autoFocus is true, the list item is focused during the first mount, and when
   *  autoFocus value changes from false to true
   */
  autoFocus: PropTypes.bool,
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
  user: PropTypes.object,
  /**
   * DEPRECATED: use onConfirm instead
   * Function signature: (workspaceId, scenario) => null
   * Function that creates a scenario
   */
  createScenario: PropTypes.func,
  /**
   * Function that creates a new scenario, or updates an existing scenario when editMode is true
   * Function signature: (scenario) => null
   * This prop may become strictly required in a future version, but this is not the case right now for backward
   * compatibility (until the "createScenario" prop is removed)
   */
  onConfirm: PropTypes.func,
  /**
   * Called when the dialog is closed (on cancel or confirm)
   */
  onClose: PropTypes.func,
  /**
   * Current workspace id
   */
  workspaceId: PropTypes.string,
  /**
   * Current solution
   */
  solution: PropTypes.object,
  /**
   *  Defines the CreateScenarioButton's state:
   *  - true : the button is disabled (the tooltip will guide users on how to enable the button)
   *  - false : the button is enabled
   */
  disabled: PropTypes.bool,
  /**
   *  If true, it switches the button and dialog behavior to edit an existing scenario instead of creating a new one
   *  (false by default)
   */
  editMode: PropTypes.bool,
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
