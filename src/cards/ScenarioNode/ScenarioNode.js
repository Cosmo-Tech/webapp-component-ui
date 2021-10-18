// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { IconButton, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DatasetUtils } from '@cosmotech/core';
import { ConfirmDeleteDialog } from './components';

const PREFIX = 'ScenarioNode';

const classes = {
  scenarioHeader: `${PREFIX}-scenarioHeader`,
  scenarioHeaderItem: `${PREFIX}-scenarioHeaderItem`,
  scenarioTitle: `${PREFIX}-scenarioTitle`,
  statusCreated: `${PREFIX}-statusCreated`,
  statusSuccessful: `${PREFIX}-statusSuccessful`,
  statusFailed: `${PREFIX}-statusFailed`,
  datasets: `${PREFIX}-datasets`,
};

const Root = styled('pre')(({ theme }) => ({
  [`& .${classes.scenarioHeader}`]: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  [`& .${classes.scenarioHeaderItem}`]: {
    marginRight: '12px',
  },

  [`& .${classes.scenarioTitle}`]: {
    maxWidth: '500px',
    color: theme.palette.primary.main,
    marginBottom: '8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&:hover::before': {
      background: theme.palette.black,
      color: theme.palette.white,
      content: 'attr(data-content)',
      position: 'absolute',
      bottom: '20px',
      padding: '10px',
      fontSize: '12px',
      whiteSpace: 'break-spaces',
    },
  },

  [`& .${classes.statusCreated}`]: {
    marginLeft: '5px',
    color: theme.palette.text.info,
  },

  [`& .${classes.statusSuccessful}`]: {
    marginLeft: '5px',
    color: theme.palette.text.success,
  },

  [`& .${classes.statusFailed}`]: {
    marginLeft: '5px',
    color: theme.palette.text.error,
  },

  [`& .${classes.datasets}`]: {
    marginLeft: '15px',
  },
}));

export const ScenarioNode = ({ datasets, scenario, showDeleteIcon, deleteScenario, labels }) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const openConfirmDialog = () => {
    setIsConfirmDialogOpen(true);
  };
  const closeConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };

  function confirmScenarioDelete() {
    closeConfirmDialog();
    deleteScenario(scenario.id);
  }

  function getStatusLabel() {
    return labels.status + ':';
  }

  function getTranslatedStatus(scenarioState) {
    if (!scenarioState) {
      return '';
    }
    return labels[scenarioState.toLowerCase()] ? labels[scenarioState.toLowerCase()] : scenarioState;
  }

  function getDatasetsLabel() {
    return labels.dataset + ':';
  }

  return (
    <Root>
      <ConfirmDeleteDialog
        open={isConfirmDialogOpen}
        closeDialog={closeConfirmDialog}
        confirmDelete={confirmScenarioDelete}
        labels={labels.deleteDialog}
      ></ConfirmDeleteDialog>
      <Typography className={classes.scenarioHeader} gutterBottom>
        <span>
          <span className={classes.scenarioHeaderItem}>{scenario.ownerName}</span>
          <span className={classes.scenarioHeaderItem}>-</span>
          <span className={classes.scenarioHeaderItem}>{new Date(scenario.creationDate).toLocaleString()}</span>
          {showDeleteIcon && (
            <IconButton
              data-cy="scenario-delete-button"
              aria-label="delete scenario"
              size="small"
              onClick={openConfirmDialog}
            >
              <DeleteForeverIcon fontSize="small" />
            </IconButton>
          )}
        </span>
      </Typography>
      <Typography className={classes.scenarioTitle} variant="h4" data-content={scenario.name}>
        {scenario.name}
      </Typography>
      <Typography>
        {getStatusLabel()}
        <span className={getStatusClassName(classes, scenario.state)}>{getTranslatedStatus(scenario.state)}</span>
        <br />
        {getDatasetsLabel()}
        <br />
        <span className={classes.datasets}>{DatasetUtils.getDatasetNames(datasets, scenario.datasetList)}</span>
      </Typography>
    </Root>
  );
};

ScenarioNode.propTypes = {
  /**
   * Datasets list
   */
  datasets: PropTypes.array.isRequired,
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
    dataset: PropTypes.string.isRequired,
    deleteDialog: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      cancel: PropTypes.string.isRequired,
      confirm: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

ScenarioNode.defaultProps = {
  showDeleteIcon: false,
  labels: {
    status: 'Run status',
    successful: 'Successful',
    failed: 'Failed',
    created: 'Created',
    dataset: 'Datasets',
  },
};

function getStatusClassName(classes, scenarioState) {
  if (scenarioState === 'Successful') {
    return classes.statusSuccessful;
  }
  if (scenarioState === 'Failed') {
    return classes.statusFailed;
  }
  return classes.statusCreated;
}
