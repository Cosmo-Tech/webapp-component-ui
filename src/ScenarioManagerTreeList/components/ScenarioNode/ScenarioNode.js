// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { IconButton, Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { DatasetUtils } from '@cosmotech/core';
import { ConfirmDeleteDialog } from './components';
import useStyles from './style';

const ScenarioNode = ({
  datasets,
  scenario,
  showDeleteIcon,
  deleteScenario
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const openConfirmDialog = () => { setIsConfirmDialogOpen(true); };
  const closeConfirmDialog = () => { setIsConfirmDialogOpen(false); };

  function confirmScenarioDelete () {
    closeConfirmDialog();
    deleteScenario(scenario.id);
  }

  function getStatusLabel () {
    return t('commoncomponents.scenariomanager.treelist.node.status.label', 'Run status') + ':';
  }

  function getTranslatedStatus (scenarioState) {
    if (!scenarioState) {
      return '';
    }
    return t('commoncomponents.scenariomanager.treelist.node.status.' + scenarioState.toLowerCase(), scenarioState);
  }

  function getDatasetsLabel (scenarioDatasets) {
    return t('commoncomponents.scenariomanager.treelist.node.dataset',
      'Datasets',
      { count: scenarioDatasets?.length || 0 }
    ) + ':';
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
        color="textSecondary"
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
                color="default"
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
      <Typography color="textSecondary">
        { getStatusLabel() }
        <span className={ getStatusClassName(classes, scenario.state) }>
          { getTranslatedStatus(scenario.state) }
        </span>
        <br/>
        { getDatasetsLabel(scenario.datasetList) }
        <br/>
        <span className={classes.datasets}>
          { DatasetUtils.getDatasetNames(datasets, scenario.datasetList) }
        </span>
      </Typography>
    </React.Fragment>
  );
};

ScenarioNode.propTypes = {
  datasets: PropTypes.array.isRequired,
  scenario: PropTypes.object.isRequired,
  showDeleteIcon: PropTypes.bool.isRequired,
  deleteScenario: PropTypes.func.isRequired
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

export default ScenarioNode;
