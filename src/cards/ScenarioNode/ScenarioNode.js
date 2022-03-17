// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  DeleteForever as DeleteForeverIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
} from '@material-ui/icons';
import { DatasetUtils } from '@cosmotech/core';
import { ConfirmDeleteDialog } from './components';
import useStyles from './style';

export const ScenarioNode = ({
  datasets,
  isExpanded,
  setIsExpanded,
  scenario,
  showDeleteIcon,
  deleteScenario,
  labels,
  buildScenarioNameToDelete,
}) => {
  const classes = useStyles();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const openConfirmDialog = (event) => {
    event.stopPropagation(); // Prevent opening the Accordion when clicking the "delete" button
    labels.deleteDialog.title = buildScenarioNameToDelete(scenario.name);
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

  function getDatasetsLabel() {
    return labels.dataset + ':';
  }

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
    if (scenario.state === 'Running') {
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
    if (scenario.state === 'Running') {
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
        icon = <CircularProgress size={25} className={iconClassName} aria-label={status} />;
        break;
      case 'Created':
        icon = <HelpIcon className={iconClassName} aria-label={status} />;
        break;
    }
    return (
      <>
        {showLabel ? <Typography className={statusClassName}>{status}</Typography> : null}
        {scenario.state === 'Created' ? null : (
          <Tooltip key="scenario-status-tooltip" title={status}>
            {icon}
          </Tooltip>
        )}
      </>
    );
  };

  const getScenarioName = () => {
    return (
      <Tooltip key="scenario-name-tooltip" title={scenario.name}>
        <Typography key="scenario-name" className={classes.scenarioTitle} variant="h4">
          {scenario.name}
        </Typography>
      </Tooltip>
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

  const getScenarioNameAndStatus = () => {
    return (
      <>
        {getScenarioName()}
        {getStatusIcon(false)}
      </>
    );
  };

  const getScenarioCreationData = () => {
    return [
      <span key="scenario-name" className={classes.scenarioHeaderItem}>
        {scenario.ownerName}
      </span>,
      <span key="scenario-creation-date" className={classes.scenarioHeaderItem}>
        {new Date(scenario.creationDate).toLocaleString()}
      </span>,
    ];
  };

  const getScenarioHeader = () => {
    return (
      <Box className={classes.scenarioHeader} flexGrow={1}>
        {isExpanded ? getScenarioCreationData() : getScenarioNameAndStatus()}
      </Box>
    );
  };

  const getAccordionSummary = () => {
    return (
      <AccordionSummary className={classes.accordionSummary} expandIcon={<ExpandMoreIcon />}>
        {getScenarioHeader()}
        {showDeleteIcon && (
          <IconButton
            className={classes.scenarioDeleteButton}
            data-cy="scenario-delete-button"
            aria-label="delete scenario"
            size="small"
            onClick={openConfirmDialog}
          >
            <DeleteForeverIcon fontSize="small" />
          </IconButton>
        )}
      </AccordionSummary>
    );
  };

  const getAccordionDetails = () => {
    return (
      <AccordionDetails className={classes.scenarioDetailsContainer}>
        {getScenarioName()}
        {getDetailedStatus()}
        <Typography className={classes.cardLabel}>{getDatasetsLabel()}</Typography>
        <Typography>
          <span className={classes.datasets}>{DatasetUtils.getDatasetNames(datasets, scenario.datasetList)}</span>
        </Typography>
      </AccordionDetails>
    );
  };

  const rootClass = isExpanded ? classes.rootExpandedScenarioContainer : classes.rootShrunkScenarioContainer;
  return (
    <Paper key={scenario.id} className={rootClass} elevation={3}>
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
   *  Function bound on delete button
   */
  deleteScenario: PropTypes.func.isRequired,
  /**
   *  Labels.
   *
   *  Structure:
   * <pre>
   *   {
        status: 'string',
        successful: 'string',
        failed: 'string',
        created: 'string'
        running: 'string',
        dataset: 'string',
        deleteDialog : {
          title: 'string',
          description: 'string',
          cancel: 'string',
          confirm: 'string'
        }
   *   }
   * </pre>
   */
  labels: PropTypes.shape({
    status: PropTypes.string.isRequired,
    successful: PropTypes.string.isRequired,
    failed: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    running: PropTypes.string.isRequired,
    dataset: PropTypes.string.isRequired,
    deleteDialog: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string.isRequired,
      cancel: PropTypes.string.isRequired,
      confirm: PropTypes.string.isRequired,
    }).isRequired,
  }),
  /**
   * Function to store the scenario's name selected for delete, used in confirmation dialog
   */
  buildScenarioNameToDelete: PropTypes.func.isRequired,
};

ScenarioNode.defaultProps = {
  showDeleteIcon: false,
  labels: {
    status: 'Run status:',
    successful: 'Successful',
    running: 'Running',
    failed: 'Failed',
    created: 'Created',
    dataset: 'Datasets',
  },
};
