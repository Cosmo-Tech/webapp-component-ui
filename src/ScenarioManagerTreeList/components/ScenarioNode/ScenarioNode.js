// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import { DatasetUtils } from '@cosmotech/core';
import useStyles from './style';

const ScenarioNode = ({
  datasets,
  scenario
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

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
      <Typography className={classes.scenarioHeader} color="textSecondary" gutterBottom>
        <span>
          <span className={classes.scenarioHeaderItem}>{scenario.ownerName}</span>
          <span className={classes.scenarioHeaderItem}>-</span>
          <span className={classes.scenarioHeaderItem}>{scenario.creationDate.toLocaleString()}</span>
        </span>
      </Typography>
      <Typography className={classes.scenarioTitle} variant="h4" data-content={scenario.name}>
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
  scenario: PropTypes.object.isRequired
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
