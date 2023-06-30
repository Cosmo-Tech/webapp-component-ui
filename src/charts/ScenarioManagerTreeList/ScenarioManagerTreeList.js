// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useEffect, useMemo, useState, useRef, useReducer } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import {
  UnfoldMore as UnfoldMoreIcon,
  UnfoldLess as UnfoldLessIcon,
  AccountTree as AccountTreeIcon,
} from '@mui/icons-material';
import '@nosferatu500/react-sortable-tree/style.css';
import { ScenarioUtils } from '@cosmotech/core';
import useStyles from './style';
import { FadingTooltip } from '../../misc';
import { ScenarioSortableTree, SearchInput } from './components';

const initNodesDict = (scenarios, defaultExpanded) => {
  const nodesDict = {};
  scenarios.forEach((scenario) => {
    nodesDict[scenario.id] = defaultExpanded;
  });
  return nodesDict;
};

const filterMatchesName = (scenario, searchStr) => scenario.name.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1;
const filterMatchesValidationStatus = (labels, scenario, searchStr) => {
  if (!scenario.validationStatus) return false;
  const validationStatusLabel = labels.validationStatus?.[scenario.validationStatus.toLowerCase()]?.toLowerCase();
  return validationStatusLabel && validationStatusLabel.indexOf(searchStr.toLowerCase()) !== -1;
};
const filterMatchesRunStatus = (labels, scenario, searchStr) => {
  if (!scenario.state) return false;
  const runStatusLabel = labels?.[scenario.state.toLowerCase()]?.toLowerCase();
  return runStatusLabel && runStatusLabel.indexOf(searchStr.toLowerCase()) !== -1;
};

export const ScenarioManagerTreeList = (props) => {
  const classes = useStyles();
  const {
    datasets,
    scenarios,
    onScenarioRedirect,
    deleteScenario,
    onScenarioRename,
    checkScenarioNameValue,
    userId,
    buildSearchInfo,
    buildDatasetInfo,
    labels,
    buildScenarioNameToDelete,
    showDeleteIcon,
    canUserDeleteScenario,
    canUserRenameScenario,
  } = props;
  if (buildSearchInfo) {
    console.warn(
      '"buildSearchInfo" prop is deprecated in ScenarioManagerTreeList. Please consider removing this prop.'
    );
  }
  if (showDeleteIcon != null) {
    console.warn(
      '"showDeleteIcon" prop is deprecated in ScenarioManagerTreeList. Please use "canUserDeleteScenario" instead.'
    );
  }

  const [searchText, setSearchText] = useState('');
  const nodesExpandedChildren = useRef(initNodesDict(scenarios, true));
  const nodesExpandedDetails = useRef(initNodesDict(scenarios, false));

  const formatScenariosToScenariosTree = (scenariosToFormat) => {
    const scenarioTree = scenariosToFormat.map((scenario) => {
      const displayDeleteIcon =
        canUserDeleteScenario != null
          ? canUserDeleteScenario(scenario)
          : showDeleteIcon !== false && scenario.ownerId === userId;

      labels.dataset = buildDatasetInfo(scenario.datasetList);

      return {
        parentId: scenario.parentId,
        id: scenario.id,
        name: scenario.name,
        scenarioNodeProps: {
          datasets,
          scenario,
          showDeleteIcon: displayDeleteIcon,
          onScenarioRedirect,
          deleteScenario,
          checkScenarioNameValue,
          canRenameScenario: canUserRenameScenario(scenario),
          onScenarioRename,
          labels,
          buildScenarioNameToDelete,
        },
      };
    });
    return ScenarioUtils.getScenarioTree(scenarioTree, (scenA, scenB) => scenA.name.localeCompare(scenB.name));
  };

  const scenarioTreeFull = useMemo(
    () => formatScenariosToScenariosTree(scenarios),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [datasets, scenarios, labels]
  );

  const [scenariosTree, setScenariosTree] = useState(scenarioTreeFull);

  // On scenarios list update, re-apply current filter on the new list of scenarios
  useEffect(() => {
    filterScenarios(searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarios, searchText, labels]);

  const [refreshTick, forceRefresh] = useReducer((x) => x + 1, 0);

  const collapseAll = () => {
    nodesExpandedChildren.current = initNodesDict(scenarios, false);
    nodesExpandedDetails.current = initNodesDict(scenarios, false);
    forceRefresh();
  };
  const expandTree = () => {
    nodesExpandedChildren.current = initNodesDict(scenarios, true);
    nodesExpandedDetails.current = initNodesDict(scenarios, false);
    forceRefresh();
  };
  const expandAll = () => {
    nodesExpandedChildren.current = initNodesDict(scenarios, true);
    nodesExpandedDetails.current = initNodesDict(scenarios, true);
    forceRefresh();
  };

  const filterScenarios = (searchStr) => {
    // Reset scenario list if search field is empty
    if (!searchStr || searchStr.length === 0) {
      setScenariosTree(scenarioTreeFull);
      return;
    }
    // Otherwise, filter scenarios based on their name
    const filtered = scenarios.filter(
      (scenario) =>
        filterMatchesName(scenario, searchStr) ||
        filterMatchesValidationStatus(labels, scenario, searchStr) ||
        filterMatchesRunStatus(labels, scenario, searchStr)
    );
    // Format list and set as tree data
    setScenariosTree(formatScenariosToScenariosTree(filtered));
  };

  return (
    <div className={classes.root}>
      <div className={classes.searchContainer}>
        <SearchInput label={labels.searchField} className={classes.searchField} onSearchChange={setSearchText} />
        <div className={classes.toolbar}>
          <FadingTooltip title={labels?.toolbar?.collapseAll || 'Collapse all'}>
            <IconButton className={classes.toolbarPrimaryAction} onClick={collapseAll} size="large">
              <UnfoldLessIcon color="primary" />
            </IconButton>
          </FadingTooltip>
          <FadingTooltip title={labels?.toolbar?.expandAll || 'Expand all'}>
            <IconButton className={classes.toolbarPrimaryAction} onClick={expandAll} size="large">
              <UnfoldMoreIcon color="primary" />
            </IconButton>
          </FadingTooltip>
          <FadingTooltip title={labels?.toolbar?.expandTree || 'Expand tree'}>
            <IconButton className={classes.toolbarPrimaryAction} onClick={expandTree} size="large">
              <AccountTreeIcon color="primary" />
            </IconButton>
          </FadingTooltip>
        </div>
      </div>
      <div data-cy="scenario-manager-view" className={classes.treesContainer}>
        {scenariosTree.map((scenarioTree) => {
          return (
            <ScenarioSortableTree
              key={scenarioTree.id}
              classes={classes}
              nodesExpandedChildrenRef={nodesExpandedChildren}
              nodesExpandedDetailsRef={nodesExpandedDetails}
              scenarioTree={scenarioTree}
              refreshTick={refreshTick}
            />
          );
        })}
      </div>
    </div>
  );
};

ScenarioManagerTreeList.propTypes = {
  /**
   * Datasets list
   */
  datasets: PropTypes.array.isRequired,
  /**
   * Scenarios list
   */
  scenarios: PropTypes.array.isRequired,
  /**
   * Function bound to redirect to scenario view with matching current scenario
   */
  onScenarioRedirect: PropTypes.func,
  /**
   * Function bound to handle a scenario deletion
   */
  deleteScenario: PropTypes.func.isRequired,
  /**
   * Function to handle scenario renaming
   */
  onScenarioRename: PropTypes.func.isRequired,
  /**
   * Function to check potential errors in scenario new name
   */
  checkScenarioNameValue: PropTypes.func,
  /**
   * Function bound to handle a scenario movement (moving a scenario = changing its parent)
   */
  moveScenario: PropTypes.func.isRequired,
  /**
   * Current user id
   */
  userId: PropTypes.string.isRequired,
  /**
   * DEPRECATED: Function building scenario search label
   */
  buildSearchInfo: PropTypes.func,
  /**
   * Function building scenario dataset label
   */
  buildDatasetInfo: PropTypes.func.isRequired,
  /**
   * DEPRECATED: this prop is deprecated, use 'canUserDeleteScenario' instead
   * Boolean value to define whether or not scenario delete buttons must be shown in ScenarioNode elements:
   *  - false: delete buttons are always hidden
   *  - true: delete buttons are shown if the user id matches the scenario owner id
   */
  showDeleteIcon: PropTypes.bool,
  /**
   * Function returning whether or not the current user can delete a given scenario. This function receives as parameter
   * the scenario data and must return a boolean.
   */
  canUserDeleteScenario: PropTypes.func,
  /**
   * Function returning whether or not the current user can rename a given scenario. This function receives as parameter
   * the scenario data and must return a boolean.
   */
  canUserRenameScenario: PropTypes.func,
  /**
   * Structure
   * <pre>
   {
    status: 'string',
    runTemplateLabel: 'string',
    successful: 'string',
    running: 'string',
    failed: 'string',
    created: 'string',
    delete: 'string',
    redirect: 'string',
    scenarioRename: {
      title: 'string'
      errors: {
        emptyScenarioName: 'string'
        forbiddenCharsInScenarioName: 'string'
      },
    },
    dataset: 'string',
    searchField: 'string',
    toolbar : {
      expandAll: 'string',
      expantTree: 'string'
      collapseAll: 'string',
    }
  }
   * </pre>
   */
  labels: PropTypes.object,
  /**
   * Function to store the scenario's name selected for delete, used in confirmation dialog
   */
  buildScenarioNameToDelete: PropTypes.func.isRequired,
};

ScenarioManagerTreeList.defaultProps = {
  onScenarioRedirect: null,
  labels: {
    status: 'Run status:',
    runTemplateLabel: 'Run type:',
    successful: 'Successful',
    running: 'Running',
    dataingestioninprogress: 'Transferring results',
    failed: 'Failed',
    created: 'Created',
    delete: 'Delete this scenario',
    redirect: 'Redirect to scenario view',
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
    dataset: 'Dataset',
    searchField: 'Filter',
    toolbar: {
      expandAll: 'Expand all',
      expandTree: 'Expand tree',
      collapseAll: 'Collapse all',
    },
    validationStatus: {
      rejected: 'Rejected',
      validated: 'Validated',
    },
  },
  checkScenarioNameValue: () => null,
  canUserRenameScenario: () => true,
};
