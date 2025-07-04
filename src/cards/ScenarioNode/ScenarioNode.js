// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  DeleteForever as DeleteForeverIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { DatasetUtils } from '@cosmotech/core';
import { DescriptionEditor, TagsEditor } from '../../inputs';
import { FadingTooltip, ScenarioValidationStatusChip } from '../../misc';
import { ConfirmDeleteDialog, EditableLink } from './components';
import useStyles from './style';

const DEFAULT_LABELS = {
  status: 'Run status:',
  runTemplateLabel: 'Run type:',
  successful: 'Successful',
  running: 'Running',
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
  dataset: 'Datasets:',
  noDataset: 'None',
  datasetNotFound: 'Not Found',
  validationStatus: {
    rejected: 'Rejected',
    validated: 'Validated',
  },
  description: { label: 'Description', placeholder: 'Description of your scenario' },
  tags: {
    header: 'Tags',
    placeholder: 'Enter a new tag',
  },
};

export const ScenarioNode = ({
  datasets,
  isExpanded,
  setIsExpanded,
  scenario,
  showDeleteIcon = false,
  onScenarioRedirect = null,
  deleteScenario,
  checkScenarioNameValue = () => null,
  canRenameScenario = true,
  canUpdateScenario,
  onScenarioRename,
  labels: tmpLabels,
  buildScenarioNameToDelete,
  onScenarioUpdate = () => null,
}) => {
  const classes = useStyles();
  const labels = { ...DEFAULT_LABELS, ...tmpLabels };
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  labels.deleteDialog.title = buildScenarioNameToDelete(scenario.name);

  const openConfirmDialog = (event) => {
    event.stopPropagation(); // Prevent opening the Accordion when clicking the "delete" button
    setIsConfirmDialogOpen(true);
  };
  const closeConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };

  function confirmScenarioDelete() {
    closeConfirmDialog();
    deleteScenario(scenario.id);
  }

  const handleAccordionExpand = (event, newIsExpanded) => {
    setIsExpanded(newIsExpanded);
  };

  const getTranslatedStatus = () => {
    if (!scenario.state) {
      return '';
    }
    return labels[scenario.state.toLowerCase()] ? labels[scenario.state.toLowerCase()] : scenario.state;
  };

  const getStatusIconClassName = () => {
    if (scenario.state === 'Created') {
      return null;
    }
    if (scenario.state === 'Running' || scenario.state === 'DataIngestionInProgress') {
      return classes.statusRunningIcon;
    }
    if (scenario.state === 'Successful') {
      return classes.statusSuccessfulIcon;
    }
    if (scenario.state === 'Failed') {
      return classes.statusFailedIcon;
    }
    return classes.statusUnknownIcon;
  };

  const getStatusClassName = () => {
    if (scenario.state === 'Created') {
      return classes.statusCreated;
    }
    if (scenario.state === 'Running' || scenario.state === 'DataIngestionInProgress') {
      return classes.statusRunning;
    }
    if (scenario.state === 'Successful') {
      return classes.statusSuccessful;
    }
    if (scenario.state === 'Failed') {
      return classes.statusFailed;
    }
    return classes.statusUnknown;
  };

  const getStatusIcon = (showLabel) => {
    const statusClassName = getStatusClassName(classes, scenario.state);
    const iconClassName = getStatusIconClassName(classes, scenario.state);
    const status = getTranslatedStatus(labels, scenario.state);
    let icon = null;
    switch (scenario.state) {
      case 'Successful':
        icon = <CheckCircleIcon className={iconClassName} aria-label={status} />;
        break;
      case 'Failed':
        icon = <CancelIcon className={iconClassName} aria-label={status} />;
        break;
      case 'Running':
      case 'DataIngestionInProgress':
        icon = <CircularProgress size={25} className={iconClassName} aria-label={status} />;
        break;
      case 'Created':
      case 'Unknown':
      default:
        icon = <HelpIcon className={classes.statusUnknownIcon} aria-label={status} />;
        break;
    }
    return (
      <>
        {showLabel ? (
          <Typography data-cy={'scenario-status-' + scenario.state.toLowerCase()} className={statusClassName}>
            {status}
          </Typography>
        ) : null}
        {scenario.state === 'Created' ? null : (
          <FadingTooltip key="scenario-status-tooltip" title={status}>
            {icon}
          </FadingTooltip>
        )}
      </>
    );
  };

  const getValidationStatus = (clickable = true) => {
    const className = clickable ? classes.clickableValidationStatusChip : classes.nonClickableValidationStatusChip;
    return (
      <ScenarioValidationStatusChip
        className={className}
        status={scenario.validationStatus || 'Unknown'}
        labels={labels.validationStatus}
      />
    );
  };

  const getScenarioName = () => {
    return (
      <EditableLink
        value={scenario.name}
        checkValue={checkScenarioNameValue}
        onNewValue={(newScenarioName) => onScenarioRename(scenario.id, newScenarioName, scenario.runTemplateId)}
        onClick={() => onScenarioRedirect(scenario.id)}
        labels={labels.scenarioRename}
        typographyProps={{ variant: 'h6', flexGrow: 1 }}
        canRenameScenario={canRenameScenario}
      />
    );
  };

  const getDetailedStatus = () => {
    return (
      <div className={classes.scenarioDetailsStatusContainer}>
        <Typography className={classes.cardLabel}>{labels.status}</Typography>
        {getStatusIcon(true)}
      </div>
    );
  };

  const datasetNames = useMemo(() => {
    if (!scenario.datasetList || scenario.datasetList.length === 0) return labels.noDataset ?? 'None';
    return DatasetUtils.getDatasetNames(datasets, scenario.datasetList) || (labels.datasetNotFound ?? 'Not found');
  }, [datasets, labels.datasetNotFound, labels.noDataset, scenario.datasetList]);

  const getScenarioDetailNameLine = (isExpanded = false) => {
    return (
      <>
        <Box sx={{ alignContent: 'flex-start' }}>
          {getScenarioName()}
          {!isExpanded && (
            <Stack direction="row">
              <FadingTooltip title={labels.runTemplateLabel + ' ' + scenario.runTemplateName}>
                <Typography
                  variant="subtitle2"
                  component="span"
                  sx={{
                    fontWeight: '700',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 1,
                    overflow: 'hidden',
                    wordBreak: 'break-all',
                  }}
                >
                  {labels.runTemplateLabel}
                  <Typography variant="subtitle2" component="span" sx={{ fontWeight: 'normal' }}>
                    &nbsp;{scenario.runTemplateName}
                  </Typography>
                </Typography>
              </FadingTooltip>
              <Typography variant="subtitle2" component="span" sx={{ mx: 0.5 }}>
                |
              </Typography>
              <FadingTooltip title={labels.dataset + ' ' + datasetNames}>
                <Typography
                  variant="subtitle2"
                  component="span"
                  sx={{
                    fontWeight: '700',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 1,
                    overflow: 'hidden',
                    wordBreak: 'break-all',
                  }}
                >
                  {labels.dataset}&nbsp;
                  <Typography variant="subtitle2" component="span" sx={{ fontWeight: 'normal' }}>
                    {datasetNames}
                  </Typography>
                </Typography>
              </FadingTooltip>
            </Stack>
          )}
        </Box>
        {getValidationStatus(isExpanded)}
      </>
    );
  };

  const getScenarioCreationData = () => {
    return [
      <span data-cy="scenario-owner-name" key="scenario-owner-name" className={classes.scenarioHeaderItem}>
        {scenario.ownerName}
      </span>,
      <span data-cy="scenario-creation-date" key="scenario-creation-date" className={classes.scenarioHeaderItem}>
        {new Date(scenario.creationDate).toLocaleString()}
      </span>,
    ];
  };

  const getScenarioHeader = () => {
    return (
      <Box className={classes.scenarioHeader} sx={{ flexGrow: 1 }}>
        {isExpanded ? getScenarioCreationData() : getScenarioDetailNameLine(false)}
      </Box>
    );
  };

  const getAccordionSummary = () => {
    return (
      <AccordionSummary
        className={classes.accordionSummary}
        expandIcon={<ExpandMoreIcon data-cy="expand-accordion-button" />}
        component="div"
        role="button"
      >
        {getScenarioHeader()}
        {showDeleteIcon && (
          <FadingTooltip title={labels.delete || 'Delete file'}>
            <IconButton
              className={classes.scenarioDeleteButton}
              data-cy="scenario-delete-button"
              aria-label="delete scenario"
              size="small"
              onClick={openConfirmDialog}
            >
              <DeleteForeverIcon fontSize="small" />
            </IconButton>
          </FadingTooltip>
        )}
      </AccordionSummary>
    );
  };
  const getAccordionDetails = () => {
    return (
      <AccordionDetails className={classes.scenarioDetailsContainer} sx={{ gap: 1 }}>
        <div className={classes.scenarioDetailsNameLine}>{getScenarioDetailNameLine(true)}</div>
        <DescriptionEditor
          labels={labels.description}
          value={scenario.description}
          scenarioId={scenario.id}
          onChange={(value) => onScenarioUpdate(scenario.id, { description: value }, scenario.runTemplateId)}
          readOnly={!canUpdateScenario}
        />
        <TagsEditor
          id="scenario-tags"
          labels={labels.tags}
          values={scenario.tags}
          readOnly={!canUpdateScenario}
          onChange={(value) => onScenarioUpdate(scenario.id, { tags: value }, scenario.runTemplateId)}
          headerStyle={{ color: 'unset', fontWeight: '700' }}
        />
        {getDetailedStatus()}
        <Typography className={classes.cardLabel}>{labels.runTemplateLabel ?? 'Run type:'}</Typography>
        <Typography data-cy="scenario-run-template" className={classes.runTemplateName}>
          {scenario.runTemplateName}
        </Typography>
        <Typography className={classes.cardLabel}>{labels.dataset}</Typography>
        <Typography>
          <span data-cy="scenario-datasets" className={classes.datasets}>
            {datasetNames}
          </span>
        </Typography>
      </AccordionDetails>
    );
  };

  const rootClass = isExpanded ? classes.rootExpandedScenarioContainer : classes.rootShrunkScenarioContainer;
  return (
    <Paper key={scenario.id} className={rootClass}>
      <ConfirmDeleteDialog
        open={isConfirmDialogOpen}
        closeDialog={closeConfirmDialog}
        confirmDelete={confirmScenarioDelete}
        labels={labels.deleteDialog}
      ></ConfirmDeleteDialog>
      <Accordion data-cy={'scenario-accordion-' + scenario.id} expanded={isExpanded} onChange={handleAccordionExpand}>
        {getAccordionSummary()}
        {isExpanded ? getAccordionDetails() : null}
      </Accordion>
    </Paper>
  );
};

ScenarioNode.propTypes = {
  /**
   * Datasets list
   */
  datasets: PropTypes.array.isRequired,
  /**
   * True if the accordion showing the scenario details is open, false otherwise.
   */
  isExpanded: PropTypes.bool.isRequired,
  /**
   * Function to change the value of isExpanded.
   */
  setIsExpanded: PropTypes.func.isRequired,
  /**
   * Scenario to display
   */
  scenario: PropTypes.object.isRequired,
  /**
   *  Define the ScenarioNode's delete button state:
   *  - true : the button is shown
   *  - false : the button is hidden
   */
  showDeleteIcon: PropTypes.bool.isRequired,
  /**
   * Function bound to redirect to scenario view with matching current scenario
   */
  onScenarioRedirect: PropTypes.func,
  /**
   * Function bound on delete button
   */
  deleteScenario: PropTypes.func.isRequired,
  /**
   * Boolean value defining whether scenario edition is allowed in the ScenarioNode card
   */
  canRenameScenario: PropTypes.bool,
  /**
   * Boolean value defining whether scenario edition is allowed in the ScenarioNode card
   */
  canUpdateScenario: PropTypes.bool,
  /**
   * Function to handle scenario renaming
   */
  onScenarioRename: PropTypes.func.isRequired,
  /**
   * Function to handle the update of scenario metadata
   */
  onScenarioUpdate: PropTypes.func,
  /**
   * Function to check potential errors in scenario new name
   */
  checkScenarioNameValue: PropTypes.func,
  /**
   *  Labels.
   *
   *  Structure:
   * <pre>
   *   {
        status: 'string',
        runTemplateLabel: 'string',
        successful: 'string',
        failed: 'string',
        created: 'string',
        delete: 'string',
        edit: 'string',
        scenarioRename: {
          title: 'string'
          errors: {
            emptyScenarioName: 'string'
            forbiddenCharsInScenarioName: 'string'
          },
        },
        running: 'string',
        dataset: 'string',
        noDataset: 'string',
        datasetNotFound: 'string'
        deleteDialog : {
          title: 'string',
          description: 'string',
          cancel: 'string',
          confirm: 'string',
        }
        validationStatus : {
          rejected: 'string',
          validated: 'string',
        }
   *   }
   * </pre>
   */
  labels: PropTypes.shape({
    status: PropTypes.string.isRequired,
    runTemplateLabel: PropTypes.string,
    successful: PropTypes.string.isRequired,
    failed: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    delete: PropTypes.string.isRequired,
    edit: PropTypes.string.isRequired,
    scenarioRename: PropTypes.shape({
      title: PropTypes.string,
      errors: PropTypes.shape({
        emptyScenarioName: PropTypes.string,
        forbiddenCharsInScenarioName: PropTypes.string,
      }),
    }),
    running: PropTypes.string.isRequired,
    dataset: PropTypes.string.isRequired,
    noDataset: PropTypes.string,
    datasetNotFound: PropTypes.string,
    deleteDialog: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string.isRequired,
      cancel: PropTypes.string.isRequired,
      confirm: PropTypes.string.isRequired,
    }).isRequired,
    validationStatus: PropTypes.shape({
      rejected: PropTypes.string.isRequired,
      validated: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
    }),
    tags: PropTypes.shape({
      header: PropTypes.string,
      placeholder: PropTypes.string,
    }),
  }),
  /**
   * Function to store the scenario's name selected for delete, used in confirmation dialog
   */
  buildScenarioNameToDelete: PropTypes.func.isRequired,
};
