// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { DatasetUtils } from '@cosmotech/core';
import { ConfirmDeleteDialog } from './components';
import useStyles from './style';

export const ScenarioNode = ({
  datasets,
  scenario,
  showDeleteIcon,
  deleteScenario,
  labels
}) => {
  const classes = useStyles();

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const openConfirmDialog = () => { setIsConfirmDialogOpen(true); };
  const closeConfirmDialog = () => { setIsConfirmDialogOpen(false); };

  function confirmScenarioDelete () {
    closeConfirmDialog();
    deleteScenario(scenario.id);
  }

  function getStatusLabel () {
    return labels.status.label + ':';
  }

  function getTranslatedStatus (scenarioState) {
    if (!scenarioState) {
      return '';
    }
    return labels.status[scenarioState.toLowerCase()] ? labels.status[scenarioState.toLowerCase()] : scenarioState;
  }

  function getDatasetsLabel () {
    return labels.dataset + ':';
  }

  return (
    <React.Fragment>
      <ConfirmDeleteDialog
        open={isConfirmDialogOpen}
        closeDialog={ closeConfirmDialog }
        confirmDelete={ confirmScenarioDelete }
      >
      </ConfirmDeleteDialog>
      <Typography
        className={classes.scenarioHeader}
        gutterBottom
      >
        <span>
          <span className={classes.scenarioHeaderItem}>{scenario.ownerName}</span>
          <span className={classes.scenarioHeaderItem}>-</span>
          <span className={classes.scenarioHeaderItem}>{new Date(scenario.creationDate).toLocaleString()}</span>
          {
            showDeleteIcon && (
              <IconButton
                data-cy="scenario-delete-button"
                aria-label="delete scenario"
                size="small"
                onClick={ openConfirmDialog }
              >
                <DeleteForeverIcon fontSize="small"/>
              </IconButton>
            )
          }
        </span>
      </Typography>
      <Typography
        className={classes.scenarioTitle}
        variant="h4"
        data-content={scenario.name}
      >
        {scenario.name}
      </Typography>
      <Typography>
        { getStatusLabel() }
        <span className={ getStatusClassName(classes, scenario.state) }>
          { getTranslatedStatus(scenario.state) }
        </span>
        <br/>
        { getDatasetsLabel() }
        <br/>
        <span className={classes.datasets}>
          { DatasetUtils.getDatasetNames(datasets, scenario.datasetList) }
        </span>
      </Typography>
    </React.Fragment>
  );
};

ScenarioNode.propTypes = {
  /**
   * Dataset's list
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
        status: {
          label: 'string',
          successful: 'string',
          failed: 'string',
          created: 'string'
        },
        dataset: 'string'
   *   }
   *    </pre>
   */
  labels: PropTypes.shape({
    status: PropTypes.shape({
      label: PropTypes.string.isRequired,
      successful: PropTypes.string.isRequired,
      failed: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired
    }).isRequired,
    dataset: PropTypes.string.isRequired
  })
};

ScenarioNode.defaultProps = {
  showDeleteIcon: false,
  labels: {
    status: {
      label: 'Run status',
      successful: 'Successful',
      failed: 'Failed',
      created: 'Created'
    },
    dataset: 'Datasets'
  }
};

function getStatusClassName (classes, scenarioState) {
  if (scenarioState === 'Successful') {
    return classes.statusSuccessful;
  }
  if (scenarioState === 'Failed') {
    return classes.statusFailed;
  }
  return classes.statusCreated;
}
